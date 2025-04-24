'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getWallsByTags } from "@/app/api/walls";

const TagWallpapersPage = () => {
  const { tag } = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await getWallsByTags([tag]);
        setImages(response);
        setError(null);
      } catch (err) {
        setError("Failed to fetch wallpapers. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [tag]);

  if (loading) return <div className="my-20 text-center">Loading...</div>;
  if (error) return <div className="my-20 text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center capitalize mb-6 text-gray-700">
        Wallpapers tagged with “{tag}”
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {images.map((image, index) => (
          <Link key={index} href={`/wallpaper/${image.$id}`} onClick={() => window.scrollTo(0, 0)}>
            <div className="relative group">
              <Image
                src={image.imageURL}
                alt={image.title || "Wallpaper"}
                width={800}
                height={600}
                className="w-full h-full object-cover rounded-lg shadow-md transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center rounded-lg">
                <span className="text-white text-xl">{image.title}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {images.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No wallpapers found for this tag.</p>
      )}
    </div>
  );
};

export default TagWallpapersPage;

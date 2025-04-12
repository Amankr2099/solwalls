'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Comment } from "@/components/Comment";
import { getWallById, getWallsByTags } from "@/app/api/walls";
import { downloadImage } from "@/app/api/downloadWall";

export default function ImagePage() {

  const router = useRouter()

  const [error, setError] = useState(null); // Manage error state
  const [loading, setLoading] = useState(true); // Manage loading state
  const [wallpaper, setWallpaper] = useState({}); // Store wallpaper data
  const [tags, setTags] = useState([]); // Store tags for wallpaper
  const [similarImages, setsimilarImages] = useState([]); // Store similar images
  const { wallId } = useParams(); // Get wallId from URL params

  useEffect(() => {
    if (!wallId) return;

    const fetchData = async () => {
      try {
        const response = await getWallById(wallId);
        setWallpaper(response);
        setTags(response.tags);
        setError(null);
      } catch (err) {
        setError("Error fetching data. Please try again later.");
        // console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [wallId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getWallsByTags(tags);
        setsimilarImages(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (tags.length) {
      fetchData();
    }
  }, [tags]);

  const handleDownload = async () => {
    try {
      const imgID = wallpaper.imageId;
      const downloadURL = await downloadImage(imgID);

      const filename = `${String(wallpaper.title).replace(/\s+/g, '').toLowerCase()}.jpeg`;
      const a = document.createElement("a");
      a.href = downloadURL;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const handlePaymentRedirect = () => {
    // Redirect to the payment page
    router.push(`/payment/${wallpaper.imageId}`)
  };

  if (loading) return <div className="my-20 text-xl text-center">Loading...</div>;
  if (error) return <div className="my-20 text-xl text-center">{error}</div>;

  return (
    <div className="mx-auto py-8 ">
      {/* Wallpaper Section */}
      <section className="flex-col justify-items-center bg-gray-400 text-gray-700 ">
        <div className="p-4 my-2 md:text-4xl sm:text-2xl">
          {wallpaper.title}
        </div>
        <div className="relative">
          <Image
            src={wallpaper.imageURL}
            alt="Wallpaper"
            width={800}
            height={600}
            className="w-auto h-screen object-cover px-2"
          />
          {!wallpaper.isPaid ? (
            <button
              onClick={handleDownload}
              className="md:text-sm sm:text-xs absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-2 py-1 rounded-md shadow-lg hover:bg-blue-700 transition"
            >
              Download Wallpaper
            </button>
          ) : (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-600 text-white px-2 py-1 rounded-md shadow-lg hover:bg-yellow-700 transition">
              <span>Buy for ₹ {wallpaper.price}</span>
              <button
                onClick={handlePaymentRedirect}
                className="ml-2 bg-green-600 text-white px-2 py-1 rounded-md shadow-lg hover:bg-green-700 transition"
              >
                Buy Now
              </button>
            </div>
          )}
        </div>

        {/* Filter Tags Section */}
        <div className="flex flex-wrap justify-center gap-3 py-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`px-4 py-2 rounded-full border text-sm transition-all bg-blue-500 text-white hover:bg-blue-400`}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Similar Images Section */}
      <section className="p-6 bg-slate-400 max-w-screen-lg mx-auto rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Similar Wallpapers
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {similarImages &&
            similarImages.map((image, index) => (
              <Link href={`/wallpaper/${image.$id}`} key={index} onClick={() => { window.scrollTo(0, 0); }}>
                <div className="relative group">
                  <Image
                    src={image.imageURL}
                    alt={image.title || "Image"}
                    width={800}
                    height={600}
                    className="h-2/3 rounded-lg shadow-md transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center rounded-lg">
                    <span className="text-white text-xl">{image.title}</span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>

      <div>
        <Comment />
      </div>
    </div>
  );
}

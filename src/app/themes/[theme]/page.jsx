'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
// import { useRouter } from "next/router";
import { useParams  } from "next/navigation";
import Link from "next/link";
import { getWallsByTheme } from "@/app/api/walls";
import { getThemeByName } from "@/app/api/themes";

const ThemePage = () => {
  // const { theme } = useRouter().query
  const { theme } = useParams()

  const [images, setImages] = useState([]);
  const [filters, setFilters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]); // State to store selected filter tags

  const [loading, setLoading] = useState(true); // Manage loading state
  const [error, setError] = useState(null); // Manage error state

    useEffect(() => {
    // Fetch both images and filters from the backend
    const fetchData = async () => {
      setLoading(true); // Set loading to true when starting the fetch
  
      try {
        // Fetch images based on the theme
        const imageResponse = await getWallsByTheme(theme);

        setImages(imageResponse); // Store images from the response
  
        // Fetch filters based on the theme
        const filterResponse = await getThemeByName(theme);

        setFilters(filterResponse.tags); // Store filters from the response
  
        setError(null); // Clear any previous errors if the request is successful
      } catch (err) {
        setError("Error fetching data. Please try again later."); // Set error message
        // console.error("Error fetching data:", err); // Log the error for debugging
      } finally {
        setLoading(false); // Set loading to false after the fetch is complete
      }
    };
  
    fetchData();
  }, [theme]);

  // useEffect(() => {
  //   // Fetch both images and filters from the backend
  //   const fetchData = async () => {
  //     setLoading(true); // Set loading to true when starting the fetch
  
  //     try {
  //       // Fetch images based on the theme
  //       const imageResponse = await fetch(`/api/walls?theme=${theme}`);
  //       if (!imageResponse.ok) {
  //         throw new Error('Failed to fetch walls');
  //       }
  //       const imageData = await imageResponse.json();
  //       setImages(imageData); // Store images from the response
  
  //       // Fetch filters based on the theme
  //       const filterResponse = await fetch(`/api/theme?theme=${theme}`);
  //       if (!filterResponse.ok) {
  //         throw new Error('Failed to fetch filters');
  //       }
  //       const filterData = await filterResponse.json();
  //       setFilters(filterData.tags); // Store filters from the response
  
  //       setError(null); // Clear any previous errors if the request is successful
  //     } catch (err) {
  //       setError("Error fetching data. Please try again later."); // Set error message
  //       console.error("Error fetching data:", err); // Log the error for debugging
  //     } finally {
  //       setLoading(false); // Set loading to false after the fetch is complete
  //     }
  //   };
  
  //   fetchData();
  // }, [theme]);
  

  // Filter images based on selected tags
  const filteredImages =
    selectedFilters.length > 0
      ? images.filter((image) =>
          selectedFilters.some((tag) => image.tags.includes(tag))
        )
      : images;

  // Toggle a filter tag's selection state
  const toggleFilter = (filter) => {
    setSelectedFilters(
      (prevFilters) =>
        prevFilters.includes(filter)
          ? prevFilters.filter((f) => f !== filter) // Remove filter if already selected
          : [...prevFilters, filter] // Add filter if not selected
    );
  };

  if (loading) return <div className="my-20 text-center">Loading...</div>; // Show loading indicator
  if (error) return <div className="my-20">{error}</div>; // Show error message

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* <h1 className="text-3xl font-bold text-center mb-6 capitalize">{category} Images</h1> */}

      {/* Filter Tags Section */}
      <div className="flex flex-wrap justify-center gap-3 my-5">
        {filters.map((filter,index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-full border text-sm transition-all 
              ${
                selectedFilters.includes(filter)
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800"
              }
              hover:bg-blue-400 hover:text-white`}
            onClick={() => toggleFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {filteredImages.map((image,index) => (
          <Link key={index} href={`/wallpaper/${image.$id}`} onClick={() => {
            window.scrollTo(0, 0);
          }}>
            <div className="relative group ">
              <Image
                src={image.imageURL}
                alt={image.title || "Image"}
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

      {filteredImages.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No images found.</p>
      )}
    </div>
  );
};

export default ThemePage;

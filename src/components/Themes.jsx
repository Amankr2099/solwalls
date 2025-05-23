'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getThemes } from '@/app/api/themes';

export default function Themes() {

  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true); // For showing loading state
  const [error, setError] = useState(null); // To store any errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch('/api/themes');
        const response = await getThemes();
        // if (!response.ok) {
        //   throw new Error('Failed to fetch themes');
        // }
        // const data = await response.json();
        setThemes(response); // Store themes in state
      } catch (error) {
        setError("Error fetching themes. Please try again later.");
        console.error("Error fetching themes:", error); // Detailed logging
      } finally {
        setLoading(false); // Stop loading state once data is fetched
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  if (loading) return <div className='my-20 text-center'>Loading...</div>; // Show loading indicator
  if (error) return <div className='my-20' >{error}</div>; // Show error message

  return (
    <div className="max-w-2xl mx-auto my-32 p-4 py-10" id='themes'>
      <h6 className="text-center md:text-4xl sm:text-2xl font-semibold mb-8 text-blue-100">
        Wallpapers by Themes
      </h6>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
        {themes.map((theme, index) => (
          <Link key={index} href={`/themes/${theme.theme}`} className="relative z-10" onClick={() => {
            window.scrollTo(0, 0);
          }}>
            <div className="relative group cursor-pointer">
              <div className="w-full h-40 overflow-hidden rounded-lg shadow-md relative" >
                <Image
                  src={theme.thumbnail}
                  alt={theme.theme}
                  width={800}  
                  height={600} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 flex justify-center items-center z-20">
                <span className="text-white text-3xl">{theme.theme}</span>
              </div>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 z-10"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

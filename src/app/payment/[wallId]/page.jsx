'use client'
import { useParams } from 'next/navigation';
import React from 'react';

export const Page = () => {
      const { wallId } = useParams()
    
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Wallpaper Payment Features
        </h1>
        <p className="text-gray-600 mb-6">
          We're working on bringing payment features for premium wallpapers very soon!
        </p>
        <span className="inline-block bg-yellow-100 text-yellow-800 text-sm px-4 py-2 rounded-full">
          Coming Soon 🚧
        </span>
      </div>
    </div>
  );
};

export default Page;

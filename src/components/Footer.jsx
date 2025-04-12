'use client'

import Link from 'next/link';
import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-10 max-w-screen mt-10">
      <div className="text-center mb-6">

        <div className='flex justify-center gap-10 '>
        <Link href={'/about'}>
        <p className='pb-3 hover:text-gray-400'>About Us</p>
        </Link>

        <Link href={'/contact'}>
        <p className='pb-3 hover:text-gray-400'>Contact Us</p>
        </Link>

        <Link href={'/policy'}>
        <p className='pb-3 hover:text-gray-400'>Privacy Policy</p>
        </Link>

        <Link href={'/terms'}>
        <p className='pb-3 hover:text-gray-400'>Terms and Conditions</p>
        </Link>
        </div>
        

        <div className='my-10'>
        <a href="https://www.instagram.com/_.solovert._/" target="_blank" rel="noopener noreferrer" className="mx-3 text-xl hover:text-pink-600">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://www.youtube.com/@solovert_escape24" target="_blank" rel="noopener noreferrer" className="mx-3 text-xl hover:text-red-600">
          <i className="fab fa-youtube"></i>
        </a>
        <a href="mailto:akashoz72425@gmail.com" target="_blank" rel="noopener noreferrer" className="mx-3 text-xl hover:text-blue-600">
          <i className="fas fa-envelope"></i>
        </a>
        </div>
        
      </div>
      <p className=" text-center max-w-md mx-auto">
        &copy; {currentYear} <a href="/" className='hover:text-gray-400'>SolWalls.com</a>  All rights reserved.
      </p>
    </footer>
  );
}




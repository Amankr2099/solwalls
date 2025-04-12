'use client';

import Link from "next/link";

const About = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-6 py-20 flex items-center justify-center">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to SolWalls</h1>
        <p className="text-lg md:text-xl mb-6 leading-relaxed text-gray-300">
          SolWalls is your go-to destination for stunning, high-quality wallpapers tailored to your vibe and mood. Whether you're feeling calm, creative, bold, or dreamy — we’ve got something for you.
        </p>
        <p className="text-lg md:text-xl mb-6 leading-relaxed text-gray-400">
          We believe your screen should reflect you. That’s why we curate wallpapers based on themes that resonate with different emotions, aesthetics, and energies.
        </p>
        <p className="text-lg md:text-xl mb-10 leading-relaxed text-gray-400">
          Browse our growing collection, find the perfect wallpaper that speaks to you, and download it in just one click. No ads. No distractions. Just pure visual vibes.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/" 
            className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
          >
            Explore Wallpapers
          </Link>
          <Link 
            href="/contact" 
            className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;

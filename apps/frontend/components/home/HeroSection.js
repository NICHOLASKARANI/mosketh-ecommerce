import React from 'react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-purple-900 to-indigo-900 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Discover Your Signature Scent
        </h1>
        <p className="mt-6 text-xl max-w-3xl">
          Explore our collection of authentic luxury perfumes. From oriental oud to fresh florals, 
          find the perfect fragrance that expresses your unique personality.
        </p>
        <div className="mt-10 flex gap-4">
          <Link 
            href="/products" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-50"
          >
            Shop Now
          </Link>
          <Link 
            href="/about" 
            className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-indigo-700"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
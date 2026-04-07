'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaExpand, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function OptimizedImage({ src, alt, className, priority = false, productName }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showZoom, setShowZoom] = useState(false);
  const [currentImage, setCurrentImage] = useState(src);
  const [allImages, setAllImages] = useState([]);
  
  useEffect(() => {
    // Check if product has multiple images
    if (productName && window.productImages) {
      setAllImages(window.productImages[productName] || [src]);
    } else {
      setAllImages([src]);
    }
  }, [src, productName]);

  // Fallback image if loading fails
  const fallbackImage = 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400';

  return (
    <>
      <div className="relative overflow-hidden bg-gray-100 rounded-lg group">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-purple-200 h-12 w-12"></div>
            </div>
          </div>
        )}
        
        <img
          src={src || fallbackImage}
          alt={alt}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } ${className || ''}`}
          onLoad={() => setIsLoading(false)}
          onError={(e) => {
            e.target.src = fallbackImage;
            setIsLoading(false);
          }}
          loading={priority ? 'eager' : 'lazy'}
        />
        
        {/* Zoom Button */}
        <button
          onClick={() => setShowZoom(true)}
          className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Zoom image"
        >
          <FaExpand />
        </button>
      </div>

      {/* Zoom Modal */}
      {showZoom && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" onClick={() => setShowZoom(false)}>
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowZoom(false)}
              className="absolute -top-10 right-0 text-white hover:text-purple-400 transition"
            >
              <FaTimes size={24} />
            </button>
            <img src={currentImage} alt={alt} className="w-full h-auto max-h-[80vh] object-contain" />
            
            {/* Image navigation if multiple images */}
            {allImages.length > 1 && (
              <div className="absolute left-0 right-0 bottom-4 flex justify-center gap-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(img)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentImage === img ? 'bg-purple-500 w-4' : 'bg-white bg-opacity-50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { productDB } from '@/lib/productDB';

export default function ProductDisplay() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Direct load without any conditions
    try {
      const allProducts = productDB.getAll();
      console.log('📦 Products loaded:', allProducts.length);
      setProducts(allProducts);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-pulse">Loading products...</div>
        </div>
      </div>
    );
  }

  // Show all products on homepage (not just 6)
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
        
        {products.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No products available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
      <Link href={`/product/${product.slug}`}>
        <div className="relative pt-[100%] overflow-hidden bg-gray-100">
          <img
            src={imageError ? 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400' : product.images?.[0]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-gray-800 hover:text-purple-600 mb-2">{product.name}</h3>
        </Link>
        <p className="text-purple-600 font-bold text-xl mb-3">KES {product.priceKES}</p>
        <button
          onClick={handleAddToCart}
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

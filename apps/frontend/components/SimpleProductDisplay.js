'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Simple product card
function SimpleProductCard({ product }) {
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative pt-[100%] overflow-hidden bg-gray-100">
        <img
          src={imageError ? 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400' : (product.images?.[0] || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400')}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800">{product.name}</h3>
        <p className="text-purple-600 font-bold mt-2">KES {product.priceKES?.toLocaleString()}</p>
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// Main component
export default function SimpleProductDisplay() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Load from localStorage
      const saved = localStorage.getItem('mosketh_products');
      if (saved) {
        setProducts(JSON.parse(saved));
      }
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
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
        
        {products.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No products yet.</p>
            <a href="/manage" className="bg-purple-600 text-white px-4 py-2 rounded">
              Add Products
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 3).map(product => (
              <SimpleProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
        <div className="text-center mt-8">
          <Link href="/products" className="text-purple-600 hover:text-purple-700">
            View All Products →
          </Link>
        </div>
      </div>
    </div>
  );
}

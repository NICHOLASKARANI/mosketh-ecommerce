'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SimpleProductDisplay() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('mosketh_products');
      if (saved) {
        setProducts(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;

  const featuredProducts = products.filter(p => p.featured === true);
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : products.slice(0, 4);

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
          {featuredProducts.length > 0 ? 'Featured Products' : 'Our Products'}
        </h2>
        <p className="text-gray-500 text-center mb-12">
          {featuredProducts.length > 0 
            ? 'Discover our most popular fragrances'
            : 'Browse our collection of luxury fragrances'}
        </p>
        
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products yet. Check back soon!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={product.images?.[0] || '/logo.png'} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-purple-600 font-bold mt-2">KES {product.priceKES}</p>
                  <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

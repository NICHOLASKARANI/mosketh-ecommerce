'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SimpleProducts() {
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

  if (loading) return <div className="text-center py-4">Loading...</div>;
  
  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No products yet. Add some in the admin panel!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img 
            src={product.images?.[0] || '/logo.png'} 
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold text-lg">{product.name}</h3>
            <p className="text-purple-600 font-bold mt-2">KES {product.priceKES}</p>
            <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

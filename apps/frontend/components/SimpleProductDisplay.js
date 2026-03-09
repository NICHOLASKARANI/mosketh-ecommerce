'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SimpleProductDisplay() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('mosketh_admin_products');
      console.log('🔍 Simple display loading:', saved);
      
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log('✅ Simple display parsed:', parsed);
        setProducts(parsed);
      }
    } catch (error) {
      console.error('Error loading products:', error);
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

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
        
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {product.images && product.images[0] && (
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-purple-600 font-bold">KES {product.priceKES}</p>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">{product.description}</p>
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

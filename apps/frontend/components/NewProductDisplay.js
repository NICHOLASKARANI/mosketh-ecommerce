'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NewProductDisplay() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Load products from localStorage
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

  if (loading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-pulse">Loading products...</div>
        </div>
      </div>
    );
  }

  const displayProducts = products.slice(0, 3);

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
        
        {products.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No products available yet.</p>
            <a 
              href="/manage" 
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
            >
              Add Products in Admin
            </a>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src={product.images?.[0] || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400'} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400'}
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-purple-600 font-bold mt-2">KES {product.priceKES?.toLocaleString()}</p>
                    <button 
                      onClick={() => alert(`${product.name} added to cart!`)}
                      className="mt-4 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link 
                href="/products" 
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                View All Products →
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

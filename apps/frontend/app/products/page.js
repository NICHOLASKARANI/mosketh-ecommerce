'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Get products from localStorage
      const saved = localStorage.getItem('mosketh_admin_products');
      console.log('📦 Raw products from storage:', saved);
      
      if (saved) {
        const parsedProducts = JSON.parse(saved);
        console.log('✅ Parsed products:', parsedProducts);
        setProducts(parsedProducts);
      } else {
        console.log('❌ No products found in storage');
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Products</h1>
          <p className="text-xl opacity-90">
            {products.length} products available
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">No products available.</p>
            <p className="text-sm text-gray-400 mt-2">Add products in the admin panel to see them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <img 
                  src={product.images?.[0] || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400'} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400'}
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-purple-600 font-bold text-xl">KES {product.priceKES}</p>
                  <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </>
  );
}

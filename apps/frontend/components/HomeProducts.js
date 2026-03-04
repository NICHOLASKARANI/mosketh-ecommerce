'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

export default function HomeProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
    
    // Listen for storage changes
    const handleStorageChange = () => {
      loadProducts();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadProducts = () => {
    try {
      // ONLY load products from localStorage (admin panel)
      const saved = localStorage.getItem('mosketh_products');
      const adminProducts = saved ? JSON.parse(saved) : [];
      
      // Show featured products first, then limit to 6
      const featured = adminProducts.filter(p => p.featured);
      const nonFeatured = adminProducts.filter(p => !p.featured);
      const displayProducts = [...featured, ...nonFeatured].slice(0, 6);
      
      setProducts(displayProducts);
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-pulse">Loading products...</div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Products</h2>
          <p className="text-gray-500 mb-4">No products available yet.</p>
          <a
            href="/manage"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
          >
            Add Products in Admin Panel
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Our Products</h2>
        <p className="text-gray-500 text-center mb-8">
          Discover our collection of luxury fragrances and beauty products
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/products" 
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition"
          >
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
}

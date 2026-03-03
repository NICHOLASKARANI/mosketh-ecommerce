'use client';

import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

export default function ClientProducts({ initialProducts = [] }) {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get products from localStorage
    try {
      const saved = localStorage.getItem('mosketh_products');
      const localProducts = saved ? JSON.parse(saved) : [];
      
      // Merge with initial products (from API)
      const allProducts = [...initialProducts, ...localProducts];
      const uniqueProducts = Array.from(new Map(allProducts.map(p => [p.id, p])).values());
      
      setProducts(uniqueProducts);
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts(initialProducts);
    } finally {
      setLoading(false);
    }
  }, [initialProducts]);

  if (loading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  const featuredProducts = products.filter(p => p.featured === true);

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
        <p className="text-gray-500 mb-8">Our most popular fragrances loved by customers</p>
        
        {featuredProducts.length === 0 ? (
          <p className="text-center text-gray-500">No featured products available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

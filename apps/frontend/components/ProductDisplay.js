'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { productDB } from '@/lib/productDB';

export default function ProductDisplay() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load products
    setProducts(productDB.getAll());
    setLoading(false);

    // Listen for updates from admin panel
    const handleUpdate = () => {
      setProducts(productDB.getAll());
    };
    
    window.addEventListener('productsUpdated', handleUpdate);
    return () => window.removeEventListener('productsUpdated', handleUpdate);
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

  const featuredProducts = products.filter(p => p.featured);
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : products.slice(0, 3);

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
        
        {products.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No products yet.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link href="/products" className="text-purple-600 hover:text-purple-700">
                View All Products →
              </Link>
            </div>
          </>
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
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img 
        src={imageError ? 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400' : product.images[0]} 
        alt={product.name}
        className="w-full h-48 object-cover"
        onError={() => setImageError(true)}
      />
      <div className="p-4">
        <h3 className="font-semibold text-gray-800">{product.name}</h3>
        <p className="text-purple-600 font-bold mt-2">KES {product.priceKES}</p>
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

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { productDB } from '@/lib/productDB';

export default function ProductDisplay() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
    
    const handleUpdate = () => {
      console.log('Products updated, reloading...');
      loadProducts();
    };
    
    window.addEventListener('productsUpdated', handleUpdate);
    return () => window.removeEventListener('productsUpdated', handleUpdate);
  }, []);

  const loadProducts = () => {
    const allProducts = productDB.getAll();
    console.log('Loaded', allProducts.length, 'products');
    setProducts(allProducts);
    setLoading(false);
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

  // Show first 6 products on homepage
  const displayProducts = products.slice(0, 6);

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
        
        {products.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No products available.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {products.length > 6 && (
              <div className="text-center mt-8">
                <Link href="/products" className="text-purple-600 hover:text-purple-700 font-semibold">
                  View All Products ({products.length}) →
                </Link>
              </div>
            )}
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
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
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

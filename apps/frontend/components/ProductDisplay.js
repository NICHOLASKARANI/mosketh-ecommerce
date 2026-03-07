'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { productDB } from '@/lib/productDB';

export default function ProductDisplay() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = () => {
    try {
      // Force a fresh read from localStorage
      const allProducts = productDB.getAll();
      console.log('🔄 Loading products (fresh):', allProducts.length);
      setProducts(allProducts);
      setError(null);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();

    // Critical: Listen for storage changes from admin panel
    const handleProductsUpdate = () => {
      console.log('📦 Products updated event received, reloading...');
      loadProducts();
    };

    // Also listen for standard storage events (cross-tab)
    const handleStorageChange = (e) => {
      if (e.key === 'mosketh_admin_products' || e.key === 'mosketh_products_version') {
        console.log('💾 Storage changed, reloading products...');
        loadProducts();
      }
    };

    window.addEventListener('productsUpdated', handleProductsUpdate);
    window.addEventListener('storage', handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener('productsUpdated', handleProductsUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
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

  if (error) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-red-500">{error}</p>
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
            <p className="text-gray-500">No products available. Check back soon!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

// Simple Product Card Component
function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    // Add to cart logic here
    alert(`${product.name} added to cart!`);
  };

  const imageUrl = imageError 
    ? 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400' 
    : (product.images?.[0] || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400');

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
      <Link href={`/product/${product.slug}`}>
        <div className="relative pt-[100%] overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-gray-800 hover:text-purple-600 mb-2 line-clamp-2">{product.name}</h3>
        </Link>
        <p className="text-purple-600 font-bold mb-2">KES {product.priceKES}</p>
        <button
          onClick={handleAddToCart}
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
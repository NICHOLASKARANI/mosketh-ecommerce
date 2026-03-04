'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SimpleProductDisplay() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = () => {
    try {
      // Try both storage keys
      let products = [];
      const data1 = localStorage.getItem('mosketh_products');
      const data2 = localStorage.getItem('mosketh_products_v2');
      
      if (data1) {
        try { products = JSON.parse(data1); } catch (e) {}
      }
      if (data2 && products.length === 0) {
        try { products = JSON.parse(data2); } catch (e) {}
      }
      
      console.log('Loaded products:', products.length);
      setProducts(products);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
    
    // Reload when page gets focus
    const onFocus = () => loadProducts();
    window.addEventListener('focus', onFocus);
    
    // Reload when storage changes
    const onStorage = () => loadProducts();
    window.addEventListener('storage', onStorage);
    
    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('storage', onStorage);
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

  const featuredProducts = products.filter(p => p.featured);
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : products;

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
          {featuredProducts.length > 0 ? 'Featured Products' : 'Our Products'}
        </h2>
        <p className="text-gray-500 text-center mb-8">
          {products.length > 0 
            ? 'Discover our collection of luxury fragrances'
            : 'No products yet. Check back soon!'}
        </p>

        {products.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No products available.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayProducts.map(product => (
                <SimpleProductCard key={product.id} product={product} />
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
          </>
        )}
      </div>
    </div>
  );
}

function SimpleProductCard({ product }) {
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(item => item.id === product.id);
    
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
      <Link href={`/product/${product.slug}`}>
        <div className="relative pt-[100%] overflow-hidden">
          <img
            src={imageError ? 'https://via.placeholder.com/400?text=Mosketh' : (product.images?.[0] || 'https://via.placeholder.com/400?text=Mosketh')}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
          {product.featured && (
            <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded text-xs">
              Featured
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-gray-800 hover:text-purple-600 mb-2 line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {product.shortDescription || product.description?.substring(0, 100) || ''}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-purple-600">
            KES {product.priceKES?.toLocaleString()}
          </span>
          {product.stock <= 5 && product.stock > 0 && (
            <span className="text-xs text-orange-600">Only {product.stock} left</span>
          )}
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full py-2 rounded font-semibold ${
            product.stock > 0
              ? 'bg-purple-600 text-white hover:bg-purple-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}

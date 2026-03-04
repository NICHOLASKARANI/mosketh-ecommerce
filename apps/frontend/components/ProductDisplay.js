'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { productUtils } from '@/lib/productUtils';

export default function ProductDisplay() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  // Categories
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'mens-perfumes', name: "Men's Perfumes" },
    { id: 'womens-perfumes', name: "Women's Perfumes" },
    { id: 'unisex-perfumes', name: "Unisex Perfumes" },
    { id: 'body-oils', name: "Body Oils" },
    { id: 'face-creams', name: "Face Creams" },
    { id: 'hair-products', name: "Hair Products" },
    { id: 'gift-sets', name: "Gift Sets" }
  ];

  useEffect(() => {
    // Load products
    const allProducts = productUtils.getAllProducts();
    setProducts(allProducts);
    setLoading(false);

    // Listen for storage changes (in case products added in another tab)
    const handleStorageChange = () => {
      const updated = productUtils.getAllProducts();
      setProducts(updated);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Filter and sort products
  const getFilteredProducts = () => {
    let filtered = [...products];

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Apply sorting
    switch(sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.priceKES - b.priceKES);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.priceKES - a.priceKES);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Default sort: featured first, then newest
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();
  const featuredProducts = products.filter(p => p.featured);
  const hasProducts = products.length > 0;

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
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
          {hasProducts ? (featuredProducts.length > 0 ? 'Featured Products' : 'Our Products') : 'Our Products'}
        </h2>
        <p className="text-gray-500 text-center mb-8 max-w-2xl mx-auto">
          {hasProducts 
            ? 'Discover our collection of luxury fragrances and beauty products'
            : 'No products yet. Check back soon!'}
        </p>

        {hasProducts && (
          <>
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    selectedCategory === cat.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex justify-end mb-6">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="default">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                No products found in this category.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        )}

        {/* View All Link */}
        {hasProducts && (
          <div className="text-center mt-12">
            <Link 
              href="/products" 
              className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition transform hover:scale-105"
            >
              View All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// Product Card Component
function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    // Get existing cart
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product exists
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
    <div 
      className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.slug}`} className="block relative pt-[100%] overflow-hidden">
        <img
          src={imageError ? 'https://via.placeholder.com/400?text=Mosketh' : (product.images?.[0] || 'https://via.placeholder.com/400?text=Mosketh')}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
          onError={() => setImageError(true)}
        />
        
        {/* Badges */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
            Only {product.stock} left
          </div>
        )}
        
        {product.stock === 0 && (
          <div className="absolute top-4 right-4 bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
            Out of Stock
          </div>
        )}

        {product.featured && (
          <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
            Featured
          </div>
        )}

        {/* Quick Add Button */}
        <div className={`absolute inset-x-4 bottom-4 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart();
            }}
            disabled={product.stock === 0}
            className={`w-full py-3 rounded-lg font-semibold transition-all ${
              product.stock > 0
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </Link>

      <div className="p-5">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-purple-600 transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-500 line-clamp-2 mb-4">
          {product.shortDescription || product.description?.substring(0, 100) || 'Luxury fragrance'}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-purple-600">
            KES {product.priceKES?.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

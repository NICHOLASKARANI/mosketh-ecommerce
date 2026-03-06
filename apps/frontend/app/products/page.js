'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { productDB } from '@/lib/productDB';
import { FaSearch } from 'react-icons/fa';

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

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    loadProducts();
    
    const handleProductsUpdate = () => {
      loadProducts();
    };
    
    window.addEventListener('productsUpdated', handleProductsUpdate);
    return () => window.removeEventListener('productsUpdated', handleProductsUpdate);
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, searchTerm, sortBy, products]);

  const loadProducts = () => {
    const allProducts = productDB.getAll();
    setProducts(allProducts);
    setFilteredProducts(allProducts);
    setLoading(false);
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.priceKES - b.priceKES);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.priceKES - a.priceKES);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    setFilteredProducts(filtered);
  };

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Discover our collection of luxury fragrances and beauty products
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="default">Sort by</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        <p className="text-gray-600 mb-6">
          Showing <span className="font-semibold">{filteredProducts.length}</span> products
        </p>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Products Found</h2>
            <p className="text-gray-600 mb-8">No products have been added yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    cartDB.addItem(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
      <Link href={`/product/${product.slug}`}>
        <div className="relative pt-[100%] overflow-hidden bg-gray-100">
          <img
            src={imageError ? 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400' : product.images?.[0]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
          {product.stock <= 5 && product.stock > 0 && (
            <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs">
              Only {product.stock} left
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-gray-800 hover:text-purple-600 mb-2 line-clamp-2">{product.name}</h3>
        </Link>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-purple-600">KES {product.priceKES}</span>
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

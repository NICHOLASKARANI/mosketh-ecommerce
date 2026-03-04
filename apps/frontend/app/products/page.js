'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ProductCard';
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
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) setSelectedCategory(category);
  }, [searchParams]);

  useEffect(() => {
    loadProducts();
    const handleStorage = () => loadProducts();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, searchTerm, sortBy, products]);

  const loadProducts = () => {
    try {
      const saved = localStorage.getItem('mosketh_products');
      const adminProducts = saved ? JSON.parse(saved) : [];
      setProducts(adminProducts);
      setFilteredProducts(adminProducts);
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];
    if (selectedCategory !== 'all') filtered = filtered.filter(p => p.category === selectedCategory);
    if (searchTerm) filtered = filtered.filter(p => p.name?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    switch (sortBy) {
      case 'price-low': filtered.sort((a, b) => (a.priceKES || 0) - (b.priceKES || 0)); break;
      case 'price-high': filtered.sort((a, b) => (b.priceKES || 0) - (a.priceKES || 0)); break;
      case 'name': filtered.sort((a, b) => (a.name || '').localeCompare(b.name || '')); break;
    }
    setFilteredProducts(filtered);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div></div>;

  return (
    <>
      <Header />
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Products</h1>
          <p className="text-xl opacity-90">Discover our collection of luxury fragrances</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600" />
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600">
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600">
              <option value="default">Sort by</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">No Products Found</h2>
            <p className="text-gray-600 mb-8">Add products in the admin panel to see them here.</p>
            <a href="/manage" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700">Go to Admin</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

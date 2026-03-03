'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Load products from localStorage
    try {
      const saved = localStorage.getItem('mosketh_products');
      const localProducts = saved ? JSON.parse(saved) : [];
      
      // Also fetch from API if needed
      const fetchAPI = async () => {
        try {
          const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mosketh-backend.vercel.app';
          const res = await fetch(`${API_URL}/api/products`);
          if (res.ok) {
            const data = await res.json();
            const apiProducts = Array.isArray(data.data) ? data.data : [];
            
            // Merge and deduplicate
            const all = [...apiProducts, ...localProducts];
            const unique = Array.from(new Map(all.map(p => [p.id, p])).values());
            setProducts(unique);
          } else {
            setProducts(localProducts);
          }
        } catch (error) {
          console.error('Error fetching API:', error);
          setProducts(localProducts);
        }
      };
      
      fetchAPI();
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredProducts = products.filter(p => {
    if (filter !== 'all' && p.category !== filter) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'mens-perfumes', label: "Men's Perfumes" },
    { value: 'womens-perfumes', label: "Women's Perfumes" },
    { value: 'unisex-perfumes', label: 'Unisex Perfumes' }
  ];

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">All Products</h1>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            {categories.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

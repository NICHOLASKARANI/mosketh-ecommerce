'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ProductCard';
import { FaSearch, FaFilter } from 'react-icons/fa';

// Categories from admin panel
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

  // Load products from localStorage
  useEffect(() => {
    loadProducts();
  }, []);

  // Filter products when category, search, or sort changes
  useEffect(() => {
    filterProducts();
  }, [selectedCategory, searchTerm, sortBy, products]);

  const loadProducts = () => {
    try {
      // Get products from localStorage (where admin panel saves them)
      const saved = localStorage.getItem('mosketh_products');
      const allProducts = saved ? JSON.parse(saved) : [];
      
      // Add some default products if none exist
      if (allProducts.length === 0) {
        const defaultProducts = [
          {
            id: '1',
            name: 'Ameerat Al Arab by Asdaaf',
            priceKES: 2500,
            category: 'womens-perfumes',
            description: 'A luxurious Arabian fragrance crafted for the modern queen',
            shortDescription: 'Luxury Arabian fragrance',
            stock: 10,
            images: ['https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400'],
            featured: true,
            slug: 'ameerat-al-arab'
          },
          {
            id: '2',
            name: 'La Charmante by Maison Alhambra',
            priceKES: 2800,
            category: 'womens-perfumes',
            description: 'An elegant and charming floral fragrance',
            shortDescription: 'Elegant floral scent',
            stock: 8,
            images: ['https://images.unsplash.com/photo-1541643600914-78b084683601?w=400'],
            featured: true,
            slug: 'la-charmante'
          },
          {
            id: '3',
            name: 'Intense Wayfarer By Pendora scents',
            priceKES: 3000,
            category: 'mens-perfumes',
            description: 'A bold and intense fragrance for the modern man',
            shortDescription: 'Bold and intense',
            stock: 5,
            images: ['https://images.unsplash.com/photo-1592919505780-303950717480?w=400'],
            featured: true,
            slug: 'intense-wayfarer'
          }
        ];
        setProducts(defaultProducts);
        setFilteredProducts(defaultProducts);
      } else {
        setProducts(allProducts);
        setFilteredProducts(allProducts);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
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
      default:
        // Default: featured first
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
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
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Discover our complete collection of luxury fragrances and beauty products
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
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

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="default">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-gray-600 mb-6">
          Showing <span className="font-semibold">{filteredProducts.length}</span> products
        </p>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Products Found</h2>
            <p className="text-gray-600 mb-8">Try adjusting your search or filter criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchTerm('');
                setSortBy('default');
              }}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Clear Filters
            </button>
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

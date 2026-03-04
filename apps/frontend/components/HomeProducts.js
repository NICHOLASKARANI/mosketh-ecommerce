'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

export default function HomeProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('mosketh_products');
      const allProducts = saved ? JSON.parse(saved) : [];
      
      // Add default products if none exist
      if (allProducts.length === 0) {
        const defaultProducts = [
          {
            id: '1',
            name: 'Ameerat Al Arab by Asdaaf',
            priceKES: 2500,
            category: 'womens-perfumes',
            images: ['https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400'],
            featured: true,
            slug: 'ameerat-al-arab'
          },
          {
            id: '2',
            name: 'La Charmante by Maison Alhambra',
            priceKES: 2800,
            category: 'womens-perfumes',
            images: ['https://images.unsplash.com/photo-1541643600914-78b084683601?w=400'],
            featured: true,
            slug: 'la-charmante'
          },
          {
            id: '3',
            name: 'Intense Wayfarer By Pendora scents',
            priceKES: 3000,
            category: 'mens-perfumes',
            images: ['https://images.unsplash.com/photo-1592919505780-303950717480?w=400'],
            featured: true,
            slug: 'intense-wayfarer'
          }
        ];
        setProducts(defaultProducts);
      } else {
        // Show featured products first, then limit to 6
        const featured = allProducts.filter(p => p.featured);
        const nonFeatured = allProducts.filter(p => !p.featured);
        const displayProducts = [...featured, ...nonFeatured].slice(0, 6);
        setProducts(displayProducts);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
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

  if (products.length === 0) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Products</h2>
          <p className="text-gray-500">No products available. Check back soon!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Our Products</h2>
        <p className="text-gray-500 text-center mb-8">
          Discover our collection of luxury fragrances and beauty products
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
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
      </div>
    </div>
  );
}

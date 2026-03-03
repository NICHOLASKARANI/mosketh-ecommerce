import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export const dynamic = 'force-dynamic';

async function getCategoryProducts(slug) {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mosketh-backend.vercel.app';
    const res = await fetch(`${API_URL}/api/products?category=${slug}`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching category products:', error);
    return [];
  }
}

function formatCategoryName(slug) {
  const names = {
    'mens-perfumes': "Men's Perfumes",
    'womens-perfumes': "Women's Perfumes",
    'unisex-perfumes': "Unisex Perfumes",
    'body-oils': "Body Oils",
    'face-creams': "Face Creams",
    'hair-products': "Hair Products",
    'gift-sets': "Gift Sets"
  };
  return names[slug] || slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function getCategoryDescription(slug) {
  const descriptions = {
    'mens-perfumes': 'Discover our exclusive collection of men\'s luxury fragrances. From fresh aquatic scents to deep woody aromas, find the perfect signature scent.',
    'womens-perfumes': 'Explore our enchanting collection of women\'s perfumes. From floral bouquets to oriental mysteries, every bottle tells a unique story.',
    'unisex-perfumes': 'Experience our versatile unisex fragrances. Perfect for anyone who appreciates fine perfumery, regardless of gender.',
    'body-oils': 'Pamper your skin with our nourishing body oils. Infused with natural ingredients for a radiant, silky-smooth finish.',
    'face-creams': 'Transform your skincare routine with our premium face creams. Formulated for all skin types with natural ingredients.',
    'hair-products': 'Achieve gorgeous, healthy hair with our professional hair care products. From shampoos to styling treatments.',
    'gift-sets': 'Find the perfect gift with our curated sets. Beautifully packaged and ready to delight your loved ones.'
  };
  return descriptions[slug] || `Browse our collection of ${formatCategoryName(slug).toLowerCase()}`;
}

function getCategoryImage(slug) {
  const images = {
    'mens-perfumes': 'https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'womens-perfumes': 'https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'unisex-perfumes': 'https://images.unsplash.com/photo-1592919505780-303950717480?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'body-oils': 'https://images.unsplash.com/photo-1608248597377-82c439dd9c9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'face-creams': 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'hair-products': 'https://images.unsplash.com/photo-1585232351009-aa4b5a90f40e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'gift-sets': 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  };
  return images[slug] || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
}

export default async function CategoryPage({ params }) {
  const products = await getCategoryProducts(params.slug);
  const categoryName = formatCategoryName(params.slug);
  const categoryDescription = getCategoryDescription(params.slug);
  const categoryImage = getCategoryImage(params.slug);

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-900 to-pink-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={categoryImage} 
            alt={categoryName}
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <Link 
            href="/products" 
            className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Back to Products
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{categoryName}</h1>
          <p className="text-xl text-white/90 max-w-3xl">{categoryDescription}</p>
          <p className="mt-4 text-white/80">{products.length} products available</p>
        </div>
      </div>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Products Found</h2>
            <p className="text-gray-600 mb-8">We couldn't find any products in this category.</p>
            <Link 
              href="/products" 
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <>
            {/* Filter/Sort Bar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-8 flex flex-wrap items-center justify-between gap-4">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{products.length}</span> products
              </p>
              <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </main>
      
      <Footer />
    </>
  );
}
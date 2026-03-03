import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';

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
  return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export default async function CategoryPage({ params }) {
  const products = await getCategoryProducts(params.slug);
  const categoryName = formatCategoryName(params.slug);

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{categoryName}</h1>
        <p className="text-gray-600 mb-8">Browse our collection of {categoryName.toLowerCase()}</p>
        
        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No products found in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
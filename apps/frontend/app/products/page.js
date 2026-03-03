import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';

export const dynamic = 'force-dynamic';

async function getProducts(searchParams) {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mosketh-backend.vercel.app';
    const search = searchParams?.search ? `&search=${searchParams.search}` : '';
    const category = searchParams?.category ? `&category=${searchParams.category}` : '';
    
    const res = await fetch(`${API_URL}/api/products?featured=true${search}${category}`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function ProductsPage({ searchParams }) {
  const products = await getProducts(searchParams);

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">All Products</h1>
        
        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No products found</p>
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
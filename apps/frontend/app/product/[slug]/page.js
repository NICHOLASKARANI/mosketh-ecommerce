import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { FaShoppingCart, FaHeart, FaWhatsapp } from 'react-icons/fa';

export const dynamic = 'force-dynamic';

async function getProduct(slug) {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mosketh-backend.vercel.app';
    const res = await fetch(`${API_URL}/api/products/${slug}`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (!res.ok) return null;
    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.slug);

  if (!product) {
    return (
      <>
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <a href="/" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700">
            Continue Shopping
          </a>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            {product.images && product.images[0] && (
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <div className="mb-6">
              <span className="text-3xl font-bold text-purple-600">KES {product.priceKES}</span>
              {product.comparePriceKES && (
                <span className="ml-4 text-lg text-gray-400 line-through">KES {product.comparePriceKES}</span>
              )}
            </div>
            {product.stock <= product.lowStockAlert && product.stock > 0 && (
              <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg mb-6">
                Only {product.stock} left in stock!
              </div>
            )}
            {product.stock === 0 && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg mb-6">Out of stock</div>
            )}
            <div className="prose max-w-none mb-8">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
            <div className="flex gap-4 mb-8">
              <button className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2">
                <FaShoppingCart /> Add to Cart
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <FaHeart className="text-gray-600" />
              </button>
              <button className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600">
                <FaWhatsapp />
              </button>
            </div>
            <div className="border-t pt-6">
              <p className="text-sm text-gray-500 mb-2">SKU: {product.sku}</p>
              <p className="text-sm text-gray-500">Category: {product.category?.name}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

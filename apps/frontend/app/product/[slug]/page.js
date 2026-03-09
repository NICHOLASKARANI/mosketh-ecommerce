'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cartDB } from '@/lib/cartDB';
import { FaArrowLeft, FaShoppingCart } from 'react-icons/fa';

function getProductBySlug(slug) {
  try {
    const products = JSON.parse(localStorage.getItem('mosketh_admin_products') || '[]');
    return products.find(p =>
      p.slug === slug ||
      p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === slug
    );
  } catch {
    return null;
  }
}

export default function ProductDetail({ params }) {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const found = getProductBySlug(params.slug);
    setProduct(found);
    setLoading(false);
  }, [params.slug]);

  const handleAddToCart = () => {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      cartDB.addItem(product);
    }
    setAdded(true);
    alert(`${quantity} x ${product.name} added to cart!`);
    setTimeout(() => setAdded(false), 2000);
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

  if (!product) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <Link href="/products" className="text-purple-600 hover:text-purple-700">
            Back to Products
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/products" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6">
          <FaArrowLeft className="mr-2" /> Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.images?.[0] || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600'}
              alt={product.name}
              className="w-full h-auto object-cover"
              onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600'}
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <div className="text-3xl font-bold text-purple-600">KES {product.priceKES?.toLocaleString()}</div>
            
            {product.shortDescription && (
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-gray-700 italic">{product.shortDescription}</p>
              </div>
            )}
            
            <div className="border-t pt-4">
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-gray-600 whitespace-pre-line">{product.description}</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-medium">Stock:</span>
              {product.stock > 0 ? (
                <span className="text-green-600">{product.stock} available</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </div>

            {product.stock > 0 && (
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-gray-100">-</button>
                  <span className="px-4 py-2 border-x min-w-[60px] text-center">{quantity}</span>
                  <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="px-3 py-2 hover:bg-gray-100">+</button>
                </div>
              </div>
            )}

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 ${
                product.stock > 0
                  ? added ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'
                  : 'bg-gray-300 cursor-not-allowed'
              } text-white`}
            >
              <FaShoppingCart />
              {product.stock > 0 ? (added ? 'Added to Cart!' : 'Add to Cart') : 'Out of Stock'}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

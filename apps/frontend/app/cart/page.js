'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCartStore } from '@/store/cartStore';
import { FaTrash, FaPlus, FaMinus, FaShoppingBag } from 'react-icons/fa';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCartStore();

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <FaShoppingBag className="text-6xl text-gray-300 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link 
              href="/products" 
              className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition transform hover:scale-105"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart ({getTotalItems()} items)</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg p-4 flex flex-col sm:flex-row gap-4 hover:shadow-xl transition">
                {/* Product Image */}
                <Link href={`/product/${item.slug}`} className="sm:w-32 h-32 flex-shrink-0">
                  <img 
                    src={item.images?.[0] || 'https://via.placeholder.com/128'} 
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </Link>

                {/* Product Details */}
                <div className="flex-1">
                  <Link href={`/product/${item.slug}`}>
                    <h3 className="text-lg font-semibold text-gray-800 hover:text-purple-600 transition">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">{item.shortDescription}</p>
                  
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                        className="p-2 hover:bg-gray-100 transition"
                      >
                        <FaMinus size={12} />
                      </button>
                      <span className="px-4 py-2 border-x">{item.quantity || 1}</span>
                      <button
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                        className="p-2 hover:bg-gray-100 transition"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-lg font-bold text-purple-600">
                        KES {(item.priceKES * (item.quantity || 1)).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        KES {item.priceKES.toLocaleString()} each
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition"
                      title="Remove item"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>KES {getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{getTotalPrice() > 5000 ? 'Free' : 'KES 350'}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-purple-600">
                      KES {(getTotalPrice() + (getTotalPrice() > 5000 ? 0 : 350)).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {getTotalPrice() > 5000 
                      ? 'You qualify for free shipping!' 
                      : `Add KES ${(5000 - getTotalPrice()).toLocaleString()} more for free shipping`}
                  </p>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold flex items-center justify-center gap-2 transform hover:scale-105"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/products"
                className="w-full text-center text-purple-600 hover:text-purple-700 mt-4 block text-sm"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

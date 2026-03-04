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
            <p className="text-gray-600 mb-8">Looks like you haven't added any items yet.</p>
            <Link 
              href="/" 
              className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const subtotal = getTotalPrice();
  const shipping = subtotal > 5000 ? 0 : 350;
  const total = subtotal + shipping;

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart ({getTotalItems()} items)</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg p-4 flex gap-4">
                <img 
                  src={item.images?.[0] || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=100'} 
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-purple-600 font-bold mt-1">KES {item.priceKES}</p>
                  
                  <div className="flex items-center gap-2 mt-4">
                    <button 
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                      className="p-1 border rounded hover:bg-gray-100"
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className="w-8 text-center">{item.quantity || 1}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                      className="p-1 border rounded hover:bg-gray-100"
                    >
                      <FaPlus size={12} />
                    </button>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">KES {item.priceKES * (item.quantity || 1)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>KES {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `KES ${shipping}`}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-purple-600">KES {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold block text-center"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

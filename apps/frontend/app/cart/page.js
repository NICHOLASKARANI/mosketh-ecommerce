'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cart } from '@/lib/cart';
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaArrowRight } from 'react-icons/fa';

export default function CartPage() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
    
    const handleCartUpdate = () => loadCart();
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const loadCart = () => {
    const cartItems = cart.getItems();
    setItems(cartItems);
    setTotal(cart.getTotalPrice());
    setLoading(false);
  };

  const handleRemove = (id) => {
    cart.removeItem(id);
    loadCart();
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    // Update quantity logic here
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    localStorage.setItem('mosketh_cart', JSON.stringify(updatedItems));
    loadCart();
  };

  const handleClearCart = () => {
    if (confirm('Clear your cart?')) {
      cart.clearCart();
      loadCart();
    }
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

  if (items.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-lg">
            <FaShoppingBag className="text-6xl text-gray-300 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link 
              href="/" 
              className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition transform hover:scale-105"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Shopping Cart</h1>
          <p className="text-xl opacity-90">Review your items before checkout</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg p-6 flex gap-4 hover:shadow-xl transition">
                <img 
                  src={item.image || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=100'} 
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-purple-600 font-bold text-xl mt-1">KES {item.price?.toLocaleString()}</p>
                  
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center border rounded-lg">
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, (item.quantity || 1) - 1)}
                        className="p-2 hover:bg-gray-100 transition"
                      >
                        <FaMinus size={12} />
                      </button>
                      <span className="px-4 py-2 border-x">{item.quantity || 1}</span>
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                        className="p-2 hover:bg-gray-100 transition"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>
                    <button 
                      onClick={() => handleRemove(item.id)}
                      className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-800">
                    KES {((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
            
            <div className="flex justify-between items-center">
              <button
                onClick={handleClearCart}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Clear Cart
              </button>
              <p className="text-gray-600">
                {items.length} item{items.length !== 1 ? 's' : ''} in cart
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.name} x{item.quantity}</span>
                    <span className="font-medium">KES {((item.price || 0) * (item.quantity || 1)).toLocaleString()}</span>
                  </div>
                ))}
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-purple-600">KES {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 transition font-semibold flex items-center justify-center gap-2 text-lg"
              >
                Proceed to Checkout <FaArrowRight />
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

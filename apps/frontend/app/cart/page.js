'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCartStore } from '@/store/cartStore';
import { FaTrash, FaPlus, FaMinus, FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const [checkoutStep, setCheckoutStep] = useState('cart'); // cart, details, payment, confirmation
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    deliveryMethod: 'standard'
  });

  const subtotal = items.reduce((sum, item) => sum + (item.priceKES * (item.quantity || 1)), 0);
  const deliveryFee = subtotal > 5000 ? 0 : 350;
  const total = subtotal + deliveryFee;

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleCheckout = () => {
    setCheckoutStep('details');
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    setCheckoutStep('payment');
  };

  const handleMpesaPayment = async () => {
    try {
      toast.loading('Processing payment...', { id: 'mpesa' });
      
      const response = await fetch('/api/mpesa/stk-push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: customerDetails.phone,
          amount: total,
          orderId: Date.now()
        })
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('STK Push sent! Check your phone to complete payment', { id: 'mpesa' });
        setCheckoutStep('confirmation');
        
        // Clear cart after successful payment
        setTimeout(() => {
          clearCart();
        }, 5000);
      } else {
        toast.error(data.error || 'Payment failed', { id: 'mpesa' });
      }
    } catch (error) {
      toast.error('Payment service unavailable', { id: 'mpesa' });
    }
  };

  const handleWhatsAppOrder = () => {
    const itemsList = items.map(item => 
      `${item.name} x${item.quantity || 1} - KES ${item.priceKES * (item.quantity || 1)}`
    ).join('\n');

    const message = `New Order from Mosketh:
Customer: ${customerDetails.name}
Phone: ${customerDetails.phone}
Address: ${customerDetails.address}, ${customerDetails.city}

Items:
${itemsList}

Total: KES ${total}

Delivery: ${deliveryFee === 0 ? 'Free' : `KES ${deliveryFee}`}`;

    window.open(`https://wa.me/254742783907?text=${encodeURIComponent(message)}`, '_blank');
    setCheckoutStep('confirmation');
    clearCart();
  };

  if (items.length === 0 && checkoutStep === 'cart') {
    return (
      <>
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link 
            href="/products" 
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
          >
            Continue Shopping
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  if (checkoutStep === 'confirmation') {
    return (
      <>
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="bg-green-100 text-green-700 p-8 rounded-lg max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
            <p className="mb-4">Your order has been placed successfully.</p>
            <p className="mb-4">You will receive a confirmation via SMS and email shortly.</p>
            <Link 
              href="/products" 
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {checkoutStep === 'cart' ? (
              <>
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b py-4">
                    <img 
                      src={item.images?.[0] || '/placeholder.jpg'} 
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-purple-600 font-bold">KES {item.priceKES}</p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <button 
                          onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
                          className="p-1 border rounded hover:bg-gray-100"
                        >
                          <FaMinus size={12} />
                        </button>
                        <span className="w-8 text-center">{item.quantity || 1}</span>
                        <button 
                          onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
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
              </>
            ) : (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between py-2 border-b">
                    <span>{item.name} x{item.quantity || 1}</span>
                    <span>KES {item.priceKES * (item.quantity || 1)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Checkout Sidebar */}
          <div className="lg:col-span-1">
            {checkoutStep === 'cart' && (
              <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>KES {subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>{deliveryFee === 0 ? 'Free' : `KES ${deliveryFee}`}</span>
                  </div>
                  <div className="border-t pt-2 font-bold text-lg">
                    <div className="flex justify-between">
                      <span>Total</span>
                      <span>KES {total}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}

            {checkoutStep === 'details' && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Delivery Details</h2>
                
                <form onSubmit={handleDetailsSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={customerDetails.name}
                      onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={customerDetails.email}
                      onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={customerDetails.phone}
                      onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                      placeholder="e.g., 0712345678"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Delivery Address</label>
                    <input
                      type="text"
                      required
                      value={customerDetails.address}
                      onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">City/Town</label>
                    <input
                      type="text"
                      required
                      value={customerDetails.city}
                      onChange={(e) => setCustomerDetails({...customerDetails, city: e.target.value})}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Delivery Method</label>
                    <select
                      value={customerDetails.deliveryMethod}
                      onChange={(e) => setCustomerDetails({...customerDetails, deliveryMethod: e.target.value})}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                      <option value="standard">Standard Delivery (1-3 days) - KES 350</option>
                      <option value="express">Express Delivery (24hrs) - KES 800</option>
                      <option value="pickup">Store Pickup - Free</option>
                    </select>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {checkoutStep === 'payment' && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                
                <div className="space-y-4">
                  <div className="border p-4 rounded-lg hover:border-purple-600 cursor-pointer">
                    <label className="flex items-center gap-3">
                      <input type="radio" name="payment" defaultChecked className="text-purple-600" />
                      <span className="font-medium">M-Pesa</span>
                    </label>
                    <p className="text-sm text-gray-600 mt-2 ml-7">
                      Pay via M-Pesa. You will receive an STK push on your phone.
                    </p>
                  </div>
                  
                  <button
                    onClick={handleMpesaPayment}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
                  >
                    Pay with M-Pesa
                  </button>
                  
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-gray-50 text-gray-500">Or</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition font-semibold flex items-center justify-center gap-2"
                  >
                    <FaWhatsapp /> Order via WhatsApp
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
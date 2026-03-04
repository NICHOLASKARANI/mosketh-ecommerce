'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cart } from '@/lib/cart';
import { FaArrowLeft, FaMobile, FaWhatsapp, FaLock, FaTruck, FaMapMarkerAlt, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    deliveryMethod: 'standard'
  });
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const cartItems = cart.getItems();
    if (cartItems.length === 0) {
      router.push('/cart');
      return;
    }
    setItems(cartItems);
    setTotal(cart.getTotalPrice());
    setLoading(false);
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContinue = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    // Clear cart after successful order
    cart.clearCart();
  };

  const subtotal = total;
  const deliveryFee = subtotal > 5000 ? 0 : 350;
  const grandTotal = subtotal + deliveryFee;

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

  if (orderPlaced) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-lg">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h1>
            <p className="text-gray-600 mb-8">
              Thank you for shopping with Mosketh Perfumes & Beauty.
              You will receive a confirmation SMS and email shortly.
            </p>
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
      
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Checkout</h1>
          <p className="text-xl opacity-90">Complete your purchase in a few simple steps</p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-12">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= i ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {i}
              </div>
              {i < 4 && (
                <div className={`flex-1 h-1 mx-2 ${
                  step > i ? 'bg-purple-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Review Order */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Step 1: Review Your Order</h2>
            
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <img 
                    src={item.image || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=60'} 
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-purple-600">KES {((item.price || 0) * (item.quantity || 1)).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">KES {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-semibold">{deliveryFee === 0 ? 'Free' : `KES ${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t">
                <span>Total</span>
                <span className="text-purple-600">KES {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleContinue}
              className="w-full bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 transition font-semibold text-lg"
            >
              Continue to Delivery Details
            </button>
          </div>
        )}

        {/* Step 2: Delivery Details */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Step 2: Delivery Details</h2>
            
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email Address *</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                      placeholder="0712345678"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">City/Town *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Nairobi"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Delivery Address *</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Shop F5, Superior Centre, Kimathi Street"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Delivery Method *</label>
                <div className="grid md:grid-cols-3 gap-3">
                  {[
                    { value: 'standard', label: 'Standard', price: 350, time: '1-3 days', icon: FaTruck },
                    { value: 'express', label: 'Express', price: 800, time: '24 hours', icon: FaTruck },
                    { value: 'pickup', label: 'Store Pickup', price: 0, time: 'Free', icon: FaMapMarkerAlt }
                  ].map(method => {
                    const Icon = method.icon;
                    return (
                      <label key={method.value} className={`border rounded-lg p-4 cursor-pointer transition ${
                        formData.deliveryMethod === method.value 
                          ? 'border-purple-600 bg-purple-50' 
                          : 'border-gray-200 hover:border-purple-300'
                      }`}>
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value={method.value}
                          checked={formData.deliveryMethod === method.value}
                          onChange={handleInputChange}
                          className="hidden"
                        />
                        <Icon className={`text-2xl mb-2 ${
                          formData.deliveryMethod === method.value ? 'text-purple-600' : 'text-gray-400'
                        }`} />
                        <p className="font-semibold">{method.label}</p>
                        <p className="text-sm text-gray-500">{method.time}</p>
                        <p className="text-sm font-bold text-purple-600">KES {method.price}</p>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleContinue}
                  className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Payment Method */}
        {step === 3 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Step 3: Payment Method</h2>
            
            <div className="space-y-4 mb-8">
              {[
                { value: 'mpesa', label: 'M-PESA', icon: FaMobile, description: 'Pay via M-PESA. You\'ll receive an STK push on your phone.' },
                { value: 'card', label: 'Card Payment', icon: FaLock, description: 'Pay securely with your credit or debit card.' },
                { value: 'whatsapp', label: 'WhatsApp Order', icon: FaWhatsapp, description: 'Place order via WhatsApp. We\'ll contact you for payment.' }
              ].map(method => {
                const Icon = method.icon;
                return (
                  <label key={method.value} className={`flex items-start p-4 border rounded-lg cursor-pointer transition ${
                    paymentMethod === method.value 
                      ? 'border-purple-600 bg-purple-50' 
                      : 'border-gray-200 hover:border-purple-300'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value={method.value}
                      checked={paymentMethod === method.value}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1 mr-3"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className={paymentMethod === method.value ? 'text-purple-600' : 'text-gray-400'} />
                        <span className="font-semibold">{method.label}</span>
                      </div>
                      <p className="text-sm text-gray-500">{method.description}</p>
                    </div>
                  </label>
                );
              })}
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-2">Order Summary</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>KES {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{deliveryFee === 0 ? 'Free' : `KES ${deliveryFee}`}</span>
                </div>
                <div className="border-t pt-1 mt-1 font-bold">
                  <div className="flex justify-between text-purple-600">
                    <span>Total</span>
                    <span>KES {grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleBack}
                className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition"
              >
                Back
              </button>
              <button
                onClick={handlePlaceOrder}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
              >
                Place Order
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation (handled above) */}
      </main>

      <Footer />
    </>
  );
}

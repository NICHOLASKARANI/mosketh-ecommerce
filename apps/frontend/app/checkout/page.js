'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCartStore } from '@/store/cartStore';
import { FaArrowLeft, FaMobile, FaWhatsapp, FaLock } from 'react-icons/fa';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    deliveryMethod: 'standard'
  });
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getTotalPrice();
  const deliveryFee = subtotal > 5000 ? 0 : 350;
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Add some items to your cart before checking out.</p>
          <button
            onClick={() => router.push('/')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
          >
            Continue Shopping
          </button>
        </div>
        <Footer />
      </>
    );
  }

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

  const handleMpesaPayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate M-Pesa STK Push
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In production, you would call your M-Pesa API here
      alert('STK Push sent! Please check your phone to complete payment.');
      
      // After successful payment
      clearCart();
      setStep(4); // Success step
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleWhatsAppOrder = () => {
    const itemsList = items.map(item => 
      `${item.name} x${item.quantity || 1} - KES ${item.priceKES * (item.quantity || 1)}`
    ).join('\n');

    const message = `🛍️ *New Order from Mosketh*

👤 *Customer:* ${formData.name}
📧 *Email:* ${formData.email}
📞 *Phone:* ${formData.phone}
📍 *Address:* ${formData.address}, ${formData.city}
🚚 *Delivery:* ${formData.deliveryMethod === 'standard' ? 'Standard (KES 350)' : formData.deliveryMethod === 'express' ? 'Express (KES 800)' : 'Store Pickup (Free)'}

*Items:*
${itemsList}

💰 *Subtotal:* KES ${subtotal}
🚚 *Delivery:* KES ${deliveryFee}
💵 *Total:* KES ${total}

Thank you for shopping with Mosketh!`;

    window.open(`https://wa.me/254742783907?text=${encodeURIComponent(message)}`, '_blank');
    clearCart();
    setStep(4);
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= i ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {i}
              </div>
              {i < 3 && (
                <div className={`flex-1 h-1 mx-2 ${
                  step > i ? 'bg-purple-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Cart Review */}
        {step === 1 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Review Your Order</h2>
            
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 py-4 border-b">
                <img 
                  src={item.images?.[0] || '/placeholder.jpg'} 
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity || 1}</p>
                </div>
                <p className="font-bold text-purple-600">
                  KES {item.priceKES * (item.quantity || 1)}
                </p>
              </div>
            ))}

            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>KES {subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span>{deliveryFee === 0 ? 'Free' : `KES ${deliveryFee}`}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-purple-600">KES {total}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleContinue}
              className="w-full mt-6 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
            >
              Continue to Details
            </button>
          </div>
        )}

        {/* Step 2: Delivery Details */}
        {step === 2 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Delivery Details</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="0712345678"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Delivery Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">City/Town *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Delivery Method *</label>
                <select
                  name="deliveryMethod"
                  value={formData.deliveryMethod}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600"
                >
                  <option value="standard">Standard Delivery (1-3 days) - KES 350</option>
                  <option value="express">Express Delivery (24 hours) - KES 800</option>
                  <option value="pickup">Store Pickup (Free)</option>
                </select>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleContinue}
                  className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
            
            <div className="space-y-4 mb-6">
              <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-purple-600">
                <input
                  type="radio"
                  name="payment"
                  value="mpesa"
                  checked={paymentMethod === 'mpesa'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <FaMobile className="text-green-600" />
                    <span className="font-semibold">M-PESA</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Pay via M-PESA. You'll receive an STK push on your phone.
                  </p>
                </div>
              </label>

              <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-purple-600">
                <input
                  type="radio"
                  name="payment"
                  value="whatsapp"
                  checked={paymentMethod === 'whatsapp'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <FaWhatsapp className="text-green-500" />
                    <span className="font-semibold">WhatsApp Order</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Place order via WhatsApp. We'll contact you for payment.
                  </p>
                </div>
              </label>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-2">Order Summary</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>KES {subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{deliveryFee === 0 ? 'Free' : `KES ${deliveryFee}`}</span>
                </div>
                <div className="border-t pt-1 mt-1 font-bold">
                  <div className="flex justify-between text-purple-600">
                    <span>Total</span>
                    <span>KES {total}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleBack}
                className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600"
              >
                Back
              </button>
              
              {paymentMethod === 'mpesa' ? (
                <button
                  onClick={handleMpesaPayment}
                  disabled={isProcessing}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 flex items-center justify-center gap-2"
                >
                  {isProcessing ? 'Processing...' : <><FaMobile /> Pay with M-PESA</>}
                </button>
              ) : (
                <button
                  onClick={handleWhatsAppOrder}
                  className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
                >
                  <FaWhatsapp /> Order via WhatsApp
                </button>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-8">
              Thank you for shopping with Mosketh Perfumes & Beauty.
              {paymentMethod === 'mpesa' 
                ? ' You will receive a confirmation SMS shortly.'
                : ' Our team will contact you on WhatsApp within 5 minutes.'}
            </p>
            <button
              onClick={() => router.push('/')}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

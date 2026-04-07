'use client';

import { useState } from 'react';

export default function OrderTracker({ orderId, phoneNumber }) {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);

  const trackOrder = async () => {
    // Simulate order tracking
    const statuses = ['Order Confirmed', 'Processing', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    setOrderStatus(randomStatus);
    
    // Send WhatsApp notification
    const message = `Your order #${orderId} is now: ${randomStatus}. Track at: ${window.location.origin}/track/${orderId}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="font-bold text-lg mb-4">Track Your Order 📦</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-2">Order Number</label>
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Enter your order number"
          />
        </div>

        <button
          onClick={trackOrder}
          disabled={!trackingNumber}
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
        >
          Track Order
        </button>

        {orderStatus && (
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-2">Order Status:</p>
            <p className="font-bold text-green-600 text-lg">{orderStatus}</p>
            <p className="text-xs text-gray-500 mt-2">
              We've sent tracking info to your WhatsApp. Check your messages!
            </p>
          </div>
        )}

        <div className="text-center">
          <a 
            href={`https://wa.me/254742783907?text=Hello! I need help with my order #${trackingNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:text-green-700 text-sm"
          >
            Need help? Chat with us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}


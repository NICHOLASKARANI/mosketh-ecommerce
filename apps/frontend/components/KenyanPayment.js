'use client';

import { useState } from 'react';

const PAYMENT_METHODS = {
  mpesa: {
    name: 'M-PESA',
    icon: '📱',
    description: 'Pay using M-PESA - Instant confirmation',
    instructions: 'You will receive an STK push on your phone'
  },
  bank: {
    name: 'Bank Transfer',
    icon: '🏦',
    description: 'Pay via bank transfer',
    instructions: 'Account: Mosketh Beauty, Equity Bank, Account: 1234567890'
  },
  cash: {
    name: 'Cash on Delivery',
    icon: '💵',
    description: 'Pay when you receive your order',
    instructions: 'Available for Nairobi and major towns'
  },
  airtel: {
    name: 'Airtel Money',
    icon: '📱',
    description: 'Pay using Airtel Money',
    instructions: 'You will receive a payment request'
  }
};

export default function KenyanPayment({ amount, onSelect }) {
  const [selectedMethod, setSelectedMethod] = useState('mpesa');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePayment = () => {
    onSelect?.({ method: selectedMethod, phoneNumber, amount });
    
    if (selectedMethod === 'mpesa' && phoneNumber) {
      // Simulate STK push
      alert(`STK push sent to ${phoneNumber}. Enter your M-PESA PIN to complete payment of KES ${amount.toLocaleString()}`);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg">Select Payment Method</h3>
      
      <div className="grid gap-3">
        {Object.entries(PAYMENT_METHODS).map(([key, method]) => (
          <label key={key} className={`border rounded-lg p-4 cursor-pointer transition ${selectedMethod === key ? 'border-purple-600 bg-purple-50' : 'border-gray-200'}`}>
            <input
              type="radio"
              name="payment"
              value={key}
              checked={selectedMethod === key}
              onChange={() => setSelectedMethod(key)}
              className="mr-3"
            />
            <div className="inline-block">
              <span className="font-semibold">{method.icon} {method.name}</span>
              <p className="text-sm text-gray-500">{method.description}</p>
              <p className="text-xs text-gray-400">{method.instructions}</p>
            </div>
          </label>
        ))}
      </div>

      {(selectedMethod === 'mpesa' || selectedMethod === 'airtel') && (
        <div>
          <label className="block text-sm font-medium mb-2">Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="0712345678"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <p className="text-xs text-gray-500 mt-1">Enter the M-PESA/Airtel Money registered number</p>
        </div>
      )}

      <button
        onClick={handlePayment}
        disabled={selectedMethod === 'mpesa' && !phoneNumber}
        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold disabled:opacity-50"
      >
        Pay KES {amount.toLocaleString()}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Your payment is secure and encrypted. We never store your payment details.
      </p>
    </div>
  );
}


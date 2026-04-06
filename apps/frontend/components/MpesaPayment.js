'use client';

import { useState } from 'react';

export default function MpesaPayment({ amount, phoneNumber, onSuccess, onError }) {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const initiatePayment = async () => {
    setLoading(true);
    try {
      // This would connect to your backend M-PESA API
      const response = await fetch('/api/mpesa/stkpush', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, phoneNumber })
      });
      
      const data = await response.json();
      if (data.success) {
        setPaymentStatus('success');
        onSuccess?.(data);
      } else {
        setPaymentStatus('error');
        onError?.(data);
      }
    } catch (error) {
      setPaymentStatus('error');
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-green-50 rounded-lg p-4">
      <div className="flex items-center gap-3 mb-3">
        <img src="/mpesa-logo.png" alt="M-PESA" className="h-8" />
        <span className="font-semibold">Pay with M-PESA</span>
      </div>
      <button
        onClick={initiatePayment}
        disabled={loading}
        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
      >
        {loading ? 'Processing...' : `Pay KES ${amount.toLocaleString()} via M-PESA`}
      </button>
      <p className="text-xs text-gray-500 mt-2">
        You will receive an STK push on your phone. Enter your M-PESA PIN to complete payment.
      </p>
    </div>
  );
}

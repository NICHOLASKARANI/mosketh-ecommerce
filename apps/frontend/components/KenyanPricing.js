'use client';

import { useState, useEffect } from 'react';

export default function KenyanPricing({ basePrice, quantity, onPriceChange }) {
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(basePrice);

  // Kenyan market bulk discounts
  const calculateDiscount = (qty) => {
    if (qty >= 50) return 0.25; // 25% off for 50+ items
    if (qty >= 20) return 0.15;  // 15% off for 20+ items
    if (qty >= 10) return 0.10;  // 10% off for 10+ items
    if (qty >= 5) return 0.05;   // 5% off for 5+ items
    return 0;
  };

  useEffect(() => {
    const newDiscount = calculateDiscount(quantity);
    setDiscount(newDiscount);
    const newPrice = basePrice * (1 - newDiscount);
    setFinalPrice(newPrice);
    onPriceChange?.(newPrice);
  }, [quantity, basePrice]);

  return (
    <div className="bg-yellow-50 rounded-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-600">Original Price:</span>
        <span className="line-through text-gray-500">KES {basePrice.toLocaleString()}</span>
      </div>
      {discount > 0 && (
        <div className="flex justify-between items-center mb-2 text-green-600">
          <span>Bulk Discount ({discount * 100}%):</span>
          <span>- KES {(basePrice * discount).toLocaleString()}</span>
        </div>
      )}
      <div className="flex justify-between items-center pt-2 border-t">
        <span className="font-bold text-lg">Your Price:</span>
        <span className="font-bold text-2xl text-green-600">KES {finalPrice.toLocaleString()}</span>
      </div>
      {quantity >= 10 && (
        <p className="text-xs text-green-600 mt-2">
          🎉 You qualify for bulk pricing! Share with friends and save more!
        </p>
      )}
    </div>
  );
}

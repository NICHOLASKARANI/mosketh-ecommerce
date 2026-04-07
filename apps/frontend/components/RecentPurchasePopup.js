'use client';

import { useState, useEffect } from 'react';
import { FaShoppingBag, FaUser } from 'react-icons/fa';

export default function RecentPurchasePopup() {
  const [show, setShow] = useState(false);
  const [purchase, setPurchase] = useState(null);

  const samplePurchases = [
    { name: 'Sarah M.', product: 'YARA Cherry Body Mist', time: '2 minutes ago', location: 'Nairobi' },
    { name: 'James K.', product: 'Dr. Rashel Sunscreen', time: '5 minutes ago', location: 'Mombasa' },
    { name: 'Grace W.', product: 'Marshmallow Blush', time: '12 minutes ago', location: 'Kisumu' },
    { name: 'Peter O.', product: 'Double Dose Molato Cream', time: '20 minutes ago', location: 'Nakuru' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomPurchase = samplePurchases[Math.floor(Math.random() * samplePurchases.length)];
      setPurchase(randomPurchase);
      setShow(true);
      
      setTimeout(() => setShow(false), 5000);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (!show || !purchase) return null;

  return (
    <div className="fixed bottom-20 left-4 z-50 bg-white rounded-lg shadow-2xl p-4 max-w-sm animate-slide-in-right border-l-4 border-green-500">
      <div className="flex items-start gap-3">
        <div className="bg-green-100 p-2 rounded-full">
          <FaShoppingBag className="text-green-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Someone just bought</p>
          <p className="font-semibold text-gray-800">{purchase.product}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
            <FaUser size={10} />
            <span>{purchase.name} from {purchase.location}</span>
            <span>•</span>
            <span>{purchase.time}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

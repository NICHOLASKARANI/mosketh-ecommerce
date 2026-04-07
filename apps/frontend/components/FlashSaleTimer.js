'use client';

import { useState, useEffect } from 'react';
import { FaFire, FaClock } from 'react-icons/fa';

export default function FlashSaleTimer({ endDate, discountPercent }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(endDate).getTime() - now;
      
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  if (timeLeft.days < 0) return null;

  return (
    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg p-4 mb-6 animate-pulse">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <FaFire className="text-2xl" />
          <span className="font-bold">FLASH SALE! {discountPercent}% OFF</span>
        </div>
        <div className="flex items-center gap-2">
          <FaClock />
          <div className="flex gap-1 font-mono">
            <span className="bg-black bg-opacity-30 px-2 py-1 rounded">{timeLeft.hours}h</span>
            <span className="text-xl">:</span>
            <span className="bg-black bg-opacity-30 px-2 py-1 rounded">{timeLeft.minutes}m</span>
            <span className="text-xl">:</span>
            <span className="bg-black bg-opacity-30 px-2 py-1 rounded">{timeLeft.seconds}s</span>
          </div>
        </div>
      </div>
    </div>
  );
}

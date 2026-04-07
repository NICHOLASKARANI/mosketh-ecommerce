'use client';

import { useState, useEffect } from 'react';
import { FaStar, FaGift, FaTrophy } from 'react-icons/fa';

export default function LoyaltyPoints() {
  const [points, setPoints] = useState(0);
  const [redeemAmount, setRedeemAmount] = useState(0);

  useEffect(() => {
    // Load points from localStorage
    const savedPoints = localStorage.getItem('loyalty_points');
    if (savedPoints) {
      setPoints(parseInt(savedPoints));
    }
    
    // Listen for points updates
    window.addEventListener('pointsUpdated', (e) => {
      setPoints(e.detail?.points || 0);
    });
  }, []);

  const redeemPoints = () => {
    const pointsToRedeem = Math.min(points, 500);
    const discount = (pointsToRedeem / 100) * 50; // 100 points = 50 KES
    
    if (pointsToRedeem > 0) {
      localStorage.setItem('loyalty_discount', discount);
      localStorage.setItem('loyalty_points_used', pointsToRedeem);
      alert(`You redeemed ${pointsToRedeem} points for KES ${discount} off your order!`);
      
      const newPoints = points - pointsToRedeem;
      setPoints(newPoints);
      localStorage.setItem('loyalty_points', newPoints);
    }
  };

  // How to earn points
  const earnWays = [
    { action: 'Make a purchase', points: '10 per 100 KES' },
    { action: 'Write a review', points: 50 },
    { action: 'Share on social media', points: 30 },
    { action: 'Refer a friend', points: 100 },
    { action: 'Birthday month', points: 200 },
  ];

  return (
    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FaTrophy className="text-2xl" />
          <h3 className="text-xl font-bold">Loyalty Rewards</h3>
        </div>
        <div className="bg-white text-purple-600 px-4 py-2 rounded-full font-bold">
          {points} Points
        </div>
      </div>
      
      <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <FaStar />
          <span className="font-semibold">Points Balance: {points}</span>
        </div>
        <p className="text-sm opacity-90">100 points = KES 50 off your next purchase!</p>
        {points >= 100 && (
          <button
            onClick={redeemPoints}
            className="mt-3 bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition"
          >
            Redeem Points Now
          </button>
        )}
      </div>
      
      <div className="text-sm">
        <p className="font-semibold mb-2">How to earn points:</p>
        <div className="space-y-1">
          {earnWays.map((way, idx) => (
            <div key={idx} className="flex justify-between">
              <span>{way.action}</span>
              <span className="font-semibold">+{way.points} pts</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

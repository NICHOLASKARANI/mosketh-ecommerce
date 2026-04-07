'use client';

import { useState, useEffect } from 'react';
import { FaShareAlt, FaWhatsapp, FaFacebook, FaTwitter, FaCopy, FaGift } from 'react-icons/fa';

export default function ReferralProgram() {
  const [referralCode, setReferralCode] = useState('');
  const [referralCount, setReferralCount] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Generate or load referral code
    let code = localStorage.getItem('referral_code');
    if (!code) {
      code = 'MOSKETH' + Math.random().toString(36).substring(2, 8).toUpperCase();
      localStorage.setItem('referral_code', code);
    }
    setReferralCode(code);
    
    // Load referral count
    const count = localStorage.getItem('referral_count');
    if (count) setReferralCount(parseInt(count));
  }, []);

  const referralLink = `https://moskethperfumesandbeauty.com?ref=${referralCode}`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnWhatsApp = () => {
    const text = `Get 10% off your first order at Mosketh Perfumes & Beauty! Use my referral link: ${referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`, '_blank');
  };

  const shareOnTwitter = () => {
    const text = `Get 10% off your first order at Mosketh Perfumes & Beauty! Use my referral link:`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(referralLink)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-purple-100 p-3 rounded-full">
          <FaGift className="text-2xl text-purple-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Refer & Earn! 🎁</h3>
          <p className="text-gray-600 text-sm">Share and get discounts for you and your friends</p>
        </div>
      </div>

      <div className="bg-purple-50 rounded-lg p-4 mb-4">
        <p className="text-sm text-gray-600 mb-1">Your Referral Code</p>
        <div className="flex items-center gap-2">
          <code className="bg-white px-4 py-2 rounded-lg font-mono text-lg flex-1 text-center">
            {referralCode}
          </code>
          <button
            onClick={copyToClipboard}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
          >
            <FaCopy /> {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Share via</p>
        <div className="flex gap-3">
          <button onClick={shareOnWhatsApp} className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition">
            <FaWhatsapp size={20} />
          </button>
          <button onClick={shareOnFacebook} className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition">
            <FaFacebook size={20} />
          </button>
          <button onClick={shareOnTwitter} className="bg-sky-500 text-white p-3 rounded-full hover:bg-sky-600 transition">
            <FaTwitter size={20} />
          </button>
          <button onClick={copyToClipboard} className="bg-gray-600 text-white p-3 rounded-full hover:bg-gray-700 transition">
            <FaShareAlt size={20} />
          </button>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold">Your Referrals</p>
            <p className="text-2xl font-bold text-purple-600">{referralCount}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">Earned Discount</p>
            <p className="text-2xl font-bold text-green-600">KES {referralCount * 100}</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3 text-center">
          You get KES 100 for each friend who makes their first purchase!
        </p>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { 
  FaFacebook, FaTwitter, FaWhatsapp, FaInstagram, 
  FaShareAlt, FaTimes, FaTiktok, FaTelegram 
} from 'react-icons/fa';

export default function SocialShare() {
  const [showButtons, setShowButtons] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const shareText = "Check out Mosketh Perfumes & Beauty - Luxury fragrances in Kenya!";

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + currentUrl)}`, '_blank');
  };

  const shareOnTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50">
      {showButtons ? (
        <div className="flex flex-col gap-3 bg-white p-3 rounded-2xl shadow-2xl animate-slideIn">
          <button
            onClick={shareOnFacebook}
            className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition transform hover:scale-110"
            title="Share on Facebook"
          >
            <FaFacebook size={20} />
          </button>
          <button
            onClick={shareOnTwitter}
            className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition transform hover:scale-110"
            title="Share on Twitter"
          >
            <FaTwitter size={20} />
          </button>
          <button
            onClick={shareOnWhatsApp}
            className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition transform hover:scale-110"
            title="Share on WhatsApp"
          >
            <FaWhatsapp size={20} />
          </button>
          <button
            onClick={shareOnTelegram}
            className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition transform hover:scale-110"
            title="Share on Telegram"
          >
            <FaTelegram size={20} />
          </button>
          <button
            onClick={() => setShowButtons(false)}
            className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition"
          >
            <FaTimes size={20} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowButtons(true)}
          className="bg-purple-600 text-white p-4 rounded-full hover:bg-purple-700 transition shadow-lg transform hover:scale-110 animate-bounce-slow"
          title="Share this page"
        >
          <FaShareAlt size={24} />
        </button>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        .animate-bounce-slow {
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}

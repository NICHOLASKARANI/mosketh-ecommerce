'use client';

import { FaWhatsapp, FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaCopy } from 'react-icons/fa';

export default function SocialShare({ product, affiliateCode }) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out ${product.name} at Mosketh Perfumes & Beauty! Only KES ${product.priceKES?.toLocaleString()} 🎁✨`;

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    instagram: `instagram://library?AssetPath=${encodeURIComponent(shareUrl)}`, // Opens Instagram
    tiktok: `https://www.tiktok.com/@mosketh_beauty` // Your TikTok profile
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied! Share with your friends!');
  };

  // Generate affiliate link
  const getAffiliateLink = () => {
    return `${shareUrl}?ref=${affiliateCode}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="font-bold text-lg mb-4">Share & Earn! 🎁</h3>
      <p className="text-sm text-gray-600 mb-4">
        Share this product with friends and family. When they buy, you both save!
      </p>
      
      <div className="grid grid-cols-5 gap-2 mb-6">
        <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" 
           className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition text-center">
          <FaWhatsapp className="mx-auto text-xl" />
          <span className="text-xs mt-1 block">WhatsApp</span>
        </a>
        <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer"
           className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition text-center">
          <FaFacebook className="mx-auto text-xl" />
          <span className="text-xs mt-1 block">Facebook</span>
        </a>
        <a href={shareLinks.instagram} target="_blank" rel="noopener noreferrer"
           className="bg-pink-600 text-white p-3 rounded-lg hover:bg-pink-700 transition text-center">
          <FaInstagram className="mx-auto text-xl" />
          <span className="text-xs mt-1 block">Instagram</span>
        </a>
        <a href={shareLinks.tiktok} target="_blank" rel="noopener noreferrer"
           className="bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition text-center">
          <FaTiktok className="mx-auto text-xl" />
          <span className="text-xs mt-1 block">TikTok</span>
        </a>
        <button onClick={copyToClipboard}
                className="bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700 transition text-center">
          <FaCopy className="mx-auto text-xl" />
          <span className="text-xs mt-1 block">Copy Link</span>
        </button>
      </div>

      <div className="bg-yellow-50 rounded-lg p-3">
        <p className="text-sm font-semibold mb-2">Your Affiliate Link:</p>
        <code className="text-xs bg-white p-2 rounded block break-all">{getAffiliateLink()}</code>
        <p className="text-xs text-gray-500 mt-2">
          💰 Earn 10% commission on every sale through your link!
        </p>
      </div>
    </div>
  );
}

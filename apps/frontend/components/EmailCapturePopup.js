'use client';

import { useState, useEffect } from 'react';
import { FaTimes, FaEnvelope, FaGift, FaWhatsapp } from 'react-icons/fa';

export default function EmailCapturePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Show popup after 10 seconds, but only once per session
    const hasSeenPopup = sessionStorage.getItem('newsletter_popup_seen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('newsletter_popup_seen', 'true');
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save to localStorage (you can connect to backend API later)
    const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
    subscribers.push({
      email,
      name,
      date: new Date().toISOString(),
      source: 'website_popup'
    });
    localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSuccess(true);
    setIsSubmitting(false);
    
    // Close popup after 3 seconds
    setTimeout(() => {
      setIsOpen(false);
      setIsSuccess(false);
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition z-10"
        >
          <FaTimes size={20} />
        </button>

        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-center">
          <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <FaGift className="text-3xl text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-white">Get 10% OFF!</h3>
          <p className="text-white opacity-90 mt-2">Subscribe for exclusive offers & new arrivals</p>
        </div>

        {isSuccess ? (
          <div className="p-6 text-center">
            <div className="bg-green-100 text-green-600 p-4 rounded-lg">
              <p className="font-semibold">Thanks for subscribing! 🎉</p>
              <p className="text-sm mt-1">Check your email for your 10% discount code!</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="John Doe"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="you@example.com"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold disabled:opacity-50"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe & Get 10% OFF'}
            </button>
            <p className="text-xs text-gray-500 text-center mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

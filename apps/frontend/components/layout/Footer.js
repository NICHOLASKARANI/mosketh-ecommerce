'use client';

import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaTiktok, FaTelegram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-purple-400 mb-4">Mosketh Perfumes</h3>
            <p className="text-gray-400 mb-4">
              Your premier destination for authentic luxury perfumes in Kenya.
            </p>
            <p className="text-gray-400">
              Shop F5, Superior Centre<br />
              Kimathi Street, Nairobi CBD<br />
              Kenya
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-purple-400 transition">About Us</Link></li>
              <li><Link href="/products" className="text-gray-400 hover:text-purple-400 transition">Products</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-purple-400 transition">Blog</Link></li>
              <li><Link href="/faqs" className="text-gray-400 hover:text-purple-400 transition">FAQs</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-purple-400 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link href="/shipping" className="text-gray-400 hover:text-purple-400 transition">Shipping Info</Link></li>
              <li><Link href="/returns" className="text-gray-400 hover:text-purple-400 transition">Returns</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-purple-400 transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-purple-400 transition">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              <a href="https://facebook.com/moskethperfumes" target="_blank" rel="noopener noreferrer" 
                 className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition">
                <FaFacebook size={20} />
              </a>
              <a href="https://instagram.com/moskethperfumes" target="_blank" rel="noopener noreferrer"
                 className="bg-gray-800 p-2 rounded-full hover:bg-pink-600 transition">
                <FaInstagram size={20} />
              </a>
              <a href="https://twitter.com/moskethperfumes" target="_blank" rel="noopener noreferrer"
                 className="bg-gray-800 p-2 rounded-full hover:bg-blue-400 transition">
                <FaTwitter size={20} />
              </a>
              <a href="https://wa.me/254742783907" target="_blank" rel="noopener noreferrer"
                 className="bg-gray-800 p-2 rounded-full hover:bg-green-500 transition">
                <FaWhatsapp size={20} />
              </a>
              <a href="https://tiktok.com/@moskethperfumes" target="_blank" rel="noopener noreferrer"
                 className="bg-gray-800 p-2 rounded-full hover:bg-black transition">
                <FaTiktok size={20} />
              </a>
              <a href="https://t.me/moskethperfumes" target="_blank" rel="noopener noreferrer"
                 className="bg-gray-800 p-2 rounded-full hover:bg-blue-500 transition">
                <FaTelegram size={20} />
              </a>
            </div>
            <p className="text-gray-400">
              <span className="block mb-2">📞 Phone/WhatsApp: 0742783907</span>
              <span className="block">📧 Email: info@moskethperfumes.co.ke</span>
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Mosketh Perfumes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
'use client';

import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaTiktok, FaTelegram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                MosKeth
              </span>
              <span className="block text-sm text-gray-400">BEAUTY&PERFUMES</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your premier destination for authentic luxury perfumes and beauty products in Kenya.
            </p>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-purple-400" />
                Shop F5, Superior Centre, Kimathi Street, Nairobi CBD
              </p>
              <p className="flex items-center gap-2">
                <FaPhone className="text-purple-400" />
                <a href="tel:0742783907" className="hover:text-purple-400">0742783907</a>
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-purple-400" />
                <a href="mailto:moskethbeautytouch@gmail.com" className="hover:text-purple-400">
                  moskethbeautytouch@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <FaClock className="text-purple-400" />
                24 Hours Everyday
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-purple-400 transition">About Us</Link></li>
              <li><Link href="/products" className="text-gray-400 hover:text-purple-400 transition">Products</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-purple-400 transition">Contact</Link></li>
              <li><Link href="/faqs" className="text-gray-400 hover:text-purple-400 transition">FAQs</Link></li>
              <li><Link href="/shipping" className="text-gray-400 hover:text-purple-400 transition">Shipping Info</Link></li>
              <li><Link href="/returns" className="text-gray-400 hover:text-purple-400 transition">Returns</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Shop by Category</h4>
            <ul className="space-y-2">
              <li><Link href="/category/mens-perfumes" className="text-gray-400 hover:text-purple-400 transition">Men's Perfumes</Link></li>
              <li><Link href="/category/womens-perfumes" className="text-gray-400 hover:text-purple-400 transition">Women's Perfumes</Link></li>
              <li><Link href="/category/unisex-perfumes" className="text-gray-400 hover:text-purple-400 transition">Unisex Perfumes</Link></li>
              <li><Link href="/category/body-oils" className="text-gray-400 hover:text-purple-400 transition">Body Oils</Link></li>
              <li><Link href="/category/face-creams" className="text-gray-400 hover:text-purple-400 transition">Face Creams</Link></li>
              <li><Link href="/category/hair-products" className="text-gray-400 hover:text-purple-400 transition">Hair Products</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex flex-wrap gap-3 mb-4">
              <a href="https://facebook.com/MosKethOketch" target="_blank" rel="noopener noreferrer" 
                 className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition transform hover:scale-110">
                <FaFacebook size={20} />
              </a>
              <a href="https://instagram.com/mosketh_beauty_touch" target="_blank" rel="noopener noreferrer"
                 className="bg-gray-800 p-3 rounded-full hover:bg-pink-600 transition transform hover:scale-110">
                <FaInstagram size={20} />
              </a>
              <a href="https://twitter.com/MoskethBeauty" target="_blank" rel="noopener noreferrer"
                 className="bg-gray-800 p-3 rounded-full hover:bg-blue-400 transition transform hover:scale-110">
                <FaTwitter size={20} />
              </a>
              <a href="https://wa.me/254742783907" target="_blank" rel="noopener noreferrer"
                 className="bg-gray-800 p-3 rounded-full hover:bg-green-500 transition transform hover:scale-110">
                <FaWhatsapp size={20} />
              </a>
              <a href="https://tiktok.com/@MoskethBeautyTouch" target="_blank" rel="noopener noreferrer"
                 className="bg-gray-800 p-3 rounded-full hover:bg-black transition transform hover:scale-110">
                <FaTiktok size={20} />
              </a>
              <a href="https://t.me/moskethbeauty" target="_blank" rel="noopener noreferrer"
                 className="bg-gray-800 p-3 rounded-full hover:bg-blue-500 transition transform hover:scale-110">
                <FaTelegram size={20} />
              </a>
              <a href="https://youtube.com/@MoskethBeautyTouch" target="_blank" rel="noopener noreferrer"
                 className="bg-gray-800 p-3 rounded-full hover:bg-red-600 transition transform hover:scale-110">
                <FaYoutube size={20} />
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              Follow us for latest updates, promotions, and fragrance tips!
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Mosketh Perfumes & Beauty. All rights reserved.</p>
          <p className="text-sm mt-2">Opening Hours: 24 Hours Everyday</p>
        </div>
      </div>
    </footer>
  );
}
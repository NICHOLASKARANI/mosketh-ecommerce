'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaShoppingCart, FaHeart, FaUser, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { cartDB } from '@/lib/cartDB';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    setCartCount(cartDB.getTotalItems());
    
    const handleCartUpdate = () => {
      setCartCount(cartDB.getTotalItems());
    };
    
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            {!logoError ? (
              <Image 
                src="/logo.png"
                alt="Mosketh Perfumes & Beauty"
                width={50}
                height={50}
                className="object-contain rounded-full"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="w-[50px] h-[50px] bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                M
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                MosKeth
              </span>
              <span className="text-xs text-gray-600 font-light">BEAUTY&PERFUMES</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-purple-600 transition font-medium">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-purple-600 transition font-medium">
              Products
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-purple-600 transition font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-purple-600 transition font-medium">
              Contact
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-600 hover:text-purple-600 transition"
            >
              <FaSearch size={20} />
            </button>

            <Link href="/cart" className="text-gray-600 hover:text-purple-600 transition relative">
              <FaShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link href="/manage" className="text-gray-600 hover:text-purple-600 transition">
              <FaUser size={20} />
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-600 hover:text-purple-600 transition"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4 border-t">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for perfumes, body oils, face creams..."
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <button type="submit" className="absolute right-3 top-3 text-purple-600">
                <FaSearch size={20} />
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-purple-600 transition px-2 py-1">
                Home
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-purple-600 transition px-2 py-1">
                Products
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-purple-600 transition px-2 py-1">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-purple-600 transition px-2 py-1">
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

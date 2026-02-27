'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { useState } from 'react'

export default function Navbar() {
  const { totalItems } = useCart()
  const { items: wishlistItems } = useWishlist()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              Mosketh
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/perfumes" className="text-gray-600 hover:text-gray-900">
              Perfumes
            </Link>
            <Link href="/products" className="text-gray-600 hover:text-gray-900">
              All Products
            </Link>
            <Link href="/wishlist" className="text-gray-600 hover:text-gray-900 relative">
              Wishlist
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <Link href="/cart" className="text-gray-600 hover:text-gray-900 relative">
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '../store/authStore'
import { FaShoppingCart, FaUser } from 'react-icons/fa'

export default function Header() {
  const { itemCount } = useCartStore()
  const { user, logout } = useAuthStore()

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="MosKeth" width={40} height={40} />
          <span className="text-xl font-bold text-primary-600">MosKeth</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/products" className="hover:text-primary-600">Shop</Link>
          <a href="https://wa.me/254742783907" target="_blank" rel="noopener" className="hover:text-primary-600">
            WhatsApp
          </a>
          {user?.role === 'ADMIN' && (
            <Link href="/admin" className="hover:text-primary-600">Admin</Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative">
            <FaShoppingCart className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          {user ? (
            <button onClick={logout} className="text-sm">
              Logout
            </button>
          ) : (
            <Link href="/login">
              <FaUser className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
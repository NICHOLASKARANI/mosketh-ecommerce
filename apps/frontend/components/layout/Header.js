'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaWhatsapp, FaHeart } from 'react-icons/fa'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { itemCount } = useCartStore()
  const { user, isAuthenticated, logout } = useAuthStore()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (pathname?.startsWith('/admin')) return null

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/products' },
    { name: "Men's", href: '/perfumes/men' },
    { name: "Women's", href: '/perfumes/women' },
    { name: 'Body Oils', href: '/body-oils' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="MosKeth" width={40} height={40} />
            <span className="text-xl font-bold text-primary-600">MosKeth</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`hover:text-primary-600 ${
                  pathname === item.href ? 'text-primary-600 font-semibold' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a href="https://wa.me/254742783907" target="_blank" rel="noopener" className="text-green-600">
              <FaWhatsapp className="w-5 h-5" />
            </a>
            <Link href="/wishlist" className="text-gray-700">
              <FaHeart className="w-5 h-5" />
            </Link>
            <Link href="/cart" className="relative">
              <FaShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <button onClick={logout} className="text-sm">Logout</button>
            ) : (
              <Link href="/login"><FaUser /></Link>
            )}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="block py-2">
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
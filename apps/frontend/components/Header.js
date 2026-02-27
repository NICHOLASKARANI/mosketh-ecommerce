'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaWhatsapp, FaChevronDown, FaHeart } from 'react-icons/fa'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false)
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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Don't show header on admin pages
  if (pathname?.startsWith('/admin')) {
    return null
  }

  const mainNavigation = [
    { name: 'Home', href: '/' },
    { 
      name: 'Shop', 
      href: '/products',
      dropdown: [
        { name: "Men's Perfumes", href: '/perfumes/men', icon: '👔' },
        { name: "Women's Perfumes", href: '/perfumes/women', icon: '👗' },
        { name: 'Unisex Perfumes', href: '/perfumes/unisex', icon: '👥' },
        { name: 'Body Oils', href: '/body-oils', icon: '💧' },
        { name: 'Face Creams', href: '/face-creams', icon: '🧴' },
        { name: 'Hair Products', href: '/hair-products', icon: '💇' },
      ]
    },
    { name: 'Men', href: '/perfumes/men' },
    { name: 'Women', href: '/perfumes/women' },
    { name: 'Body Oils', href: '/body-oils' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-12 h-12 transform group-hover:scale-105 transition-transform">
              <Image
                src="/images/logo.png"
                alt="MosKeth Beauty & Perfumes"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary-600 font-display leading-tight">
                MosKeth
              </span>
              <span className="text-xs text-gray-500 -mt-1">Beauty & Perfumes</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {mainNavigation.map((item) => {
              if (item.dropdown) {
                return (
                  <div
                    key={item.name}
                    className="relative group"
                    onMouseEnter={() => setIsShopDropdownOpen(true)}
                    onMouseLeave={() => setIsShopDropdownOpen(false)}
                  >
                    <button className="flex items-center gap-1 text-gray-700 hover:text-primary-600 transition-colors py-2">
                      {item.name}
                      <FaChevronDown className={`w-3 h-3 transition-transform duration-200 ${isShopDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {isShopDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                        <div className="py-2">
                          {item.dropdown.map((subItem, index) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                            >
                              <span className="text-xl">{subItem.icon}</span>
                              <span className="text-sm font-medium">{subItem.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              }
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-gray-700 hover:text-primary-600 transition-colors ${
                    pathname === item.href ? 'text-primary-600 font-semibold' : ''
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            {/* WhatsApp - Always visible */}
            <a
              href="https://wa.me/254742783907"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700 transition-colors p-2 hover:bg-green-50 rounded-full"
              title="Chat on WhatsApp"
            >
              <FaWhatsapp className="w-5 h-5" />
            </a>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="text-gray-700 hover:text-primary-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
              title="Wishlist"
            >
              <FaHeart className="w-5 h-5" />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative text-gray-700 hover:text-primary-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
              title="Shopping Cart"
            >
              <FaShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors p-2 hover:bg-gray-100 rounded-full">
                  <FaUser className="w-5 h-5" />
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {user?.role === 'ADMIN' && (
                    <>
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                      >
                        Admin Dashboard
                      </Link>
                      <div className="border-t border-gray-100 my-1"></div>
                    </>
                  )}
                  <Link
                    href="/account"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                  >
                    My Account
                  </Link>
                  <Link
                    href="/orders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                  >
                    My Orders
                  </Link>
                  <Link
                    href="/wishlist"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                  >
                    Wishlist
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-gray-700 hover:text-primary-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                title="Login"
              >
                <FaUser className="w-5 h-5" />
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-gray-700 hover:text-primary-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute left-0 right-0 top-full bg-white border-t border-gray-200 shadow-lg max-h-[80vh] overflow-y-auto">
            <div className="container mx-auto px-4 py-4">
              <nav className="space-y-2">
                {mainNavigation.map((item) => {
                  if (item.dropdown) {
                    return (
                      <div key={item.name} className="py-2">
                        <div className="font-semibold text-gray-900 mb-2 px-2">{item.name}</div>
                        <div className="ml-4 space-y-2">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="flex items-center gap-3 px-2 py-2 text-gray-600 hover:text-primary-600 rounded-lg hover:bg-gray-50"
                            >
                              <span className="text-lg">{subItem.icon}</span>
                              <span>{subItem.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )
                  }
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-2 py-3 rounded-lg ${
                        pathname === item.href
                          ? 'text-primary-600 font-semibold bg-primary-50'
                          : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )
                })}

                {/* Mobile User Menu */}
                {isAuthenticated && (
                  <div className="border-t border-gray-200 mt-4 pt-4">
                    <div className="px-2 py-2 text-sm text-gray-500">
                      Logged in as {user?.firstName} {user?.lastName}
                    </div>
                    {user?.role === 'ADMIN' && (
                      <Link
                        href="/admin"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-2 py-3 text-primary-600 font-semibold hover:bg-primary-50 rounded-lg"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <Link
                      href="/account"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-2 py-3 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg"
                    >
                      My Account
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        setIsMenuOpen(false)
                      }}
                      className="block w-full text-left px-2 py-3 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
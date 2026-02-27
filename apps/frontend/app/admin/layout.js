'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/store/authStore'
import { FaTachometerAlt, FaBox, FaShoppingCart, FaUsers, FaSignOutAlt } from 'react-icons/fa'

export default function AdminLayout({ children }) {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuthStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check authentication status
    if (!isAuthenticated || user?.role !== 'ADMIN') {
      router.push('/login')
    } else {
      setIsLoading(false)
    }
  }, [isAuthenticated, user, router])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
      </div>
    )
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: FaTachometerAlt },
    { name: 'Products', href: '/admin/products', icon: FaBox },
    { name: 'Orders', href: '/admin/orders', icon: FaShoppingCart },
    { name: 'Customers', href: '/admin/customers', icon: FaUsers },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header - Only visible to admins */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <span className="text-xl font-bold text-primary-600">MosKeth Admin</span>
              <nav className="hidden md:flex items-center gap-6">
                {navItems.map(item => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {user?.firstName} {user?.lastName}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
              >
                <FaSignOutAlt className="w-4 h-4" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
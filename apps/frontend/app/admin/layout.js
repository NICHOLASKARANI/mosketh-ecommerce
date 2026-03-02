'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/store/authStore'
import { FaTachometerAlt, FaBox, FaShoppingCart, FaUsers, FaSignOutAlt } from 'react-icons/fa'

export default function AdminLayout({ children }) {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuthStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check authentication and admin role
    const checkAuth = async () => {
      if (!isAuthenticated) {
        router.push('/login')
        return
      }
      
      // Check if user is admin
      if (user?.role !== 'admin') {
        router.push('/')
        return
      }
      
      setIsLoading(false)
    }
    
    checkAuth()
  }, [isAuthenticated, router, user])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-purple-800 text-white">
        <div className="p-6">
          <h2 className="text-2xl font-bold">Mosketh Admin</h2>
        </div>
        <nav className="mt-6">
          <Link href="/admin" className="flex items-center px-6 py-3 hover:bg-purple-700 transition">
            <FaTachometerAlt className="mr-3" /> Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center px-6 py-3 hover:bg-purple-700 transition">
            <FaBox className="mr-3" /> Products
          </Link>
          <Link href="/admin/orders" className="flex items-center px-6 py-3 hover:bg-purple-700 transition">
            <FaShoppingCart className="mr-3" /> Orders
          </Link>
          <Link href="/admin/customers" className="flex items-center px-6 py-3 hover:bg-purple-700 transition">
            <FaUsers className="mr-3" /> Customers
          </Link>
          <button 
            onClick={logout}
            className="w-full flex items-center px-6 py-3 hover:bg-purple-700 transition mt-auto absolute bottom-0 left-0"
          >
            <FaSignOutAlt className="mr-3" /> Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {children}
      </div>
    </div>
  )
}

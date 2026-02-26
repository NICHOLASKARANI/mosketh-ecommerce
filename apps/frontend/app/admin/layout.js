'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '../../store/authStore'  // ← Changed
import { api } from '../../lib/api'  // ← Changed
import { FaTachometerAlt, FaBox, FaShoppingCart, FaUsers } from 'react-icons/fa'

export default function AdminLayout({ children }) {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'ADMIN') {
      router.push('/login')
    }
  }, [isAuthenticated, user, router])

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: FaTachometerAlt },
    { name: 'Products', href: '/admin/products', icon: FaBox },
    { name: 'Orders', href: '/admin/orders', icon: FaShoppingCart },
    { name: 'Customers', href: '/admin/customers', icon: FaUsers },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 h-16">
            <span className="font-bold text-primary-600">MosKeth Admin</span>
            {navItems.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 text-gray-600 hover:text-primary-600"
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-8">{children}</div>
    </div>
  )
}
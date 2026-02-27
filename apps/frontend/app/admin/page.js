'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { api } from '@/lib/api'
import { FaBox, FaShoppingCart, FaUsers, FaMoneyBill } from 'react-icons/fa'

export default function AdminDashboard() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Double-check authentication
    if (!isAuthenticated || user?.role !== 'ADMIN') {
      router.push('/login')
      return
    }

    fetchStats()
  }, [isAuthenticated, user, router])

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/dashboard')
      setStats(response.data.data)
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
      </div>
    )
  }

  const cards = [
    { title: 'Total Orders', value: stats?.totalOrders || 0, icon: FaShoppingCart, color: 'bg-blue-500' },
    { title: 'Total Products', value: stats?.totalProducts || 0, icon: FaBox, color: 'bg-green-500' },
    { title: 'Total Customers', value: stats?.totalCustomers || 0, icon: FaUsers, color: 'bg-purple-500' },
    { title: 'Revenue', value: `KSh ${stats?.totalRevenue?.toLocaleString() || 0}`, icon: FaMoneyBill, color: 'bg-orange-500' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.title} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className={`${card.color} p-3 rounded-lg`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">{card.title}</p>
                <p className="text-2xl font-bold">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
// apps/frontend/app/admin/page.tsx
'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import DashboardStats from '@/components/admin/DashboardStats'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    totalProducts: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats')
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <DashboardStats stats={stats} isLoading={isLoading} />
    </AdminLayout>
  )
}
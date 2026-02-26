'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '../../store/authStore'  // ← Changed
import { api } from '../../lib/api'  // ← Changed

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0
  })

  useEffect(() => {
    api.get('/admin/dashboard')
      .then(res => setStats(res.data.data))
      .catch(err => console.error(err))
  }, [])

  const cards = [
    { title: 'Total Orders', value: stats.totalOrders, color: 'bg-blue-500' },
    { title: 'Total Products', value: stats.totalProducts, color: 'bg-green-500' },
    { title: 'Total Customers', value: stats.totalCustomers, color: 'bg-purple-500' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-500 mb-2">{card.title}</h3>
            <p className="text-3xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
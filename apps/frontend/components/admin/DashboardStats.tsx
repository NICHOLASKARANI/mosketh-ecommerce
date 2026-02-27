interface DashboardStatsProps {
  stats: {
    totalOrders: number
    totalRevenue: number
    totalCustomers: number
    totalProducts: number
  }
  isLoading: boolean
}

export default function DashboardStats({ stats, isLoading }: DashboardStatsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1,2,3,4].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    )
  }

  const statItems = [
    { name: 'Total Orders', value: stats.totalOrders },
    { name: 'Total Revenue', value: `$${stats.totalRevenue.toFixed(2)}` },
    { name: 'Total Customers', value: stats.totalCustomers },
    { name: 'Total Products', value: stats.totalProducts },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item) => (
        <div key={item.name} className="bg-white rounded-lg shadow p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">{item.value}</dd>
        </div>
      ))}
    </div>
  )
}

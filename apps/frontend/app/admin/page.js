import React from 'react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  // You can fetch admin stats here if needed
  let stats = {
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    revenue: 0
  };

  try {
    // Example of fetching admin stats - adjust based on your API
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mosketh-backend.vercel.app';
    const res = await fetch(`${API_URL}/api/admin/stats`, {
      cache: 'no-store'
    });
    if (res.ok) {
      const data = await res.json();
      stats = data.data || stats;
    }
  } catch (error) {
    console.error('Error fetching admin stats:', error.message);
  }

  return (
    <div className="admin-dashboard" style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Admin Dashboard</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{ background: '#f0f9ff', padding: '20px', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#0369a1' }}>Total Orders</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.totalOrders}</p>
        </div>
        
        <div style={{ background: '#f0fdf4', padding: '20px', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#166534' }}>Total Products</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.totalProducts}</p>
        </div>
        
        <div style={{ background: '#fef2f2', padding: '20px', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#991b1b' }}>Total Customers</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.totalCustomers}</p>
        </div>
        
        <div style={{ background: '#faf5ff', padding: '20px', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#6b21a8' }}>Revenue (KES)</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.revenue.toLocaleString()}</p>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px' 
      }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '15px' }}>Quick Actions</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '10px' }}>
              <a href="/admin/products/new" style={{ color: '#2563eb', textDecoration: 'none' }}>
                ➕ Add New Product
              </a>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <a href="/admin/orders" style={{ color: '#2563eb', textDecoration: 'none' }}>
                📦 View Orders
              </a>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <a href="/admin/products" style={{ color: '#2563eb', textDecoration: 'none' }}>
                📋 Manage Products
              </a>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <a href="/admin/customers" style={{ color: '#2563eb', textDecoration: 'none' }}>
                👥 Manage Customers
              </a>
            </li>
          </ul>
        </div>

        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '15px' }}>Recent Activity</h2>
          <p style={{ color: '#666' }}>No recent activity to display</p>
        </div>
      </div>
    </div>
  );
}
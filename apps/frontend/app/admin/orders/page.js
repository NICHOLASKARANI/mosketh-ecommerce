import React from 'react';

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage() {
  let orders = [];

  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mosketh-backend.vercel.app';
    const res = await fetch(`${API_URL}/api/admin/orders`, {
      cache: 'no-store'
    });
    if (res.ok) {
      const data = await res.json();
      orders = data.data || [];
    }
  } catch (error) {
    console.error('Error fetching orders:', error.message);
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Orders Management</h1>
      
      {orders.length === 0 ? (
        <p style={{ color: '#666' }}>No orders found</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f3f4f6' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Order ID</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Customer</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Date</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Total</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}>#{order.id}</td>
                <td style={{ padding: '12px' }}>{order.customerName}</td>
                <td style={{ padding: '12px' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: '12px' }}>KES {order.total}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '4px',
                    background: order.status === 'completed' ? '#d1fae5' : 
                               order.status === 'pending' ? '#fef3c7' : '#fee2e2',
                    color: order.status === 'completed' ? '#065f46' : 
                           order.status === 'pending' ? '#92400e' : '#991b1b'
                  }}>
                    {order.status}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <button style={{ 
                    padding: '6px 12px', 
                    background: '#3b82f6', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
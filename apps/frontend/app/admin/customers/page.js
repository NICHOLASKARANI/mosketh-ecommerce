import React from 'react';

export const dynamic = 'force-dynamic';

export default async function AdminCustomersPage() {
  let customers = [];

  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mosketh-backend.vercel.app';
    const res = await fetch(`${API_URL}/api/admin/customers`, {
      cache: 'no-store'
    });
    if (res.ok) {
      const data = await res.json();
      customers = data.data || [];
    }
  } catch (error) {
    console.error('Error fetching customers:', error.message);
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Customers Management</h1>
      
      {customers.length === 0 ? (
        <p style={{ color: '#666' }}>No customers found</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f3f4f6' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Customer ID</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Phone</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Orders</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Joined</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}>#{customer.id}</td>
                <td style={{ padding: '12px' }}>{customer.name}</td>
                <td style={{ padding: '12px' }}>{customer.email}</td>
                <td style={{ padding: '12px' }}>{customer.phone || 'N/A'}</td>
                <td style={{ padding: '12px' }}>{customer.orderCount || 0}</td>
                <td style={{ padding: '12px' }}>{new Date(customer.createdAt).toLocaleDateString()}</td>
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
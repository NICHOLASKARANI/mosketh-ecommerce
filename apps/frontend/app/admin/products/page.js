import React from 'react';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  let products = [];

  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mosketh-backend.vercel.app';
    const res = await fetch(`${API_URL}/api/products`, {
      cache: 'no-store'
    });
    if (res.ok) {
      const data = await res.json();
      products = data.data || [];
    }
  } catch (error) {
    console.error('Error fetching products:', error.message);
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '2rem' }}>Products Management</h1>
        <a 
          href="/admin/products/new" 
          style={{ 
            padding: '10px 20px', 
            background: '#10b981', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '6px' 
          }}
        >
          + Add New Product
        </a>
      </div>
      
      {products.length === 0 ? (
        <p style={{ color: '#666' }}>No products found</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f3f4f6' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Image</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>SKU</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Price (KES)</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Stock</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}>
                  {product.images && product.images[0] && (
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                  )}
                </td>
                <td style={{ padding: '12px' }}>{product.name}</td>
                <td style={{ padding: '12px' }}>{product.sku}</td>
                <td style={{ padding: '12px' }}>KES {product.priceKES}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ 
                    color: product.stock < (product.lowStockAlert || 5) ? '#dc2626' : '#059669',
                    fontWeight: 'bold'
                  }}>
                    {product.stock}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '4px',
                    background: product.isActive ? '#d1fae5' : '#fee2e2',
                    color: product.isActive ? '#065f46' : '#991b1b'
                  }}>
                    {product.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <button style={{ 
                    padding: '6px 12px', 
                    background: '#3b82f6', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px',
                    marginRight: '8px',
                    cursor: 'pointer'
                  }}>
                    Edit
                  </button>
                  <button style={{ 
                    padding: '6px 12px', 
                    background: '#ef4444', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}>
                    Delete
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
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DiagnosticPage() {
  const [storageData, setStorageData] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkStorage();
  }, []);

  const checkStorage = () => {
    setLoading(true);
    const data = {};
    
    // Check all possible storage keys
    const keys = [
      'mosketh_products',
      'mosketh_products_v2',
      'cart',
      'adminAuth'
    ];

    keys.forEach(key => {
      try {
        const value = localStorage.getItem(key);
        data[key] = value ? JSON.parse(value) : null;
      } catch (e) {
        data[key] = localStorage.getItem(key);
      }
    });

    setStorageData(data);
    setProducts(data.mosketh_products || data.mosketh_products_v2 || []);
    setLoading(false);
  };

  const addTestProduct = () => {
    const testProduct = {
      id: Date.now().toString(),
      name: 'Test Product ' + new Date().toLocaleTimeString(),
      priceKES: 2500,
      category: 'mens-perfumes',
      description: 'This is a test product',
      shortDescription: 'Test product',
      stock: 10,
      images: ['https://via.placeholder.com/400?text=Test'],
      featured: true,
      slug: 'test-product-' + Date.now(),
      createdAt: new Date().toISOString()
    };

    // Get existing products
    const existing = JSON.parse(localStorage.getItem('mosketh_products') || '[]');
    existing.push(testProduct);
    
    // Save to both keys
    localStorage.setItem('mosketh_products', JSON.stringify(existing));
    localStorage.setItem('mosketh_products_v2', JSON.stringify(existing));
    
    checkStorage();
    alert('Test product added! Check the table below.');
  };

  const clearAll = () => {
    if (confirm('Clear all products?')) {
      localStorage.removeItem('mosketh_products');
      localStorage.removeItem('mosketh_products_v2');
      checkStorage();
    }
  };

  const fixStorage = () => {
    // Try to recover products from any source
    const products = storageData.mosketh_products || storageData.mosketh_products_v2 || [];
    
    if (products.length > 0) {
      // Ensure they're saved in both places
      localStorage.setItem('mosketh_products', JSON.stringify(products));
      localStorage.setItem('mosketh_products_v2', JSON.stringify(products));
      alert(`Fixed! ${products.length} products are now properly stored.`);
    } else {
      alert('No products found to fix.');
    }
    checkStorage();
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#7c3aed' }}>🔧 Mosketh Diagnostic Tool</h1>
      
      <div style={{ marginBottom: '30px', padding: '20px', background: '#f3f4f6', borderRadius: '10px' }}>
        <h2>Storage Status</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#e5e7eb' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Storage Key</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Content</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(storageData).map(([key, value]) => (
              <tr key={key} style={{ borderBottom: '1px solid #d1d5db' }}>
                <td style={{ padding: '10px', fontWeight: 'bold' }}>{key}</td>
                <td style={{ padding: '10px' }}>
                  {value ? (
                    <span style={{ color: 'green', fontWeight: 'bold' }}>✅ Has Data</span>
                  ) : (
                    <span style={{ color: 'gray' }}>⭕ Empty</span>
                  )}
                </td>
                <td style={{ padding: '10px' }}>
                  {value ? (
                    Array.isArray(value) ? (
                      <span>{value.length} items</span>
                    ) : (
                      <span>{JSON.stringify(value).substring(0, 50)}...</span>
                    )
                  ) : 'null'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginBottom: '30px', padding: '20px', background: '#f3f4f6', borderRadius: '10px' }}>
        <h2>Products in Storage ({products.length})</h2>
        
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <button 
            onClick={addTestProduct}
            style={{ padding: '10px 20px', background: '#10b981', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            ➕ Add Test Product
          </button>
          <button 
            onClick={fixStorage}
            style={{ padding: '10px 20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            🔧 Fix Storage
          </button>
          <button 
            onClick={clearAll}
            style={{ padding: '10px 20px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            🗑️ Clear All
          </button>
          <button 
            onClick={checkStorage}
            style={{ padding: '10px 20px', background: '#6b7280', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            🔄 Refresh
          </button>
        </div>

        {products.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '40px', background: 'white', borderRadius: '5px' }}>
            No products found. Click "Add Test Product" to create one.
          </p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
              <thead>
                <tr style={{ background: '#e5e7eb' }}>
                  <th style={{ padding: '10px', textAlign: 'left' }}>ID</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Price</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Category</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Stock</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Featured</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #d1d5db' }}>
                    <td style={{ padding: '10px' }}>{p.id.substring(0, 8)}...</td>
                    <td style={{ padding: '10px' }}>{p.name}</td>
                    <td style={{ padding: '10px' }}>KES {p.priceKES}</td>
                    <td style={{ padding: '10px' }}>{p.category}</td>
                    <td style={{ padding: '10px' }}>{p.stock}</td>
                    <td style={{ padding: '10px' }}>{p.featured ? '✅' : '❌'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div style={{ padding: '20px', background: '#f3f4f6', borderRadius: '10px' }}>
        <h2>Quick Links</h2>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: '#7c3aed', textDecoration: 'none' }}>🏠 Homepage</Link>
          <Link href="/manage" style={{ color: '#7c3aed', textDecoration: 'none' }}>⚙️ Admin Panel</Link>
          <Link href="/products" style={{ color: '#7c3aed', textDecoration: 'none' }}>📦 Products Page</Link>
          <Link href="/diagnostic" style={{ color: '#7c3aed', textDecoration: 'none' }}>🔬 Diagnostic</Link>
        </div>
      </div>
    </div>
  );
}

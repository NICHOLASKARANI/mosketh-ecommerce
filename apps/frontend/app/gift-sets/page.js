import React from 'react';

export const dynamic = 'force-dynamic';

export default async function GiftSetsPage() {
  let products = [];

  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mosketh-backend.vercel.app';
    const res = await fetch(`${API_URL}/api/products?category=gift-sets`, {
      cache: 'no-store'
    });
    if (res.ok) {
      const data = await res.json();
      products = data.data || [];
    }
  } catch (error) {
    console.error('Error fetching gift sets:', error.message);
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Gift Sets</h1>
      <p style={{ fontSize: '1.1rem', marginBottom: '30px', color: '#666' }}>
        Perfect gifts for your loved ones
      </p>

      {products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ fontSize: '1.2rem', color: '#666' }}>No gift sets available at the moment.</p>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '30px' 
        }}>
          {products.map((product) => (
            <div key={product.id} style={{ 
              border: '1px solid #eaeaea', 
              borderRadius: '8px', 
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              {product.images && product.images[0] && (
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  style={{ 
                    width: '100%', 
                    height: '250px', 
                    objectFit: 'cover' 
                  }}
                />
              )}
              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>{product.name}</h3>
                <p style={{ color: '#666', marginBottom: '15px' }}>
                  {product.shortDescription?.substring(0, 120)}...
                </p>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center' 
                }}>
                  <span style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold', 
                    color: '#10b981' 
                  }}>
                    KES {product.priceKES}
                  </span>
                  <button style={{ 
                    padding: '10px 20px',
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
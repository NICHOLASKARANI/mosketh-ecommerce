import React from 'react';

export const dynamic = 'force-dynamic';

export default async function BodyMistsPage() {
  let products = [];

  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mosketh-backend.vercel.app';
    const res = await fetch(`${API_URL}/api/products?category=body-mists`, {
      cache: 'no-store'
    });
    if (res.ok) {
      const data = await res.json();
      products = data.data || [];
    }
  } catch (error) {
    console.error('Error fetching body mists:', error.message);
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Body Mists</h1>
      <p style={{ fontSize: '1.1rem', marginBottom: '30px', color: '#666' }}>
        Discover our collection of refreshing body mists
      </p>

      {products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ fontSize: '1.2rem', color: '#666' }}>No body mists available at the moment.</p>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '20px' 
        }}>
          {products.map((product) => (
            <div key={product.id} style={{ 
              border: '1px solid #eaeaea', 
              borderRadius: '8px', 
              padding: '15px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              {product.images && product.images[0] && (
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover', 
                    borderRadius: '4px',
                    marginBottom: '10px' 
                  }}
                />
              )}
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{product.name}</h3>
              <p style={{ color: '#666', marginBottom: '8px', fontSize: '0.9rem' }}>
                {product.shortDescription?.substring(0, 100)}...
              </p>
              <p style={{ 
                fontSize: '1.3rem', 
                fontWeight: 'bold', 
                color: '#10b981',
                marginBottom: '10px' 
              }}>
                KES {product.priceKES}
              </p>
              <button style={{ 
                width: '100%',
                padding: '10px',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
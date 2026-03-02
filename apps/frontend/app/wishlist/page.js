import React from 'react';

export const dynamic = 'force-dynamic';

export default function WishlistPage() {
  // This would typically be connected to a wishlist context/state
  // For now, it's a static wishlist page
  
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>My Wishlist</h1>
      
      <div style={{ 
        background: 'white', 
        border: '1px solid #eaeaea', 
        borderRadius: '8px',
        padding: '40px',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
          Your wishlist is empty
        </p>
        <a 
          href="/"
          style={{ 
            display: 'inline-block',
            padding: '12px 24px',
            background: '#2563eb',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px'
          }}
        >
          Continue Shopping
        </a>
      </div>
    </div>
  );
}
import React from 'react';

export const dynamic = 'force-dynamic';

export default function CartPage() {
  // This would typically be connected to a cart context/state
  // For now, it's a static cart page
  
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>Shopping Cart</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '2fr 1fr', 
        gap: '30px'
      }}>
        <div>
          <div style={{ 
            background: 'white', 
            border: '1px solid #eaeaea', 
            borderRadius: '8px',
            padding: '20px'
          }}>
            <p style={{ textAlign: 'center', color: '#666' }}>
              Your cart is empty. Start shopping to add items!
            </p>
          </div>
        </div>
        
        <div>
          <div style={{ 
            background: '#f9fafb', 
            border: '1px solid #eaeaea', 
            borderRadius: '8px',
            padding: '20px'
          }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>Order Summary</h2>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>Subtotal</span>
              <span>KES 0</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>Shipping</span>
              <span>KES 0</span>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginTop: '20px',
              paddingTop: '20px',
              borderTop: '1px solid #eaeaea',
              fontWeight: 'bold',
              fontSize: '1.2rem'
            }}>
              <span>Total</span>
              <span>KES 0</span>
            </div>
            
            <button 
              disabled
              style={{ 
                width: '100%',
                padding: '15px',
                marginTop: '20px',
                background: '#9ca3af',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1.1rem',
                cursor: 'not-allowed'
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
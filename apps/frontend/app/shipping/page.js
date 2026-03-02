import React from 'react';

export const dynamic = 'force-dynamic';

export default function ShippingPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>Shipping Information</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Delivery Options</h2>
        
        <div style={{ 
          border: '1px solid #eaeaea', 
          borderRadius: '8px', 
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Standard Delivery</h3>
          <p>Delivery within 1-3 business days nationwide</p>
          <p style={{ fontWeight: 'bold' }}>Cost: KES 200 - KES 500 depending on location</p>
        </div>

        <div style={{ 
          border: '1px solid #eaeaea', 
          borderRadius: '8px', 
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Express Delivery</h3>
          <p>Delivery within 24 hours in Nairobi area</p>
          <p style={{ fontWeight: 'bold' }}>Cost: KES 800</p>
        </div>

        <div style={{ 
          border: '1px solid #eaeaea', 
          borderRadius: '8px', 
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Store Pickup</h3>
          <p>Pick up from our Nairobi CBD store for free</p>
          <p>Shop F5, Superior Centre, Kimathi Street</p>
          <p style={{ fontWeight: 'bold' }}>Cost: Free</p>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Order Processing</h2>
        <p style={{ lineHeight: '1.6' }}>
          Orders are processed within 24 hours of payment confirmation. You will receive a confirmation email 
          with tracking information once your order is dispatched.
        </p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Delivery Areas</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '10px' }}>
          We deliver to all major towns and cities across Kenya including:
        </p>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
          gap: '10px' 
        }}>
          {['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Machakos', 'Kiambu', 'Nyeri', 'Meru'].map(city => (
            <span key={city} style={{ 
              padding: '5px 10px', 
              background: '#f3f4f6', 
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              {city}
            </span>
          ))}
        </div>
      </div>

      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        background: '#f9fafb', 
        borderRadius: '8px',
        borderLeft: '4px solid #10b981'
      }}>
        <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>
          <strong>Note:</strong> Free delivery on orders over KES 5,000 within Nairobi. 
          For orders outside Nairobi, free delivery applies on orders over KES 8,000.
        </p>
      </div>
    </div>
  );
}
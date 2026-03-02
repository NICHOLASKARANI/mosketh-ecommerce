import React from 'react';

export const dynamic = 'force-dynamic';

export default function ReturnsPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>Returns & Refunds Policy</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Return Policy</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '10px' }}>
          We accept returns within 7 days of delivery under the following conditions:
        </p>
        <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
          <li>Item must be unopened and unused</li>
          <li>Original packaging must be intact</li>
          <li>Proof of purchase is required</li>
        </ul>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Refund Process</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '10px' }}>
          Once we receive and inspect your returned item, we will notify you of the approval or rejection of your refund. 
          If approved, your refund will be processed within 3-5 business days to your original payment method.
        </p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Non-Returnable Items</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '10px' }}>
          The following items cannot be returned:
        </p>
        <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
          <li>Opened or used products</li>
          <li>Items without original packaging</li>
          <li>Sale or clearance items</li>
          <li>Gift cards</li>
        </ul>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>How to Initiate a Return</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '10px' }}>
          To initiate a return, please:
        </p>
        <ol style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
          <li>Contact us at 0742783907 or info@moskethperfumes.co.ke</li>
          <li>Provide your order number and reason for return</li>
          <li>Wait for return authorization and instructions</li>
          <li>Ship the item back to our Nairobi store</li>
        </ol>
      </div>

      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        background: '#f9fafb', 
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '1.1rem', marginBottom: '10px' }}>Need help with a return?</p>
        <p>Call/WhatsApp: 0742783907 | Email: info@moskethperfumes.co.ke</p>
      </div>
    </div>
  );
}
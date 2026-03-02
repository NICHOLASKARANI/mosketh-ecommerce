import React from 'react';

export const dynamic = 'force-dynamic';

export default function TermsPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>Terms and Conditions</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>1. Acceptance of Terms</h2>
        <p style={{ lineHeight: '1.6' }}>
          By accessing and using this website, you accept and agree to be bound by the terms and conditions 
          outlined below. If you do not agree to these terms, please do not use our website.
        </p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>2. Products and Pricing</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '10px' }}>
          All products are subject to availability. We reserve the right to:
        </p>
        <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
          <li>Modify product prices without prior notice</li>
          <li>Discontinue products at any time</li>
          <li>Limit quantities of products purchased</li>
        </ul>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>3. Orders and Payment</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '10px' }}>
          By placing an order, you warrant that:
        </p>
        <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
          <li>You are legally capable of entering into binding contracts</li>
          <li>You are at least 18 years old</li>
          <li>The payment information provided is accurate and complete</li>
        </ul>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>4. Delivery</h2>
        <p style={{ lineHeight: '1.6' }}>
          We aim to deliver products within the estimated timeframes. However, we are not liable for delays 
          caused by circumstances beyond our control. Risk of loss passes to you upon delivery.
        </p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>5. Intellectual Property</h2>
        <p style={{ lineHeight: '1.6' }}>
          All content on this website, including images, text, logos, and trademarks, is our property and 
          protected by intellectual property laws. Unauthorized use is prohibited.
        </p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>6. Limitation of Liability</h2>
        <p style={{ lineHeight: '1.6' }}>
          We shall not be liable for any indirect, incidental, or consequential damages arising from the use 
          of our products or website. Our total liability shall not exceed the amount paid for the product.
        </p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>7. Governing Law</h2>
        <p style={{ lineHeight: '1.6' }}>
          These terms shall be governed by and construed in accordance with the laws of Kenya. Any disputes 
          shall be subject to the exclusive jurisdiction of Kenyan courts.
        </p>
      </div>

      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        background: '#f9fafb', 
        borderRadius: '8px' 
      }}>
        <p style={{ fontSize: '0.9rem', color: '#666' }}>
          Last updated: March 2026. For questions about these terms, contact us at info@moskethperfumes.co.ke
        </p>
      </div>
    </div>
  );
}
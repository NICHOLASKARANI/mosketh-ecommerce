import React from 'react';

export const dynamic = 'force-dynamic';

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>Privacy Policy</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>1. Information We Collect</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '10px' }}>
          We collect information you provide directly to us, such as when you create an account, make a purchase, 
          or contact us for support. This may include your name, email address, phone number, and shipping address.
        </p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>2. How We Use Your Information</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '10px' }}>
          We use the information we collect to:
        </p>
        <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
          <li>Process your orders and payments</li>
          <li>Communicate with you about your orders</li>
          <li>Send you marketing communications (with your consent)</li>
          <li>Improve our products and services</li>
        </ul>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>3. Information Sharing</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '10px' }}>
          We do not sell, trade, or rent your personal information to third parties. We may share your information 
          with delivery partners solely for order fulfillment purposes.
        </p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>4. Data Security</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '10px' }}>
          We implement appropriate security measures to protect your personal information against unauthorized 
          access, alteration, disclosure, or destruction.
        </p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>5. Your Rights</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '10px' }}>
          You have the right to access, correct, or delete your personal information. Contact us to exercise 
          these rights.
        </p>
      </div>

      <div style={{ marginTop: '40px', padding: '20px', background: '#f9fafb', borderRadius: '8px' }}>
        <p style={{ fontSize: '0.9rem', color: '#666' }}>
          Last updated: March 2026. For questions about this privacy policy, contact us at info@moskethperfumes.co.ke
        </p>
      </div>
    </div>
  );
}
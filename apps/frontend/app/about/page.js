import React from 'react';

export const dynamic = 'force-dynamic';

export default function AboutPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>About Mosketh Perfumes</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '15px' }}>
          Welcome to Mosketh Perfumes & Beauty, your premier destination for authentic luxury fragrances in Kenya. 
          Located at Shop F5, Superior Centre, Kimathi Street, Nairobi CBD, we have been serving fragrance 
          enthusiasts with passion and dedication.
        </p>
        
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '15px' }}>
          Our mission is to provide 100% authentic perfumes at affordable prices, with fast nationwide delivery 
          and exceptional customer service. We believe that everyone deserves to smell amazing and feel confident 
          with their choice of fragrance.
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px',
        marginTop: '40px'
      }}>
        <div style={{ padding: '20px', background: '#f9fafb', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>Our Location</h3>
          <p>Shop F5, Superior Centre</p>
          <p>Kimathi Street, Nairobi CBD</p>
          <p>Kenya</p>
        </div>
        
        <div style={{ padding: '20px', background: '#f9fafb', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>Contact Us</h3>
          <p>📞 Phone/WhatsApp: 0742783907</p>
          <p>📧 Email: info@moskethperfumes.co.ke</p>
          <p>💳 Paybill: 0742783907</p>
        </div>
        
        <div style={{ padding: '20px', background: '#f9fafb', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>Business Hours</h3>
          <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
          <p>Saturday: 10:00 AM - 4:00 PM</p>
          <p>Sunday: Closed</p>
        </div>
      </div>
    </div>
  );
}
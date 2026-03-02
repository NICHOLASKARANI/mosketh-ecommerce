import React from 'react';

export const dynamic = 'force-dynamic';

export default function NotFoundPage() {
  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '100px auto', 
      padding: '40px', 
      textAlign: 'center' 
    }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '20px', color: '#ef4444' }}>404</h1>
      <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Page Not Found</h2>
      <p style={{ fontSize: '1.1rem', marginBottom: '30px', color: '#666' }}>
        The page you are looking for doesn't exist or has been moved.
      </p>
      <a 
        href="/" 
        style={{ 
          display: 'inline-block',
          padding: '12px 24px',
          background: '#10b981',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '6px',
          fontSize: '1.1rem'
        }}
      >
        Go to Homepage
      </a>
    </div>
  );
}
import React from 'react';

export const dynamic = 'force-dynamic';

export default function RegisterPage() {
  async function handleSubmit(formData) {
    'use server';
    
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const phone = formData.get('phone');

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mosketh-backend.vercel.app';
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phone
        }),
      });

      if (res.ok) {
        // Redirect to login page
        // This will be handled by the form submission
      }
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px' }}>
      <h1 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '30px' }}>
        Create an Account
      </h1>
      
      <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            required
            style={{ 
              width: '100%', 
              padding: '12px', 
              borderRadius: '6px', 
              border: '1px solid #d1d5db',
              fontSize: '1rem'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            required
            style={{ 
              width: '100%', 
              padding: '12px', 
              borderRadius: '6px', 
              border: '1px solid #d1d5db',
              fontSize: '1rem'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            style={{ 
              width: '100%', 
              padding: '12px', 
              borderRadius: '6px', 
              border: '1px solid #d1d5db',
              fontSize: '1rem'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Password *
          </label>
          <input
            type="password"
            name="password"
            required
            minLength="6"
            style={{ 
              width: '100%', 
              padding: '12px', 
              borderRadius: '6px', 
              border: '1px solid #d1d5db',
              fontSize: '1rem'
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '14px',
            background: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Register
        </button>

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
          Already have an account?{' '}
          <a href="/login" style={{ color: '#2563eb', textDecoration: 'none' }}>
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
}
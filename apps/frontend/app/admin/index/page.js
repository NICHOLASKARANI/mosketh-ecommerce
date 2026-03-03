'use client';

import React, { useState } from 'react';

export default function AdminIndex() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const ADMIN_EMAIL = 'moskethbeautytouch@gmail.com';
  const ADMIN_PASSWORD = '@Sultan12&crazy207103';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  if (loggedIn) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#f5f5f5',
        padding: '2rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          background: 'white',
          borderRadius: '10px',
          padding: '2rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <h1 style={{ color: '#667eea' }}>Admin Dashboard</h1>
            <button
              onClick={() => setLoggedIn(false)}
              style={{
                padding: '0.5rem 1rem',
                background: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
          <p>Welcome to the admin panel. You can now manage your store.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '10px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          textAlign: 'center',
          marginBottom: '2rem',
          color: '#333'
        }}>
          Admin Login
        </h1>
        
        {error && (
          <div style={{
            background: '#fee',
            color: '#c33',
            padding: '0.75rem',
            borderRadius: '5px',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '1rem'
              }}
              required
            />
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '1rem'
              }}
              required
            />
          </div>
          
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

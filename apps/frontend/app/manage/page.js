'use client';

import React, { useState } from 'react';

export default function ManagePage() {
  const [email, setEmail] = useState('moskethbeautytouch@gmail.com');
  const [password, setPassword] = useState('@Sultan12&crazy207103');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const ADMIN_EMAIL = 'moskethbeautytouch@gmail.com';
  const ADMIN_PASSWORD = '@Sultan12&crazy207103';

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '40px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}>
          <h1 style={{
            textAlign: 'center',
            color: '#333',
            marginBottom: '30px',
            fontSize: '28px',
            fontWeight: '600'
          }}>
            Mosketh Admin
          </h1>
          
          {error && (
            <div style={{
              background: '#fed7d7',
              color: '#c53030',
              padding: '12px',
              borderRadius: '10px',
              marginBottom: '20px',
              textAlign: 'center',
              fontSize: '14px',
              border: '1px solid #fc8181'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#555',
                fontWeight: '500',
                fontSize: '14px'
              }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '10px',
                  fontSize: '16px',
                  outline: 'none'
                }}
                required
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#555',
                fontWeight: '500',
                fontSize: '14px'
              }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '10px',
                  fontSize: '16px',
                  outline: 'none'
                }}
                required
              />
            </div>
            
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              Sign In
            </button>
          </form>
          
          <p style={{
            textAlign: 'center',
            marginTop: '20px',
            color: '#718096',
            fontSize: '14px'
          }}>
            Secure admin access only
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f7fafc',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          paddingBottom: '20px',
          borderBottom: '2px solid #e2e8f0'
        }}>
          <h2 style={{ color: '#667eea', fontSize: '24px' }}>Welcome, Admin</h2>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              background: '#e53e3e',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          <div style={{
            background: '#f7fafc',
            padding: '20px',
            borderRadius: '10px',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{ marginBottom: '15px', color: '#2d3748' }}>Quick Actions</h3>
            <button
              onClick={() => alert('Product management coming soon!')}
              style={{
                width: '100%',
                padding: '12px',
                background: '#48bb78',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '10px'
              }}
            >
              Add New Product
            </button>
            <button
              onClick={() => alert('Orders view coming soon!')}
              style={{
                width: '100%',
                padding: '12px',
                background: '#4299e1',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              View Orders
            </button>
          </div>
          
          <div style={{
            background: '#f7fafc',
            padding: '20px',
            borderRadius: '10px',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{ marginBottom: '15px', color: '#2d3748' }}>Statistics</h3>
            <p style={{ marginBottom: '10px' }}>Total Products: <strong>0</strong></p>
            <p style={{ marginBottom: '10px' }}>Total Orders: <strong>0</strong></p>
            <p>Total Revenue: <strong>KES 0</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}

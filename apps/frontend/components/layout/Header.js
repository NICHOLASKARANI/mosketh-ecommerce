import React from 'react';

export default function Header() {
  return (
    <header style={{ background: '#10b981', color: 'white', padding: '1rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
        <h1>Mosketh Perfumes</h1>
        <nav>
          <a href="/" style={{ color: 'white', margin: '0 1rem' }}>Home</a>
          <a href="/cart" style={{ color: 'white' }}>Cart</a>
        </nav>
      </div>
    </header>
  );
}

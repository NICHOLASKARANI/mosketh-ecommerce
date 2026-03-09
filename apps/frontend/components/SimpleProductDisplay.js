'use client';

import React, { useState, useEffect } from 'react';

export default function SimpleProductDisplay() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Direct localStorage access
    const saved = localStorage.getItem('mosketh_admin_products');
    console.log('🔍 Simple display loading:', saved);
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        console.log('✅ Simple display parsed:', parsed);
        setProducts(parsed);
      } catch (e) {
        console.error('Error parsing:', e);
      }
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
        
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map(p => (
              <div key={p.id} className="bg-white p-4 rounded shadow">
                <h3 className="font-bold">{p.name}</h3>
                <p className="text-purple-600">KES {p.priceKES}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

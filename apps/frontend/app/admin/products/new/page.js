import React from 'react';

export const dynamic = 'force-dynamic';

export default function NewProductPage() {
  async function handleSubmit(formData) {
    'use server';
    
    const name = formData.get('name');
    const sku = formData.get('sku');
    const price = formData.get('price');
    const stock = formData.get('stock');
    const description = formData.get('description');
    const category = formData.get('category');

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mosketh-backend.vercel.app';
      const res = await fetch(`${API_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          sku,
          priceKES: parseInt(price),
          stock: parseInt(stock),
          description,
          categoryId: category,
          isActive: true
        }),
      });

      if (res.ok) {
        // Redirect to products list
        // This will be handled by the form submission
      }
    } catch (error) {
      console.error('Error creating product:', error.message);
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Add New Product</h1>
      
      <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Product Name *
          </label>
          <input
            type="text"
            name="name"
            required
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              SKU *
            </label>
            <input
              type="text"
              name="sku"
              required
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Category *
            </label>
            <select
              name="category"
              required
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }}
            >
              <option value="">Select Category</option>
              <option value="mens-perfumes">Men's Perfumes</option>
              <option value="womens-perfumes">Women's Perfumes</option>
              <option value="body-mists">Body Mists</option>
              <option value="gift-sets">Gift Sets</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Price (KES) *
            </label>
            <input
              type="number"
              name="price"
              required
              min="0"
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Stock Quantity *
            </label>
            <input
              type="number"
              name="stock"
              required
              min="0"
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Description *
          </label>
          <textarea
            name="description"
            required
            rows="6"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Product Images (URLs)
          </label>
          <input
            type="url"
            name="image1"
            placeholder="Main image URL"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db', marginBottom: '10px' }}
          />
          <input
            type="url"
            name="image2"
            placeholder="Additional image URL (optional)"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button
            type="submit"
            style={{
              padding: '12px 24px',
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Create Product
          </button>
          
          <a
            href="/admin/products"
            style={{
              padding: '12px 24px',
              background: '#6b7280',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontSize: '1rem'
            }}
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
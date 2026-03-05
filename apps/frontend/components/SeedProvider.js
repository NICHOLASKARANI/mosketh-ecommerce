'use client';

import { useEffect } from 'react';
import { productDB, DEFAULT_PRODUCTS } from '@/lib/productDB';

export default function SeedProvider({ children }) {
  useEffect(() => {
    // This ensures the default products are always available
    // No action needed as getAll() already returns defaults
    console.log('Product database initialized with', DEFAULT_PRODUCTS.length, 'default products');
    
    // Dispatch initial load event
    window.dispatchEvent(new Event('productsUpdated'));
  }, []);

  return children;
}

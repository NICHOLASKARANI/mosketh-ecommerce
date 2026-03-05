'use client';

import { useEffect } from 'react';
import { productDB } from '@/lib/productDB';

// Initial products to seed the database
const initialProducts = [
  {
    name: "Ameerat Al Arab by Asdaaf",
    priceKES: 2500,
    category: "womens-perfumes",
    description: "A luxurious Arabian fragrance",
    shortDescription: "Luxury Arabian fragrance",
    stock: 10,
    images: ["https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400"],
    featured: true,
    slug: "ameerat-al-arab-by-asdaaf"
  },
  {
    name: "La charmante by Maison Alhambra",
    priceKES: 2800,
    category: "womens-perfumes",
    description: "Elegant and charming floral scent",
    shortDescription: "Elegant floral scent",
    stock: 10,
    images: ["https://images.unsplash.com/photo-1541643600914-78b084683601?w=400"],
    featured: true,
    slug: "la-charmante-by-maison-alhambra"
  },
  {
    name: "Intense Wayfarer By Pendora scents",
    priceKES: 3000,
    category: "unisex-perfumes",
    description: "Bold and intense fragrance",
    shortDescription: "Bold and intense",
    stock: 10,
    images: ["https://images.unsplash.com/photo-1592919505780-303950717480?w=400"],
    featured: true,
    slug: "intense-wayfarer-by-pendora-scents"
  }
];

export default function SeedProvider({ children }) {
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const existingProducts = productDB.getAll();
      if (existingProducts.length === 0) {
        console.log('Seeding database with initial products...');
        initialProducts.forEach(p => productDB.add(p));
        console.log('Seed complete!');
      }
    }
  }, []);

  return children;
}

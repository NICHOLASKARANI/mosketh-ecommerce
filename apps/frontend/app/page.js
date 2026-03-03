import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CategoryGrid from '@/components/home/CategoryGrid';
import NewsletterSection from '@/components/home/NewsletterSection';
import BenefitsSection from '@/components/home/BenefitsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import InstagramFeed from '@/components/social/InstagramFeed';
import FloatingSocialWidget from '@/components/social/FloatingSocialWidget';
import WhatsAppChatWidget from '@/components/social/WhatsAppChatWidget';
import PromotionBanner from '@/components/ui/PromotionBanner';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Client component to get localStorage products
async function getLocalStorageProducts() {
  'use client';
  // This will run on client side only
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('mosketh_products');
    return saved ? JSON.parse(saved) : [];
  }
  return [];
}

async function getAPIFeaturedProducts() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mosketh-backend.vercel.app';
    const res = await fetch(`${API_URL}/api/products?featured=true`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.data) ? data.data : [];
  } catch (error) {
    console.error('Error fetching API products:', error);
    return [];
  }
}

// This is a workaround - we'll use a client component for products
export default async function HomePage() {
  const apiProducts = await getAPIFeaturedProducts();
  
  return (
    <>
      <Header />
      <PromotionBanner />
      <main>
        <HeroSection />
        <BenefitsSection />
        {/* Use client component for products */}
        <ClientProductWrapper apiProducts={apiProducts} />
        <CategoryGrid />
        <TestimonialsSection />
        <InstagramFeed />
        <NewsletterSection />
      </main>
      <Footer />
      <FloatingSocialWidget />
      <WhatsAppChatWidget />
    </>
  );
}

// Client component to merge API and localStorage products
function ClientProductWrapper({ apiProducts }) {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Get localStorage products
    let localProducts = [];
    try {
      const saved = localStorage.getItem('mosketh_products');
      localProducts = saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error reading localStorage:', e);
    }

    // Merge and deduplicate by id
    const allProducts = [...apiProducts, ...localProducts];
    const uniqueProducts = Array.from(new Map(allProducts.map(p => [p.id, p])).values());
    
    // Filter featured
    const featured = uniqueProducts.filter(p => p.featured === true);
    setProducts(featured);
    setLoading(false);
  }, [apiProducts]);

  if (loading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  return <FeaturedProducts products={products} />;
}

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
import LivePurchaseNotification from '@/components/ui/LivePurchaseNotification';
import ExitIntentPopup from '@/components/ui/ExitIntentPopup';

export const dynamic = 'force-dynamic';

// Default fallback data
const defaultTestimonials = [
  {
    id: 1,
    name: 'John Mwangi',
    rating: 5,
    comment: 'Amazing quality perfumes! Fast delivery and great customer service. Will definitely buy again.',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    date: '2024-01-15'
  },
  {
    id: 2,
    name: 'Sarah Wanjiku',
    rating: 5,
    comment: 'I love my new perfume! The scent lasts all day and the price was very reasonable.',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    date: '2024-01-10'
  },
  {
    id: 3,
    name: 'David Omondi',
    rating: 4,
    comment: 'Great selection of fragrances. The M-Pesa payment was seamless and easy.',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    date: '2024-01-05'
  }
];

const defaultCategories = [
  { id: 'mens', name: "Men's Perfumes", slug: 'mens-perfumes', image: '/category-men.jpg' },
  { id: 'womens', name: "Women's Perfumes", slug: 'womens-perfumes', image: '/category-women.jpg' },
  { id: 'mists', name: 'Body Mists', slug: 'body-mists', image: '/category-mists.jpg' },
  { id: 'gifts', name: 'Gift Sets', slug: 'gift-sets', image: '/category-gifts.jpg' }
];

async function fetchWithFallback(url, fallback, errorMessage) {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mosketh-backend.vercel.app';
    console.log(`Fetching from: ${API_URL}${url}`);
    
    const res = await fetch(`${API_URL}${url}`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (!res.ok) {
      console.warn(`${errorMessage}: API returned ${res.status}`);
      return fallback;
    }
    
    const data = await res.json();
    return data.data || fallback;
  } catch (error) {
    console.error(`${errorMessage}:`, error.message);
    return fallback;
  }
}

async function getFeaturedProducts() {
  return fetchWithFallback(
    '/api/products?featured=true',
    [],
    'Error fetching featured products'
  );
}

async function getCategories() {
  return fetchWithFallback(
    '/api/categories',
    defaultCategories,
    'Error fetching categories'
  );
}

async function getTestimonials() {
  return fetchWithFallback(
    '/api/testimonials',
    defaultTestimonials,
    'Error fetching testimonials'
  );
}

export default async function HomePage() {
  const [featuredProducts, categories, testimonials] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
    getTestimonials()
  ]);

  return (
    <>
      <Header />
      <PromotionBanner />
      <main>
        <HeroSection />
        <BenefitsSection />
        <FeaturedProducts products={featuredProducts} />
        <CategoryGrid categories={categories} />
        <TestimonialsSection testimonials={testimonials} />
        <InstagramFeed />
        <NewsletterSection />
      </main>
      <Footer />
      <FloatingSocialWidget />
      <WhatsAppChatWidget />
      <LivePurchaseNotification />
      <ExitIntentPopup />
    </>
  );
}
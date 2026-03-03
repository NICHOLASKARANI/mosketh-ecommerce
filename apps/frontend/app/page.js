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

async function getFeaturedProducts() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mosketh-backend.vercel.app';
    const res = await fetch(`${API_URL}/api/products?featured=true`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

async function getCategories() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mosketh-backend.vercel.app';
    const res = await fetch(`${API_URL}/api/categories`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

async function getTestimonials() {
  // Fallback testimonials
  return [
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
    </>
  );
}
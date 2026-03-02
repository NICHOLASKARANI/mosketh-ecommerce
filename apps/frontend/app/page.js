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
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mosketh-backend.vercel.app';
    const res = await fetch(`${API_URL}/api/testimonials`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
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
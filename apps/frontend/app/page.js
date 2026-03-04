import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import BenefitsSection from '@/components/home/BenefitsSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import HomeProducts from '@/components/HomeProducts';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <BenefitsSection />
        <HomeProducts />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}

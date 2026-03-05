import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import BenefitsSection from '@/components/home/BenefitsSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import ProductDisplay from '@/components/ProductDisplay';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <BenefitsSection />
        <ProductDisplay />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}

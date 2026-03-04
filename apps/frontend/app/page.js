import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import BenefitsSection from '@/components/home/BenefitsSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import ProductCard from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

// Temporary sample products (replace with your actual products)
const sampleProducts = [
  {
    id: '1',
    name: 'Ameerat Al Arab by Asdaaf',
    priceKES: 2500,
    images: ['https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400'],
    slug: 'ameerat-al-arab'
  },
  {
    id: '2',
    name: 'La Charmante by Maison Alhambra',
    priceKES: 2800,
    images: ['https://images.unsplash.com/photo-1541643600914-78b084683601?w=400'],
    slug: 'la-charmante'
  },
  {
    id: '3',
    name: 'Intense Wayfarer By Pendora scents',
    priceKES: 3000,
    images: ['https://images.unsplash.com/photo-1592919505780-303950717480?w=400'],
    slug: 'intense-wayfarer'
  }
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <BenefitsSection />
        
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
        
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}

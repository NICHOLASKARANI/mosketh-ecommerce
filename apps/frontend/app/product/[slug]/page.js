import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { productDB } from '@/lib/productDB';
import ClientProductDetail from './ClientProductDetail';

export default function ProductPage({ params }) {
  const products = productDB.getAll();
  const product = products.find(p => p.slug === params.slug);
  
  if (!product) {
    notFound();
  }

  return (
    <>
      <Header />
      <ClientProductDetail product={product} />
      <Footer />
    </>
  );
}

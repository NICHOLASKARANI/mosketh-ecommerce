import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import BenefitsSection from '@/components/home/BenefitsSection';
import NewsletterSection from '@/components/home/NewsletterSection';

export const dynamic = 'force-dynamic';

// This is a client component that reads directly from localStorage
function ProductList() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    try {
      // Direct localStorage access - no complexity
      const data = localStorage.getItem('mosketh_products');
      console.log('Raw localStorage data:', data);
      
      if (data) {
        const parsed = JSON.parse(data);
        console.log('Parsed products:', parsed);
        setProducts(parsed);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
        
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img 
                  src={product.images?.[0] || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400'} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400'}
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <p className="text-purple-600 font-bold mt-2">KES {product.priceKES}</p>
                  <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <BenefitsSection />
        <ProductList />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}

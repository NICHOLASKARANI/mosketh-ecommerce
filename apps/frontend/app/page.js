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

// Categories data
const categories = [
  { id: 'mens-perfumes', name: "Men's Perfumes", slug: 'mens-perfumes', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Discover bold and sophisticated fragrances for men' },
  { id: 'womens-perfumes', name: "Women's Perfumes", slug: 'womens-perfumes', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Elegant and enchanting scents for every woman' },
  { id: 'unisex-perfumes', name: "Unisex Perfumes", slug: 'unisex-perfumes', image: 'https://images.unsplash.com/photo-1592919505780-303950717480?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Versatile fragrances for anyone who appreciates fine scents' },
  { id: 'body-oils', name: "Body Oils", slug: 'body-oils', image: 'https://images.unsplash.com/photo-1608248597377-82c439dd9c9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Nourishing and aromatic body oils for silky skin' },
  { id: 'face-creams', name: "Face Creams", slug: 'face-creams', image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Luxurious face creams for radiant, youthful skin' },
  { id: 'hair-products', name: "Hair Products", slug: 'hair-products', image: 'https://images.unsplash.com/photo-1585232351009-aa4b5a90f40e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Premium hair care for gorgeous, healthy locks' },
  { id: 'gift-sets', name: "Gift Sets", slug: 'gift-sets', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Beautifully packaged gift sets for your loved ones' }
];

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: 'John Mwangi',
    rating: 5,
    comment: 'Amazing quality perfumes! Fast delivery and great customer service. Will definitely buy again.',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    date: '2024-01-15',
    product: 'Vulcan Feu'
  },
  {
    id: 2,
    name: 'Sarah Wanjiku',
    rating: 5,
    comment: 'I love my new perfume! The scent lasts all day and the price was very reasonable.',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    date: '2024-01-10',
    product: 'Ameerat Al Arab'
  },
  {
    id: 3,
    name: 'David Omondi',
    rating: 4,
    comment: 'Great selection of fragrances. The M-Pesa payment was seamless and easy.',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    date: '2024-01-05',
    product: 'Oud Wood'
  },
  {
    id: 4,
    name: 'Mary Akinyi',
    rating: 5,
    comment: 'The body oils are incredible! My skin feels so soft and smells amazing.',
    image: 'https://randomuser.me/api/portraits/women/4.jpg',
    date: '2024-01-20',
    product: 'Lavender Body Oil'
  },
  {
    id: 5,
    name: 'James Kariuki',
    rating: 5,
    comment: 'Best place for authentic perfumes in Kenya. The customer service is top-notch!',
    image: 'https://randomuser.me/api/portraits/men/5.jpg',
    date: '2024-01-18',
    product: 'Dior Sauvage'
  },
  {
    id: 6,
    name: 'Grace Nduta',
    rating: 5,
    comment: 'I ordered a gift set for my wife and she absolutely loved it! Will definitely order again.',
    image: 'https://randomuser.me/api/portraits/women/6.jpg',
    date: '2024-01-12',
    product: 'Luxury Gift Set'
  }
];

// Get all products from localStorage (client-side only)
function getLocalProducts() {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('mosketh_products');
    return saved ? JSON.parse(saved) : [];
  }
  return [];
}

export default async function HomePage() {
  return (
    <>
      <Header />
      <PromotionBanner />
      <main>
        <HeroSection />
        <BenefitsSection />
        <ClientProductDisplay />
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

// Client component for product display
function ClientProductDisplay() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Load products from localStorage
    const localProducts = getLocalProducts();
    setProducts(localProducts);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-pulse">Loading products...</div>
        </div>
      </div>
    );
  }

  const featuredProducts = products.filter(p => p.featured === true);
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : products.slice(0, 4);

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
          {featuredProducts.length > 0 ? 'Featured Products' : 'Our Products'}
        </h2>
        <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
          {featuredProducts.length > 0 
            ? 'Discover our most popular fragrances loved by customers'
            : 'Browse our collection of luxury fragrances and beauty products'}
        </p>
        
        {products.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <p className="text-gray-500">No products yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <a 
            href="/products" 
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition transform hover:scale-105"
          >
            View All Products
          </a>
        </div>
      </div>
    </div>
  );
}

// Product Card Component
function ProductCard({ product }) {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleAddToCart = () => {
    // Add to cart logic here
    alert(`${product.name} added to cart!`);
  };

  return (
    <div 
      className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative pt-[100%] overflow-hidden">
        <img
          src={product.images?.[0] || 'https://via.placeholder.com/400?text=Mosketh'}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        
        {/* Overlay with quick actions */}
        <div className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button 
            onClick={handleAddToCart}
            className="bg-white text-purple-600 p-3 rounded-full hover:bg-purple-600 hover:text-white transition-all transform hover:scale-110"
            title="Add to Cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
          <button className="bg-white text-pink-600 p-3 rounded-full hover:bg-pink-600 hover:text-white transition-all transform hover:scale-110">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <a 
            href={`/product/${product.slug}`}
            className="bg-white text-blue-600 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </a>
        </div>

        {/* Badges */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Only {product.stock} left
          </div>
        )}
        
        {product.featured && (
          <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </div>
        )}
      </div>

      <div className="p-5">
        <a href={`/product/${product.slug}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-purple-600 transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </a>
        
        <p className="text-sm text-gray-500 line-clamp-2 mb-4">
          {product.shortDescription || product.description?.substring(0, 100) || 'Luxury fragrance'}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-purple-600">
            KES {product.priceKES?.toLocaleString()}
          </span>
          {product.discount > 0 && (
            <span className="text-sm text-gray-400 line-through">
              KES {((product.priceKES * (100 + product.discount)) / 100).toLocaleString()}
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
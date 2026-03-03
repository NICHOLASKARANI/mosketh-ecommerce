import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export const dynamic = 'force-dynamic';

// Categories data
const categories = {
  'mens-perfumes': {
    name: "Men's Perfumes",
    description: 'Discover our exclusive collection of men\'s luxury fragrances. From fresh aquatic scents to deep woody aromas, find the perfect signature scent.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  'womens-perfumes': {
    name: "Women's Perfumes",
    description: 'Explore our enchanting collection of women\'s perfumes. From floral bouquets to oriental mysteries, every bottle tells a unique story.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  'unisex-perfumes': {
    name: "Unisex Perfumes",
    description: 'Experience our versatile unisex fragrances. Perfect for anyone who appreciates fine perfumery, regardless of gender.',
    image: 'https://images.unsplash.com/photo-1592919505780-303950717480?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  'body-oils': {
    name: "Body Oils",
    description: 'Pamper your skin with our nourishing body oils. Infused with natural ingredients for a radiant, silky-smooth finish.',
    image: 'https://images.unsplash.com/photo-1608248597377-82c439dd9c9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  'face-creams': {
    name: "Face Creams",
    description: 'Transform your skincare routine with our premium face creams. Formulated for all skin types with natural ingredients.',
    image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  'hair-products': {
    name: "Hair Products",
    description: 'Achieve gorgeous, healthy hair with our professional hair care products. From shampoos to styling treatments.',
    image: 'https://images.unsplash.com/photo-1585232351009-aa4b5a90f40e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  'gift-sets': {
    name: "Gift Sets",
    description: 'Find the perfect gift with our curated sets. Beautifully packaged and ready to delight your loved ones.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
};

// Client component for category products
function CategoryProducts({ slug }) {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [sortBy, setSortBy] = React.useState('default');

  React.useEffect(() => {
    // Load products from localStorage
    const saved = localStorage.getItem('mosketh_products');
    const allProducts = saved ? JSON.parse(saved) : [];
    
    // Filter by category
    const filtered = allProducts.filter(p => p.category === slug);
    setProducts(filtered);
    setLoading(false);
  }, [slug]);

  const sortProducts = (products) => {
    switch(sortBy) {
      case 'price-low':
        return [...products].sort((a, b) => a.priceKES - b.priceKES);
      case 'price-high':
        return [...products].sort((a, b) => b.priceKES - a.priceKES);
      case 'name':
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return products;
    }
  };

  const sortedProducts = sortProducts(products);
  const category = categories[slug] || {
    name: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    description: `Browse our collection of ${slug.split('-').join(' ')}`,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-900 to-pink-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={category.image} 
            alt={category.name}
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <Link 
            href="/products" 
            className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Back to Products
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>
          <p className="text-xl text-white/90 max-w-3xl">{category.description}</p>
          <p className="mt-4 text-white/80">{products.length} products available</p>
        </div>
      </div>

      {/* Products Section */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Products Found</h2>
            <p className="text-gray-600 mb-8">We couldn't find any products in this category.</p>
            <Link 
              href="/products" 
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <>
            {/* Filter/Sort Bar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-8 flex flex-wrap items-center justify-between gap-4">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{products.length}</span> products
              </p>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="default">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </main>
      
      <Footer />
    </>
  );
}

// Product Card Component
function ProductCard({ product }) {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleAddToCart = () => {
    // Get existing cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already in cart
    const existing = cart.find(item => item.id === product.id);
    
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
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
        
        {/* Badges */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
            Only {product.stock} left
          </div>
        )}
        
        {product.stock === 0 && (
          <div className="absolute top-4 right-4 bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
            Out of Stock
          </div>
        )}

        {product.featured && (
          <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
            Featured
          </div>
        )}

        {/* Quick Add Button */}
        <div className={`absolute inset-x-4 bottom-4 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-3 rounded-lg font-semibold transition-all ${
              product.stock > 0
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>

      <div className="p-5">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-purple-600 transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>
        
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
      </div>
    </div>
  );
}

export default function CategoryPage({ params }) {
  return <CategoryProducts slug={params.slug} />;
}
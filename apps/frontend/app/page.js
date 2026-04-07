'use client';


import BundleDeals from '@/components/BundleDeals';

import BundleDeals from '@/components/BundleDeals';

import BundleDeals from '@/components/BundleDeals';

import BundleDeals from '@/components/BundleDeals';

import BundleDeals from '@/components/BundleDeals';

import BundleDeals from '@/components/BundleDeals';

import BundleDeals from '@/components/BundleDeals';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productAPI.getAll();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const featuredProducts = products.slice(0, 3);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>

      {/* Bundle Deals Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <BundleDeals />
        </div>
      </section> 
      {/* Bundle Deals Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <BundleDeals />
        </div>
      </section> 
      {/* Bundle Deals Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <BundleDeals />
        </div>
      </section> 
      {/* Bundle Deals Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <BundleDeals />
        </div>
      </section> 
      {/* Bundle Deals Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <BundleDeals />
        </div>
      </section> 
      {/* Bundle Deals Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <BundleDeals />
        </div>
      </section> 
      {/* Bundle Deals Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <BundleDeals />
        </div>
      </section> 
      {/* Bundle Deals Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <BundleDeals />
        </div>
      </section> 
      {/* Bundle Deals Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <BundleDeals />
        </div>
      </section><Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Discover Your Signature Scent</h1>
              <p className="text-xl mb-8 opacity-90">Explore our collection of luxury perfumes and beauty products crafted for the modern individual.</p>
              <div className="flex gap-4">
                <Link href="/products" className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">Shop Now</Link>
                <Link href="/about" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition">Learn More</Link>
              </div>
            </div>
            <div className="relative h-96 hidden md:block">
              <Image src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600" alt="Luxury Perfume" fill className="object-cover rounded-2xl shadow-2xl" priority />
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Featured Products</h2>
          <p className="text-gray-600 text-center mb-12">Discover our most popular fragrances and beauty essentials</p>
          {featuredProducts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
              <p className="text-gray-600">No products available yet. Check back soon!</p>
              <Link href="/manage" className="inline-block mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">Add Products in Admin</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <div key={product._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition group">
                  <div className="relative h-64">
                    <Image src={product.images?.[0] || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400'} alt={product.name} fill className="object-cover group-hover:scale-105 transition duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{product.shortDescription}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-purple-600">KES {product.priceKES?.toLocaleString()}</span>
                      <Link href={`/product/${product._id}`} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">View Details</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Link href="/products" className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition">View All Products</Link>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center"><div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><FaTruck className="text-2xl text-purple-600" /></div><h3 className="font-semibold mb-2">Free Delivery</h3><p className="text-gray-600">On orders over KES 5,000</p></div>
            <div className="text-center"><div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><FaShieldAlt className="text-2xl text-purple-600" /></div><h3 className="font-semibold mb-2">100% Authentic</h3><p className="text-gray-600">Genuine products guaranteed</p></div>
            <div className="text-center"><div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><FaHeadset className="text-2xl text-purple-600" /></div><h3 className="font-semibold mb-2">24/7 Support</h3><p className="text-gray-600">We're here to help</p></div>
            <div className="text-center"><div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><FaStar className="text-2xl text-purple-600" /></div><h3 className="font-semibold mb-2">Loyalty Points</h3><p className="text-gray-600">Earn points on every purchase</p></div>
          </div>
        </div>
      </section>

      {/* Bundle Deals Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <BundleDeals />
        </div>
      </section> 
      {/* Bundle Deals Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <BundleDeals />
        </div>
      </section> 
      {/* Bundle Deals Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <BundleDeals />
        </div>
      </section> 
      {/* Bundle Deals Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <BundleDeals />
        </div>
      </section> 
      {/* Bundle Deals Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <BundleDeals />
        </div>
      </section> 
      {/* Bundle Deals Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <BundleDeals />
        </div>
      </section> 
      {/* Bundle Deals Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <BundleDeals />
        </div>
      </section><Footer />
    </>
  );
}


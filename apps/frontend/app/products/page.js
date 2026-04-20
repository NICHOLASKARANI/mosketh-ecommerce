'use client';


import AdBanner from '@/components/AdBanner';

import AdBanner from '@/components/AdBanner';

import AdBanner from '@/components/AdBanner';

import AdBanner from '@/components/AdBanner';

import AdBanner from '@/components/AdBanner';

import AdBanner from '@/components/AdBanner';

import AdBanner from '@/components/AdBanner';

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'mens-perfumes', name: "Men's Perfumes" },
  { id: 'womens-perfumes', name: "Women's Perfumes" },
  { id: 'unisex-perfumes', name: "Unisex Perfumes" },
  { id: 'deodorants', name: "Deodorants" },
  { id: 'body-mists', name: "Body Mists" },
  { id: 'lotions', name: "Lotions" },
  { id: 'body-creams', name: "Body Creams/Solids" },
  { id: 'soaps', name: "Soaps" },
  { id: 'shower-gels', name: "Shower Gels" },
  { id: 'body-scrubs', name: "Body Scrubs" },
  { id: 'facial-scrubs', name: "Facial Scrubs" },
  { id: 'face-serums', name: "Face Serums" },
  { id: 'lip-oils', name: "Lip Oils" },
  { id: 'face-masks', name: "Face Masks" },
  { id: 'face-creams', name: "Face Creams" },
  { id: 'body-oils', name: "Body Oils" },
  { id: 'hair-products', name: "Hair Products" },
  { id: 'gift-sets', name: "Gift Sets" }
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  useEffect(() => {
    loadProducts();
    const interval = setInterval(loadProducts, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, searchTerm, sortBy, products]);

  const loadProducts = async () => {
    try {
      const data = await productAPI.getAll();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    switch (sortBy) {
      case 'price-low': filtered.sort((a, b) => a.priceKES - b.priceKES); break;
      case 'price-high': filtered.sort((a, b) => b.priceKES - a.priceKES); break;
      case 'name': filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-xl opacity-90">Discover our collection of luxury fragrances and beauty products</p>
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Ad Banner */}
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <AdBanner slot="1234567891" format="rectangle" style={{ minHeight: '250px' }} />
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search products..." value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" />
            </div>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600">
              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600">
              <option value="default">Sort by</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>
        <p className="text-gray-600 mb-6">Showing <span className="font-semibold">{filteredProducts.length}</span> products</p>
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Products Found</h2>
            <a href="/manage" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition inline-block">Go to Admin Panel</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => <ProductCard key={product._id} product={product} />)}
          </div>
        )}
      </main>
    </>
  );
}

export default function ProductsPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div></div>}>
        <ProductsContent />
      </Suspense>
      <Footer />
    </>
  );
}


'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FaBox, FaShoppingCart, FaUsers, FaEye, 
  FaPlus, FaTrash, FaUpload, FaImage, 
  FaTachometerAlt, FaSignOutAlt, FaSave, FaSpinner,
  FaChartBar, FaList, FaTimes, FaSearch,
  FaFilter, FaSort, FaCheck, FaExclamationTriangle,
  FaUserPlus, FaCartPlus, FaMoneyBillWave, FaClock
} from 'react-icons/fa';

export default function ManagePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Data states
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    lowStock: 0,
    outOfStock: 0
  });

  // New product form
  const [newProduct, setNewProduct] = useState({
    name: '',
    priceKES: '',
    category: 'mens-perfumes',
    description: '',
    shortDescription: '',
    stock: '',
    images: [],
    featured: false
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const ADMIN_EMAIL = 'moskethbeautytouch@gmail.com';
  const ADMIN_PASSWORD = '@Sultan12&crazy207103';

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchAllData();
    }
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mosketh-backend.vercel.app';
      
      // Fetch products
      const productsRes = await fetch(`${API_URL}/api/products`);
      const productsData = await productsRes.json();
      const productsList = Array.isArray(productsData.data) ? productsData.data : [];
      setProducts(productsList);
      
      // Mock customers
      setCustomers([
        { id: 1, name: 'John Mwangi', email: 'john@example.com', phone: '0712345678', orders: 3, spent: 12000 },
        { id: 2, name: 'Sarah Wanjiku', email: 'sarah@example.com', phone: '0723456789', orders: 2, spent: 5000 },
        { id: 3, name: 'David Omondi', email: 'david@example.com', phone: '0734567890', orders: 5, spent: 25000 }
      ]);
      
      // Mock orders
      setOrders([
        { id: 'ORD001', customer: 'John Mwangi', amount: 4000, status: 'completed', date: '2024-03-01' },
        { id: 'ORD002', customer: 'Sarah Wanjiku', amount: 2500, status: 'pending', date: '2024-03-02' },
        { id: 'ORD003', customer: 'David Omondi', amount: 7500, status: 'processing', date: '2024-03-03' }
      ]);
      
      // Calculate stats
      const lowStock = productsList.filter(p => p.stock > 0 && p.stock < 5).length;
      const outOfStock = productsList.filter(p => p.stock === 0).length;
      const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
      
      setStats({
        totalProducts: productsList.length,
        totalOrders: orders.length,
        totalCustomers: customers.length,
        totalRevenue,
        lowStock,
        outOfStock
      });
      
    } catch (error) {
      console.error('Error fetching data:', error);
      showNotification('Error loading data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      fetchAllData();
      setError('');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    router.push('/');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.includes('jpeg') && !file.type.includes('jpg') && !file.type.includes('png')) {
      showNotification('Please upload a JPEG or PNG image', 'error');
      return;
    }

    setUploading(true);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setNewProduct({
        ...newProduct,
        images: [reader.result]
      });
      setUploading(false);
      showNotification('Image uploaded successfully', 'success');
    };
    reader.readAsDataURL(file);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mosketh-backend.vercel.app';
      
      if (!newProduct.name || !newProduct.priceKES || !newProduct.stock) {
        showNotification('Please fill all required fields', 'error');
        setLoading(false);
        return;
      }

      const productData = {
        name: String(newProduct.name),
        priceKES: Number(newProduct.priceKES),
        category: String(newProduct.category),
        description: String(newProduct.description || 'No description provided'),
        shortDescription: String(newProduct.shortDescription || newProduct.name),
        stock: Number(newProduct.stock),
        images: Array.isArray(newProduct.images) && newProduct.images.length > 0 
          ? newProduct.images 
          : ['https://via.placeholder.com/800x800?text=Mosketh'],
        featured: Boolean(newProduct.featured),
        slug: String(newProduct.name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      };

      const response = await fetch(`${API_URL}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });

      if (!response.ok) throw new Error('Failed to add product');

      const result = await response.json();
      
      if (result.success) {
        showNotification('Product added successfully!', 'success');
        setNewProduct({
          name: '',
          priceKES: '',
          category: 'mens-perfumes',
          description: '',
          shortDescription: '',
          stock: '',
          images: [],
          featured: false
        });
        setImagePreview(null);
        await fetchAllData();
        setActiveTab('products');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      showNotification('Error adding product', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mosketh-backend.vercel.app';
      const response = await fetch(`${API_URL}/api/products/${productId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        showNotification('Product deleted successfully', 'success');
        fetchAllData();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      showNotification('Error deleting product', 'error');
    }
  };

  // Filter products
  const filteredProducts = Array.isArray(products) ? products.filter(p => {
    if (searchTerm && !String(p.name || '').toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (filterCategory !== 'all' && p.category !== filterCategory) return false;
    return true;
  }) : [];

  // Login Page
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Admin Login</h1>
            <p className="text-gray-600 mt-2">Enter your credentials</p>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                placeholder="moskethbeautytouch@gmail.com"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-purple-500"
                placeholder="••••••••"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 font-semibold"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {notification.type === 'success' ? <FaCheck /> : <FaExclamationTriangle />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">Mosketh Admin</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex space-x-4 border-b overflow-x-auto pb-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: FaTachometerAlt },
            { id: 'products', label: 'Products', icon: FaList },
            { id: 'add-product', label: 'Add Product', icon: FaPlus },
            { id: 'customers', label: 'Customers', icon: FaUsers },
            { id: 'orders', label: 'Orders', icon: FaShoppingCart }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 font-medium whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab.id ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon /> {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {loading && (
          <div className="flex justify-center py-12">
            <FaSpinner className="animate-spin text-4xl text-purple-600" />
          </div>
        )}

        {!loading && activeTab === 'dashboard' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon={FaBox} label="Products" value={stats.totalProducts} color="purple" />
              <StatCard icon={FaShoppingCart} label="Orders" value={stats.totalOrders} color="green" />
              <StatCard icon={FaUsers} label="Customers" value={stats.totalCustomers} color="blue" />
              <StatCard icon={FaMoneyBillWave} label="Revenue" value={`KES ${stats.totalRevenue}`} color="yellow" />
            </div>
          </div>
        )}

        {!loading && activeTab === 'products' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold">Products ({filteredProducts.length})</h2>
              
              <div className="flex gap-2">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option value="all">All Categories</option>
                  <option value="mens-perfumes">Men's</option>
                  <option value="womens-perfumes">Women's</option>
                  <option value="unisex-perfumes">Unisex</option>
                </select>
              </div>
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredProducts.map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4">
                          <img 
                            src={product.images?.[0] || '/logo.png'} 
                            alt={String(product.name || 'Product')}
                            className="w-12 h-12 object-cover rounded"
                          />
                        </td>
                        <td className="px-6 py-4 font-medium">{String(product.name || '')}</td>
                        <td className="px-6 py-4">KES {Number(product.priceKES || 0).toLocaleString()}</td>
                        <td className="px-6 py-4 capitalize">{String(product.category || '').replace('-', ' ')}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-sm ${
                            Number(product.stock) > 5 ? 'bg-green-100 text-green-800' : 
                            Number(product.stock) > 0 ? 'bg-orange-100 text-orange-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {Number(product.stock)} units
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {!loading && activeTab === 'add-product' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
            
            <form onSubmit={handleAddProduct} className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">Product Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img src={imagePreview} alt="Preview" className="max-w-xs mx-auto rounded-lg max-h-48" />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setNewProduct({...newProduct, images: []});
                        }}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <FaImage className="text-4xl text-gray-400 mx-auto" />
                      <p className="text-gray-500">Click to upload</p>
                      <input
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 cursor-pointer"
                      >
                        {uploading ? <FaSpinner className="animate-spin" /> : 'Choose Image'}
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Product Name *"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
                <input
                  type="number"
                  placeholder="Price (KES) *"
                  value={newProduct.priceKES}
                  onChange={(e) => setNewProduct({...newProduct, priceKES: e.target.value})}
                  className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
                <input
                  type="number"
                  placeholder="Stock *"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                  className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option value="mens-perfumes">Men's Perfumes</option>
                  <option value="womens-perfumes">Women's Perfumes</option>
                  <option value="unisex-perfumes">Unisex Perfumes</option>
                </select>
              </div>

              <input
                type="text"
                placeholder="Short Description"
                value={newProduct.shortDescription}
                onChange={(e) => setNewProduct({...newProduct, shortDescription: e.target.value})}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />

              <textarea
                placeholder="Full Description *"
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                rows="4"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={newProduct.featured}
                  onChange={(e) => setNewProduct({...newProduct, featured: e.target.checked})}
                  className="w-4 h-4 text-purple-600"
                />
                <label htmlFor="featured">Feature on homepage</label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 font-semibold flex items-center justify-center gap-2"
              >
                {loading ? <><FaSpinner className="animate-spin" /> Adding...</> : <><FaSave /> Add Product</>}
              </button>
            </form>
          </div>
        )}

        {!loading && activeTab === 'customers' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Customers ({customers.length})</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Spent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {customers.map((c) => (
                    <tr key={c.id}>
                      <td className="px-6 py-4">{String(c.name || '')}</td>
                      <td className="px-6 py-4">{String(c.email || '')}</td>
                      <td className="px-6 py-4">{String(c.phone || '')}</td>
                      <td className="px-6 py-4">{Number(c.orders || 0)}</td>
                      <td className="px-6 py-4">KES {Number(c.spent || 0).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!loading && activeTab === 'orders' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Orders ({orders.length})</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((o) => (
                    <tr key={o.id}>
                      <td className="px-6 py-4 font-medium">{String(o.id || '')}</td>
                      <td className="px-6 py-4">{String(o.customer || '')}</td>
                      <td className="px-6 py-4">KES {Number(o.amount || 0).toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-sm ${
                          o.status === 'completed' ? 'bg-green-100 text-green-800' :
                          o.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {String(o.status || '')}
                        </span>
                      </td>
                      <td className="px-6 py-4">{String(o.date || '')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ icon: Icon, label, value, color }) {
  const colors = {
    purple: 'text-purple-600',
    green: 'text-green-600',
    blue: 'text-blue-600',
    yellow: 'text-yellow-600'
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{label}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
        <Icon className={`${colors[color]} text-4xl opacity-50`} />
      </div>
    </div>
  );
}
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FaBox, FaShoppingCart, FaUsers, FaEye, 
  FaPlus, FaEdit, FaTrash, FaUpload, FaImage, 
  FaTachometerAlt, FaSignOutAlt, FaSave, FaSpinner,
  FaChartBar, FaList, FaCog, FaTimes, FaSearch,
  FaFilter, FaSort, FaDownload, FaPrint, FaEyeSlash,
  FaCheck, FaTimes as FaTimesCircle, FaExclamationTriangle,
  FaUserPlus, FaUserEdit, FaUserTimes, FaCartPlus,
  FaMoneyBillWave, FaCalendarAlt, FaClock, FaMapMarkerAlt,
  FaPhone, FaEnvelope, FaIdCard, FaStar, FaStarHalf
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
  const [sortBy, setSortBy] = useState('newest');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

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
    outOfStock: 0,
    pendingOrders: 0,
    completedOrders: 0
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
    featured: false,
    discount: 0,
    tags: []
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  // New customer form
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    joinDate: new Date().toISOString().split('T')[0]
  });

  // New order form
  const [newOrder, setNewOrder] = useState({
    customerId: '',
    products: [],
    total: 0,
    status: 'pending',
    paymentMethod: 'mpesa',
    deliveryMethod: 'standard',
    orderDate: new Date().toISOString().split('T')[0]
  });

  const ADMIN_EMAIL = 'moskethbeautytouch@gmail.com';
  const ADMIN_PASSWORD = '@Sultan12&crazy207103';

  // Notification helper
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
      setProducts(productsData.data || []);
      
      // Fetch customers (mock for now)
      const mockCustomers = [
        { id: 1, name: 'John Mwangi', email: 'john@example.com', phone: '0712345678', orders: 3, spent: 12000, joinDate: '2024-01-15' },
        { id: 2, name: 'Sarah Wanjiku', email: 'sarah@example.com', phone: '0723456789', orders: 2, spent: 5000, joinDate: '2024-01-20' },
        { id: 3, name: 'David Omondi', email: 'david@example.com', phone: '0734567890', orders: 5, spent: 25000, joinDate: '2024-01-05' },
        { id: 4, name: 'Mary Akinyi', email: 'mary@example.com', phone: '0745678901', orders: 1, spent: 4000, joinDate: '2024-02-01' },
        { id: 5, name: 'James Kariuki', email: 'james@example.com', phone: '0756789012', orders: 4, spent: 18000, joinDate: '2024-01-10' }
      ];
      setCustomers(mockCustomers);
      
      // Fetch orders (mock for now)
      const mockOrders = [
        { id: 'ORD001', customer: 'John Mwangi', amount: 4000, status: 'completed', date: '2024-03-01', items: 2, paymentMethod: 'mpesa' },
        { id: 'ORD002', customer: 'Sarah Wanjiku', amount: 2500, status: 'pending', date: '2024-03-02', items: 1, paymentMethod: 'card' },
        { id: 'ORD003', customer: 'David Omondi', amount: 7500, status: 'processing', date: '2024-03-03', items: 3, paymentMethod: 'mpesa' },
        { id: 'ORD004', customer: 'Mary Akinyi', amount: 4000, status: 'completed', date: '2024-03-04', items: 2, paymentMethod: 'cash' },
        { id: 'ORD005', customer: 'James Kariuki', amount: 6000, status: 'pending', date: '2024-03-05', items: 2, paymentMethod: 'mpesa' }
      ];
      setOrders(mockOrders);
      
      // Calculate stats
      const totalRevenue = mockOrders.reduce((sum, order) => sum + order.amount, 0);
      const lowStock = (productsData.data || []).filter(p => p.stock > 0 && p.stock < 5).length;
      const outOfStock = (productsData.data || []).filter(p => p.stock === 0).length;
      const pendingOrders = mockOrders.filter(o => o.status === 'pending').length;
      const completedOrders = mockOrders.filter(o => o.status === 'completed').length;
      
      setStats({
        totalProducts: (productsData.data || []).length,
        totalOrders: mockOrders.length,
        totalCustomers: mockCustomers.length,
        totalRevenue,
        lowStock,
        outOfStock,
        pendingOrders,
        completedOrders
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
        name: newProduct.name,
        priceKES: parseInt(newProduct.priceKES),
        category: newProduct.category,
        description: newProduct.description || 'No description provided',
        shortDescription: newProduct.shortDescription || newProduct.name,
        stock: parseInt(newProduct.stock),
        images: newProduct.images.length > 0 ? newProduct.images : ['https://via.placeholder.com/800x800?text=Mosketh'],
        featured: newProduct.featured || false,
        discount: newProduct.discount || 0,
        tags: newProduct.tags || [],
        slug: newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      };

      const response = await fetch(`${API_URL}/api/products`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
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
          featured: false,
          discount: 0,
          tags: []
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
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    const newId = customers.length + 1;
    setCustomers([...customers, { ...newCustomer, id: newId, orders: 0, spent: 0 }]);
    showNotification('Customer added successfully', 'success');
    setNewCustomer({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      joinDate: new Date().toISOString().split('T')[0]
    });
  };

  const handleAddOrder = (e) => {
    e.preventDefault();
    const newId = `ORD${String(orders.length + 1).padStart(3, '0')}`;
    const customer = customers.find(c => c.id.toString() === newOrder.customerId);
    setOrders([...orders, {
      id: newId,
      customer: customer?.name || 'Unknown',
      amount: newOrder.total,
      status: newOrder.status,
      date: newOrder.orderDate,
      items: newOrder.products.length,
      paymentMethod: newOrder.paymentMethod
    }]);
    showNotification('Order added successfully', 'success');
    setNewOrder({
      customerId: '',
      products: [],
      total: 0,
      status: 'pending',
      paymentMethod: 'mpesa',
      deliveryMethod: 'standard',
      orderDate: new Date().toISOString().split('T')[0]
    });
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => 
      o.id === orderId ? { ...o, status: newStatus } : o
    ));
    showNotification(`Order ${orderId} marked as ${newStatus}`, 'success');
  };

  // Filter and sort products
  const filteredProducts = products
    .filter(p => {
      if (searchTerm && !p.name?.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (filterCategory !== 'all' && p.category !== filterCategory) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === 'price-low') return a.priceKES - b.priceKES;
      if (sortBy === 'price-high') return b.priceKES - a.priceKES;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  // Login Page
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <img 
              src="/logo.png" 
              alt="Mosketh Logo" 
              className="w-20 h-20 mx-auto mb-4 rounded-full border-4 border-purple-100"
              onError={(e) => e.target.src = 'https://via.placeholder.com/80?text=Mosketh'}
            />
            <h1 className="text-3xl font-bold text-gray-800">Admin Login</h1>
            <p className="text-gray-600 mt-2">Enter your credentials to continue</p>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                placeholder="••••••••"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
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
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slideIn ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {notification.type === 'success' ? <FaCheck /> : <FaExclamationTriangle />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-fadeIn">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDeleteProduct(productToDelete)}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Mosketh" className="w-10 h-10 rounded-full" onError={(e) => e.target.src = 'https://via.placeholder.com/40?text=M'} />
            <h1 className="text-2xl font-bold text-purple-600">Mosketh Admin</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex space-x-2 md:space-x-4 border-b overflow-x-auto pb-1 scrollbar-hide">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 md:px-4 py-2 font-medium whitespace-nowrap flex items-center gap-1 md:gap-2 text-sm md:text-base ${
              activeTab === 'dashboard' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FaTachometerAlt /> <span className="hidden sm:inline">Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-3 md:px-4 py-2 font-medium whitespace-nowrap flex items-center gap-1 md:gap-2 text-sm md:text-base ${
              activeTab === 'products' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FaBox /> <span className="hidden sm:inline">Products</span>
          </button>
          <button
            onClick={() => setActiveTab('add-product')}
            className={`px-3 md:px-4 py-2 font-medium whitespace-nowrap flex items-center gap-1 md:gap-2 text-sm md:text-base ${
              activeTab === 'add-product' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FaPlus /> <span className="hidden sm:inline">Add Product</span>
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`px-3 md:px-4 py-2 font-medium whitespace-nowrap flex items-center gap-1 md:gap-2 text-sm md:text-base ${
              activeTab === 'customers' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FaUsers /> <span className="hidden sm:inline">Customers</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3 md:px-4 py-2 font-medium whitespace-nowrap flex items-center gap-1 md:gap-2 text-sm md:text-base ${
              activeTab === 'orders' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FaShoppingCart /> <span className="hidden sm:inline">Orders</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <FaSpinner className="animate-spin text-4xl text-purple-600" />
          </div>
        )}

        {/* Dashboard Tab */}
        {!loading && activeTab === 'dashboard' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Products</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.totalProducts}</p>
                  </div>
                  <FaBox className="text-purple-600 text-4xl opacity-50" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Orders</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.totalOrders}</p>
                  </div>
                  <FaShoppingCart className="text-green-600 text-4xl opacity-50" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Customers</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.totalCustomers}</p>
                  </div>
                  <FaUsers className="text-blue-600 text-4xl opacity-50" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Revenue (KES)</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.totalRevenue.toLocaleString()}</p>
                  </div>
                  <FaMoneyBillWave className="text-yellow-600 text-4xl opacity-50" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Low Stock</p>
                    <p className="text-3xl font-bold text-orange-600">{stats.lowStock}</p>
                  </div>
                  <FaExclamationTriangle className="text-orange-600 text-4xl opacity-50" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Out of Stock</p>
                    <p className="text-3xl font-bold text-red-600">{stats.outOfStock}</p>
                  </div>
                  <FaTimesCircle className="text-red-600 text-4xl opacity-50" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Pending Orders</p>
                    <p className="text-3xl font-bold text-yellow-600">{stats.pendingOrders}</p>
                  </div>
                  <FaClock className="text-yellow-600 text-4xl opacity-50" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Completed Orders</p>
                    <p className="text-3xl font-bold text-green-600">{stats.completedOrders}</p>
                  </div>
                  <FaCheck className="text-green-600 text-4xl opacity-50" />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
                <div className="space-y-3">
                  {orders.slice(0, 5).map(order => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-gray-500">{order.customer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">KES {order.amount}</p>
                        <span className={`text-xs px-2 py-1 rounded ${
                          order.status === 'completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Low Stock Alert</h3>
                <div className="space-y-3">
                  {products.filter(p => p.stock > 0 && p.stock < 5).slice(0, 5).map(product => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-orange-600 font-semibold">{product.stock} left</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {!loading && activeTab === 'products' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-800">All Products ({filteredProducts.length})</h2>
              
              {/* Search and Filter */}
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option value="all">All Categories</option>
                  <option value="mens-perfumes">Men's Perfumes</option>
                  <option value="womens-perfumes">Women's Perfumes</option>
                  <option value="unisex-perfumes">Unisex Perfumes</option>
                  <option value="body-oils">Body Oils</option>
                  <option value="face-creams">Face Creams</option>
                  <option value="hair-products">Hair Products</option>
                  <option value="gift-sets">Gift Sets</option>
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <FaBox className="text-5xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No products found.</p>
                <button
                  onClick={() => setActiveTab('add-product')}
                  className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  Add Your First Product
                </button>
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <img 
                            src={product.images?.[0] || '/logo.png'} 
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                            onError={(e) => e.target.src = 'https://via.placeholder.com/48?text=P'}
                          />
                        </td>
                        <td className="px-6 py-4 font-medium">{product.name}</td>
                        <td className="px-6 py-4">KES {product.priceKES?.toLocaleString()}</td>
                        <td className="px-6 py-4 capitalize">{product.category?.replace('-', ' ') || 'N/A'}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-sm ${
                            product.stock > 5 ? 'bg-green-100 text-green-800' : 
                            product.stock > 0 ? 'bg-orange-100 text-orange-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {product.stock} units
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {product.featured ? (
                            <span className="text-purple-600 flex items-center gap-1">
                              <FaStar /> Featured
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => {
                                setProductToDelete(product.id);
                                setShowDeleteModal(true);
                              }}
                              className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition"
                              title="Delete product"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Add Product Tab */}
        {!loading && activeTab === 'add-product' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
            
            <form onSubmit={handleAddProduct} className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">Product Image (JPEG/PNG)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="max-w-xs mx-auto rounded-lg shadow-lg"
                        style={{ maxHeight: '200px' }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setNewProduct({...newProduct, images: []});
                        }}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove Image
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <FaImage className="text-4xl text-gray-400 mx-auto" />
                      <p className="text-gray-500">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-400">JPEG or PNG, 800x800 recommended</p>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/jpg"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 cursor-pointer"
                      >
                        {uploading ? <FaSpinner className="animate-spin" /> : <><FaUpload className="inline mr-2" /> Choose Image</>}
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="e.g., Vulcan Feu by French Avenue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Price (KES) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={newProduct.priceKES}
                    onChange={(e) => setNewProduct({...newProduct, priceKES: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="e.g., 4000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Stock Quantity *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="e.g., 10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="mens-perfumes">Men's Perfumes</option>
                    <option value="womens-perfumes">Women's Perfumes</option>
                    <option value="unisex-perfumes">Unisex Perfumes</option>
                    <option value="body-oils">Body Oils</option>
                    <option value="face-creams">Face Creams</option>
                    <option value="hair-products">Hair Products</option>
                    <option value="gift-sets">Gift Sets</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Discount (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newProduct.discount}
                    onChange={(e) => setNewProduct({...newProduct, discount: parseInt(e.target.value)})}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="e.g., 10"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={newProduct.featured}
                    onChange={(e) => setNewProduct({...newProduct, featured: e.target.checked})}
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                    Feature this product on homepage
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Short Description</label>
                <input
                  type="text"
                  value={newProduct.shortDescription}
                  onChange={(e) => setNewProduct({...newProduct, shortDescription: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Brief description (max 100 characters)"
                  maxLength="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Full Description *</label>
                <textarea
                  required
                  rows="5"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Detailed product description..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? <><FaSpinner className="animate-spin" /> Adding...</> : <><FaSave /> Add Product</>}
              </button>
            </form>
          </div>
        )}

        {/* Customers Tab */}
        {!loading && activeTab === 'customers' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Add New Customer</h2>
              <form onSubmit={handleAddCustomer} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                  className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
                <input
                  type="email"
                  placeholder="Email *"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                  className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone *"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                  className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={newCustomer.address}
                  onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})}
                  className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={newCustomer.city}
                  onChange={(e) => setNewCustomer({...newCustomer, city: e.target.value})}
                  className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <input
                  type="date"
                  value={newCustomer.joinDate}
                  onChange={(e) => setNewCustomer({...newCustomer, joinDate: e.target.value})}
                  className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <button
                  type="submit"
                  className="md:col-span-2 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold flex items-center justify-center gap-2"
                >
                  <FaUserPlus /> Add Customer
                </button>
              </form>
            </div>

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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {customers.map((customer) => (
                      <tr key={customer.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium">{customer.name}</td>
                        <td className="px-6 py-4">{customer.email}</td>
                        <td className="px-6 py-4">{customer.phone}</td>
                        <td className="px-6 py-4">{customer.orders}</td>
                        <td className="px-6 py-4">KES {customer.spent?.toLocaleString()}</td>
                        <td className="px-6 py-4">{new Date(customer.joinDate).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {!loading && activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Create New Order</h2>
              <form onSubmit={handleAddOrder} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={newOrder.customerId}
                  onChange={(e) => setNewOrder({...newOrder, customerId: e.target.value})}
                  className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                >
                  <option value="">Select Customer</option>
                  {customers.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                
                <input
                  type="number"
                  placeholder="Total Amount *"
                  value={newOrder.total}
                  onChange={(e) => setNewOrder({...newOrder, total: parseInt(e.target.value)})}
                  className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
                
                <select
                  value={newOrder.status}
                  onChange={(e) => setNewOrder({...newOrder, status: e.target.value})}
                  className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                
                <select
                  value={newOrder.paymentMethod}
                  onChange={(e) => setNewOrder({...newOrder, paymentMethod: e.target.value})}
                  className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option value="mpesa">M-PESA</option>
                  <option value="card">Card</option>
                  <option value="cash">Cash on Delivery</option>
                </select>
                
                <select
                  value={newOrder.deliveryMethod}
                  onChange={(e) => setNewOrder({...newOrder, deliveryMethod: e.target.value})}
                  className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option value="standard">Standard Delivery</option>
                  <option value="express">Express Delivery</option>
                  <option value="pickup">Store Pickup</option>
                </select>
                
                <input
                  type="date"
                  value={newOrder.orderDate}
                  onChange={(e) => setNewOrder({...newOrder, orderDate: e.target.value})}
                  className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                
                <button
                  type="submit"
                  className="md:col-span-2 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold flex items-center justify-center gap-2"
                >
                  <FaCartPlus /> Create Order
                </button>
              </form>
            </div>

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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium">{order.id}</td>
                        <td className="px-6 py-4">{order.customer}</td>
                        <td className="px-6 py-4">KES {order.amount}</td>
                        <td className="px-6 py-4">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className={`px-2 py-1 rounded text-sm border ${
                              order.status === 'completed' ? 'bg-green-100 text-green-800 border-green-300' :
                              order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                              order.status === 'processing' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                              'bg-red-100 text-red-800 border-red-300'
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 capitalize">{order.paymentMethod}</td>
                        <td className="px-6 py-4">{new Date(order.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <button className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition">
                            <FaEye />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
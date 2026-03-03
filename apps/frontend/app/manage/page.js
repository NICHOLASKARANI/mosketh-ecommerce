'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FaBox, FaShoppingCart, FaUsers, FaEye, 
  FaPlus, FaTrash, FaUpload, FaImage, 
  FaTachometerAlt, FaSignOutAlt, FaSave, FaSpinner,
  FaList, FaCheck, FaExclamationTriangle,
  FaMoneyBillWave
} from 'react-icons/fa';

export default function ManagePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

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

  const ADMIN_EMAIL = 'moskethbeautytouch@gmail.com';
  const ADMIN_PASSWORD = '@Sultan12&crazy207103';

  // Load products from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('mosketh_products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
    
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('mosketh_products', JSON.stringify(products));
    }
  }, [products]);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
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

  const handleAddProduct = (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (!newProduct.name || !newProduct.priceKES || !newProduct.stock) {
        showNotification('Please fill all required fields', 'error');
        setLoading(false);
        return;
      }

      // Create new product object
      const productToAdd = {
        id: Date.now().toString(),
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
        slug: String(newProduct.name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        createdAt: new Date().toISOString()
      };

      // Add to products array
      const updatedProducts = [...products, productToAdd];
      setProducts(updatedProducts);
      
      // Save to localStorage
      localStorage.setItem('mosketh_products', JSON.stringify(updatedProducts));
      
      showNotification('Product added successfully!', 'success');
      
      // Reset form
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
      
      // Switch to products tab
      setActiveTab('products');
      
    } catch (error) {
      console.error('Error adding product:', error);
      showNotification('Error adding product', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    const updatedProducts = products.filter(p => p.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem('mosketh_products', JSON.stringify(updatedProducts));
    showNotification('Product deleted successfully', 'success');
  };

  // Calculate stats
  const stats = {
    totalProducts: products.length,
    totalValue: products.reduce((sum, p) => sum + (Number(p.priceKES) * Number(p.stock)), 0),
    lowStock: products.filter(p => p.stock > 0 && p.stock < 5).length,
    outOfStock: products.filter(p => p.stock === 0).length
  };

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
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 font-medium flex items-center gap-2 ${
              activeTab === 'dashboard' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'
            }`}
          >
            <FaTachometerAlt /> Dashboard
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 font-medium flex items-center gap-2 ${
              activeTab === 'products' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'
            }`}
          >
            <FaList /> Products
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`px-4 py-2 font-medium flex items-center gap-2 ${
              activeTab === 'add' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'
            }`}
          >
            <FaPlus /> Add Product
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <FaBox className="text-purple-600 text-3xl mb-2" />
              <p className="text-2xl font-bold">{stats.totalProducts}</p>
              <p className="text-gray-500">Total Products</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <FaMoneyBillWave className="text-green-600 text-3xl mb-2" />
              <p className="text-2xl font-bold">KES {stats.totalValue.toLocaleString()}</p>
              <p className="text-gray-500">Inventory Value</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <FaEye className="text-orange-600 text-3xl mb-2" />
              <p className="text-2xl font-bold">{stats.lowStock}</p>
              <p className="text-gray-500">Low Stock Items</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <FaExclamationTriangle className="text-red-600 text-3xl mb-2" />
              <p className="text-2xl font-bold">{stats.outOfStock}</p>
              <p className="text-gray-500">Out of Stock</p>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Products ({products.length})</h2>
            {products.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No products yet. Add your first product!</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left">Image</th>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Price</th>
                      <th className="px-4 py-2 text-left">Category</th>
                      <th className="px-4 py-2 text-left">Stock</th>
                      <th className="px-4 py-2 text-left">Featured</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id} className="border-t">
                        <td className="px-4 py-2">
                          <img src={p.images[0]} alt={p.name} className="w-12 h-12 object-cover rounded" />
                        </td>
                        <td className="px-4 py-2">{p.name}</td>
                        <td className="px-4 py-2">KES {p.priceKES}</td>
                        <td className="px-4 py-2">{p.category.replace('-', ' ')}</td>
                        <td className="px-4 py-2">{p.stock}</td>
                        <td className="px-4 py-2">{p.featured ? 'Yes' : 'No'}</td>
                        <td className="px-4 py-2">
                          <button onClick={() => handleDeleteProduct(p.id)} className="text-red-600">
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

        {activeTab === 'add' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              {/* Image Upload */}
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                {imagePreview ? (
                  <div>
                    <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto mb-2" />
                    <button type="button" onClick={() => setImagePreview(null)} className="text-red-500">
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <FaImage className="text-4xl text-gray-400 mx-auto mb-2" />
                    <input type="file" id="image" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    <label htmlFor="image" className="bg-purple-600 text-white px-4 py-2 rounded cursor-pointer">
                      {uploading ? <FaSpinner className="animate-spin" /> : 'Upload Image'}
                    </label>
                  </div>
                )}
              </div>

              <input
                type="text"
                placeholder="Product Name *"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                className="w-full p-2 border rounded"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Price (KES) *"
                  value={newProduct.priceKES}
                  onChange={(e) => setNewProduct({...newProduct, priceKES: e.target.value})}
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="Stock *"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                  className="p-2 border rounded"
                  required
                />
              </div>

              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="mens-perfumes">Men's Perfumes</option>
                <option value="womens-perfumes">Women's Perfumes</option>
                <option value="unisex-perfumes">Unisex Perfumes</option>
              </select>

              <input
                type="text"
                placeholder="Short Description"
                value={newProduct.shortDescription}
                onChange={(e) => setNewProduct({...newProduct, shortDescription: e.target.value})}
                className="w-full p-2 border rounded"
              />

              <textarea
                placeholder="Full Description *"
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                rows="3"
                className="w-full p-2 border rounded"
                required
              />

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newProduct.featured}
                  onChange={(e) => setNewProduct({...newProduct, featured: e.target.checked})}
                />
                Feature on homepage
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
              >
                {loading ? <FaSpinner className="animate-spin mx-auto" /> : 'Add Product'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
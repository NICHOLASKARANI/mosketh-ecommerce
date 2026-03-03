'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FaBox, FaShoppingCart, FaUsers, FaEye, 
  FaPlus, FaEdit, FaTrash, FaUpload, FaImage, 
  FaTachometerAlt, FaSignOutAlt, FaSave, FaSpinner,
  FaChartBar, FaList, FaCog
} from 'react-icons/fa';

export default function ManagePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
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

  // Admin credentials - NOT autofilled, user must type
  const ADMIN_EMAIL = 'moskethbeautytouch@gmail.com';
  const ADMIN_PASSWORD = '@Sultan12&crazy207103';

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mosketh-backend.vercel.app';
      const res = await fetch(`${API_URL}/api/products`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setProducts(data.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      fetchProducts();
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
      alert('Please upload a JPEG or PNG image');
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
    };
    reader.readAsDataURL(file);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mosketh-backend.vercel.app';
      
      // Validate required fields
      if (!newProduct.name || !newProduct.priceKES || !newProduct.stock) {
        alert('Please fill all required fields');
        setLoading(false);
        return;
      }

      // Prepare product data
      const productData = {
        name: newProduct.name,
        priceKES: parseInt(newProduct.priceKES),
        category: newProduct.category,
        description: newProduct.description || 'No description provided',
        shortDescription: newProduct.shortDescription || newProduct.name,
        stock: parseInt(newProduct.stock),
        images: newProduct.images.length > 0 ? newProduct.images : ['https://via.placeholder.com/800x800?text=Mosketh'],
        featured: newProduct.featured || false,
        slug: newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      };

      console.log('Sending product:', productData);

      const response = await fetch(`${API_URL}/api/products`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      
      if (result.success) {
        alert('✅ Product added successfully! It will appear on the site immediately.');
        
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
        
        // Refresh products list
        await fetchProducts();
        
        // Switch to products tab to see the new product
        setActiveTab('products');
      } else {
        alert('❌ Failed to add product: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('❌ Error adding product. Check console for details.');
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
        alert('✅ Product deleted successfully');
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('❌ Error deleting product');
    }
  };

  // Login Page - No autofill, user must type credentials
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <img 
              src="/logo.png" 
              alt="Mosketh Logo" 
              className="w-20 h-20 mx-auto mb-4 rounded-full border-4 border-purple-100"
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

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Mosketh" className="w-10 h-10 rounded-full" />
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
        <div className="flex space-x-4 border-b overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 font-medium whitespace-nowrap flex items-center gap-2 ${activeTab === 'dashboard' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <FaTachometerAlt /> Dashboard
          </button>
          <button
            onClick={() => setActiveTab('add-product')}
            className={`px-4 py-2 font-medium whitespace-nowrap flex items-center gap-2 ${activeTab === 'add-product' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <FaPlus /> Add Product
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 font-medium whitespace-nowrap flex items-center gap-2 ${activeTab === 'products' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <FaList /> All Products
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Products</p>
                    <p className="text-3xl font-bold text-gray-800">{products.length}</p>
                  </div>
                  <FaBox className="text-purple-600 text-4xl opacity-50" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Categories</p>
                    <p className="text-3xl font-bold text-gray-800">7</p>
                  </div>
                  <FaChartBar className="text-green-600 text-4xl opacity-50" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Low Stock Items</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {products.filter(p => p.stock < 5).length}
                    </p>
                  </div>
                  <FaEye className="text-orange-600 text-4xl opacity-50" />
                </div>
              </div>
            </div>

            {/* Category Distribution */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Products by Category</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['mens-perfumes', 'womens-perfumes', 'unisex-perfumes', 'body-oils', 'face-creams', 'hair-products', 'gift-sets'].map(cat => (
                  <div key={cat} className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">{cat.replace('-', ' ')}</p>
                    <p className="text-xl font-bold text-purple-600">
                      {products.filter(p => p.category === cat).length}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Add Product Tab */}
        {activeTab === 'add-product' && (
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

              {/* Product Name */}
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

              {/* Price and Stock */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>

              {/* Category */}
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

              {/* Short Description */}
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

              {/* Full Description */}
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

              {/* Featured Checkbox */}
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

              {/* Submit Button */}
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

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">All Products</h2>
            
            {products.length === 0 ? (
              <div className="text-center py-12">
                <FaBox className="text-5xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No products added yet.</p>
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Featured</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4">
                          <img 
                            src={product.images?.[0] || '/logo.png'} 
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        </td>
                        <td className="px-6 py-4 font-medium">{product.name}</td>
                        <td className="px-6 py-4">KES {product.priceKES}</td>
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
                          {product.featured ? '⭐ Yes' : 'No'}
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-800"
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
      </div>
    </div>
  );
}
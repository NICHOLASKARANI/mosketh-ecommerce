'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FaBox, FaShoppingCart, FaUsers, FaEye, 
  FaPlus, FaEdit, FaTrash, FaUpload, FaImage, 
  FaTachometerAlt, FaSignOutAlt, FaSave, FaSpinner 
} from 'react-icons/fa';

export default function AdminDashboard() {
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

  // Admin credentials
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

    if (!file.type.includes('jpeg')) {
      alert('Please upload a JPEG image');
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
      
      const response = await fetch(`${API_URL}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newProduct,
          priceKES: parseInt(newProduct.priceKES),
          stock: parseInt(newProduct.stock)
        })
      });

      if (response.ok) {
        alert('Product added successfully!');
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
        fetchProducts();
      }
    } catch (error) {
      alert('Error adding product');
    } finally {
      setLoading(false);
    }
  };

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Mosketh Admin</h1>
            <p className="text-gray-600 mt-2">Sign in to manage your store</p>
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
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
          <h1 className="text-2xl font-bold text-purple-600">Mosketh Admin</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex space-x-4 border-b">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 font-medium ${activeTab === 'dashboard' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
          >
            <FaTachometerAlt className="inline mr-2" /> Dashboard
          </button>
          <button
            onClick={() => setActiveTab('add-product')}
            className={`px-4 py-2 font-medium ${activeTab === 'add-product' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
          >
            <FaPlus className="inline mr-2" /> Add Product
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 font-medium ${activeTab === 'products' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500'}`}
          >
            <FaBox className="inline mr-2" /> Products
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <FaBox className="text-purple-600 text-3xl mb-2" />
              <p className="text-2xl font-bold">{products.length}</p>
              <p className="text-gray-600">Total Products</p>
            </div>
          </div>
        )}

        {activeTab === 'add-product' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
            
            <form onSubmit={handleAddProduct} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Product Image (JPEG)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {imagePreview ? (
                    <div>
                      <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto mb-4" />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setNewProduct({...newProduct, images: []});
                        }}
                        className="text-red-500 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div>
                      <FaImage className="text-4xl text-gray-400 mx-auto mb-2" />
                      <input
                        type="file"
                        accept="image/jpeg"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="bg-purple-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-purple-700"
                      >
                        {uploading ? <FaSpinner className="animate-spin" /> : 'Choose Image'}
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                className="w-full p-3 border rounded"
                required
              />

              <input
                type="number"
                placeholder="Price (KES)"
                value={newProduct.priceKES}
                onChange={(e) => setNewProduct({...newProduct, priceKES: e.target.value})}
                className="w-full p-3 border rounded"
                required
              />

              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                className="w-full p-3 border rounded"
              >
                <option value="mens-perfumes">Men's Perfumes</option>
                <option value="womens-perfumes">Women's Perfumes</option>
                <option value="unisex-perfumes">Unisex Perfumes</option>
                <option value="body-oils">Body Oils</option>
                <option value="face-creams">Face Creams</option>
                <option value="hair-products">Hair Products</option>
              </select>

              <textarea
                placeholder="Short Description"
                value={newProduct.shortDescription}
                onChange={(e) => setNewProduct({...newProduct, shortDescription: e.target.value})}
                className="w-full p-3 border rounded"
                rows="2"
                required
              />

              <textarea
                placeholder="Full Description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                className="w-full p-3 border rounded"
                rows="4"
                required
              />

              <input
                type="number"
                placeholder="Stock Quantity"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                className="w-full p-3 border rounded"
                required
              />

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newProduct.featured}
                  onChange={(e) => setNewProduct({...newProduct, featured: e.target.checked})}
                  className="mr-2"
                />
                Feature on homepage
              </label>

              <button
                type="submit"
                disabled={loading || !newProduct.images.length}
                className="w-full bg-purple-600 text-white py-3 rounded hover:bg-purple-700 disabled:bg-gray-400"
              >
                {loading ? 'Adding...' : 'Add Product'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">Products</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2">Image</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-t">
                      <td className="px-4 py-2">
                        {p.images?.[0] && (
                          <img src={p.images[0]} alt={p.name} className="w-12 h-12 object-cover rounded" />
                        )}
                      </td>
                      <td className="px-4 py-2">{p.name}</td>
                      <td className="px-4 py-2">KES {p.priceKES}</td>
                      <td className="px-4 py-2">{p.stock}</td>
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
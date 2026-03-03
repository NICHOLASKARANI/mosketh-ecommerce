'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaBox, FaShoppingCart, FaUsers, FaEye, FaStar, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0
  });

  // Admin credentials (hashed in production)
  const ADMIN_EMAIL = 'moskethbeautytouch@gmail.com';
  const ADMIN_PASSWORD = '@Sultan12&crazy207103';

  useEffect(() => {
    // Check if already authenticated
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchStats();
    }
  }, []);

  const fetchStats = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mosketh-backend.vercel.app';
      const res = await fetch(`${API_URL}/api/admin/stats`);
      const data = await res.json();
      setStats(data.data || stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      fetchStats();
      setError('');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Mosketh Admin</h1>
            <p className="text-gray-600 mt-2">Sign in to access dashboard</p>
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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">Mosketh Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Products</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalProducts}</p>
              </div>
              <FaBox className="text-purple-600 text-4xl" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Orders</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalOrders}</p>
              </div>
              <FaShoppingCart className="text-green-600 text-4xl" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Customers</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalCustomers}</p>
              </div>
              <FaUsers className="text-blue-600 text-4xl" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Revenue (KES)</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <FaEye className="text-yellow-600 text-4xl" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Products</h2>
            <div className="space-y-3">
              <button className="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition flex items-center justify-center gap-2">
                <FaPlus /> Add New Product
              </button>
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center justify-center gap-2">
                <FaEdit /> Edit Products
              </button>
              <button className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition flex items-center justify-center gap-2">
                <FaTrash /> Delete Products
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Orders</h2>
            <div className="space-y-3">
              <button className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                View All Orders
              </button>
              <button className="w-full bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition">
                Process Orders
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Customers</h2>
            <div className="space-y-3">
              <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
                View Customers
              </button>
              <button className="w-full bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition">
                Send Newsletter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
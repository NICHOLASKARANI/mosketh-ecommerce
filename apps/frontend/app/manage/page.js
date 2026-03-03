'use client';

import React, { useState, useEffect } from 'react';

export default function ManagePage() {
  const [email, setEmail] = useState('moskethbeautytouch@gmail.com');
  const [password, setPassword] = useState('@Sultan12&crazy207103');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'mens-perfumes',
    description: '',
    stock: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const ADMIN_EMAIL = 'moskethbeautytouch@gmail.com';
  const ADMIN_PASSWORD = '@Sultan12&crazy207103';

  // Mock data for demonstration
  useEffect(() => {
    if (isLoggedIn) {
      // Sample products
      setProducts([
        { id: 1, name: 'Vulcan Feu by French Avenue', price: 4000, category: 'mens-perfumes', stock: 10, image: 'https://via.placeholder.com/100' },
        { id: 2, name: 'Ameerat Al Arab by Asdaaf', price: 2500, category: 'womens-perfumes', stock: 5, image: 'https://via.placeholder.com/100' },
        { id: 3, name: 'Oud Wood', price: 3500, category: 'unisex-perfumes', stock: 8, image: 'https://via.placeholder.com/100' },
      ]);
      
      // Sample orders
      setOrders([
        { id: 'ORD001', customer: 'John Mwangi', amount: 4000, status: 'completed', date: '2024-03-01' },
        { id: 'ORD002', customer: 'Sarah Wanjiku', amount: 2500, status: 'pending', date: '2024-03-02' },
        { id: 'ORD003', customer: 'David Omondi', amount: 7500, status: 'processing', date: '2024-03-03' },
      ]);
      
      // Sample customers
      setCustomers([
        { id: 1, name: 'John Mwangi', email: 'john@example.com', orders: 3, spent: 12000 },
        { id: 2, name: 'Sarah Wanjiku', email: 'sarah@example.com', orders: 2, spent: 5000 },
        { id: 3, name: 'David Omondi', email: 'david@example.com', orders: 5, spent: 25000 },
      ]);
    }
  }, [isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setNewProduct({...newProduct, image: reader.result});
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newId = products.length + 1;
    setProducts([...products, { ...newProduct, id: newId, price: parseInt(newProduct.price), stock: parseInt(newProduct.stock) }]);
    alert('Product added successfully!');
    setNewProduct({ name: '', price: '', category: 'mens-perfumes', description: '', stock: '', image: null });
    setImagePreview(null);
  };

  const handleDeleteProduct = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const getTotalRevenue = () => {
    return orders.reduce((sum, order) => sum + order.amount, 0);
  };

  const getProductsByCategory = (category) => {
    return products.filter(p => p.category === category).length;
  };

  if (!isLoggedIn) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '40px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}>
          <h1 style={{
            textAlign: 'center',
            color: '#333',
            marginBottom: '30px',
            fontSize: '28px',
            fontWeight: '600'
          }}>
            Mosketh Admin
          </h1>
          
          {error && (
            <div style={{
              background: '#fed7d7',
              color: '#c53030',
              padding: '12px',
              borderRadius: '10px',
              marginBottom: '20px',
              textAlign: 'center',
              fontSize: '14px',
              border: '1px solid #fc8181'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#555',
                fontWeight: '500',
                fontSize: '14px'
              }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '10px',
                  fontSize: '16px',
                  outline: 'none'
                }}
                required
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#555',
                fontWeight: '500',
                fontSize: '14px'
              }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '10px',
                  fontSize: '16px',
                  outline: 'none'
                }}
                required
              />
            </div>
            
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f0f2f5',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{
        background: 'white',
        borderRadius: '15px',
        padding: '20px 30px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div>
          <h1 style={{ color: '#667eea', fontSize: '28px', marginBottom: '5px' }}>Mosketh Admin</h1>
          <p style={{ color: '#718096', fontSize: '14px' }}>Welcome back, Admin</p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: '10px 25px',
            background: '#e53e3e',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background 0.3s'
          }}
          onMouseEnter={(e) => e.target.style.background = '#c53030'}
          onMouseLeave={(e) => e.target.style.background = '#e53e3e'}
        >
          Logout
        </button>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        background: 'white',
        borderRadius: '15px',
        padding: '10px',
        marginBottom: '20px',
        display: 'flex',
        gap: '10px',
        overflowX: 'auto',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        {['dashboard', 'products', 'add-product', 'orders', 'customers'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 25px',
              background: activeTab === tab ? '#667eea' : 'transparent',
              color: activeTab === tab ? 'white' : '#4a5568',
              border: 'none',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              textTransform: 'capitalize',
              transition: 'all 0.3s'
            }}
          >
            {tab.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div>
          {/* Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '15px',
              padding: '25px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#718096', fontSize: '14px', marginBottom: '10px' }}>Total Products</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#667eea' }}>{products.length}</p>
            </div>
            
            <div style={{
              background: 'white',
              borderRadius: '15px',
              padding: '25px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#718096', fontSize: '14px', marginBottom: '10px' }}>Total Orders</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#48bb78' }}>{orders.length}</p>
            </div>
            
            <div style={{
              background: 'white',
              borderRadius: '15px',
              padding: '25px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#718096', fontSize: '14px', marginBottom: '10px' }}>Total Customers</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#4299e1' }}>{customers.length}</p>
            </div>
            
            <div style={{
              background: 'white',
              borderRadius: '15px',
              padding: '25px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#718096', fontSize: '14px', marginBottom: '10px' }}>Total Revenue</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#ed8936' }}>KES {getTotalRevenue().toLocaleString()}</p>
            </div>
          </div>

          {/* Category Distribution */}
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '25px',
            marginBottom: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Products by Category</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px'
            }}>
              <div style={{ padding: '15px', background: '#f7fafc', borderRadius: '10px' }}>
                <p style={{ color: '#4a5568' }}>Men's Perfumes</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>{getProductsByCategory('mens-perfumes')}</p>
              </div>
              <div style={{ padding: '15px', background: '#f7fafc', borderRadius: '10px' }}>
                <p style={{ color: '#4a5568' }}>Women's Perfumes</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>{getProductsByCategory('womens-perfumes')}</p>
              </div>
              <div style={{ padding: '15px', background: '#f7fafc', borderRadius: '10px' }}>
                <p style={{ color: '#4a5568' }}>Unisex Perfumes</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>{getProductsByCategory('unisex-perfumes')}</p>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '25px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Recent Orders</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f7fafc' }}>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#4a5568' }}>Order ID</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#4a5568' }}>Customer</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#4a5568' }}>Amount</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#4a5568' }}>Status</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#4a5568' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '12px' }}>{order.id}</td>
                      <td style={{ padding: '12px' }}>{order.customer}</td>
                      <td style={{ padding: '12px' }}>KES {order.amount}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '5px',
                          fontSize: '12px',
                          background: order.status === 'completed' ? '#c6f6d5' : 
                                     order.status === 'pending' ? '#fed7d7' : '#feebc8',
                          color: order.status === 'completed' ? '#22543d' :
                                 order.status === 'pending' ? '#c53030' : '#744210'
                        }}>
                          {order.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px' }}>{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '25px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>All Products</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f7fafc' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Image</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Price</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Category</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Stock</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px' }}>
                      <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', borderRadius: '5px', objectFit: 'cover' }} />
                    </td>
                    <td style={{ padding: '12px' }}>{product.name}</td>
                    <td style={{ padding: '12px' }}>KES {product.price}</td>
                    <td style={{ padding: '12px' }}>{product.category.replace('-', ' ')}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '5px',
                        fontSize: '12px',
                        background: product.stock > 5 ? '#c6f6d5' : '#fed7d7',
                        color: product.stock > 5 ? '#22543d' : '#c53030'
                      }}>
                        {product.stock} units
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        style={{
                          padding: '6px 12px',
                          background: '#e53e3e',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          marginRight: '5px'
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Product Tab */}
      {activeTab === 'add-product' && (
        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '25px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Add New Product</h2>
          
          <form onSubmit={handleAddProduct}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
              marginBottom: '20px'
            }}>
              {/* Image Upload */}
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Product Image (JPEG)</label>
                <div style={{
                  border: '2px dashed #cbd5e0',
                  borderRadius: '10px',
                  padding: '20px',
                  textAlign: 'center',
                  background: '#f7fafc'
                }}>
                  {imagePreview ? (
                    <div>
                      <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '10px' }} />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setNewProduct({...newProduct, image: null});
                        }}
                        style={{
                          padding: '5px 10px',
                          background: '#e53e3e',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer'
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        accept="image/jpeg"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        style={{
                          display: 'inline-block',
                          padding: '10px 20px',
                          background: '#667eea',
                          color: 'white',
                          borderRadius: '5px',
                          cursor: 'pointer'
                        }}
                      >
                        {isUploading ? 'Uploading...' : 'Choose Image'}
                      </label>
                      <p style={{ marginTop: '10px', color: '#718096', fontSize: '12px' }}>800x800 pixels recommended</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Details */}
              <div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Product Name</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #cbd5e0',
                      borderRadius: '5px'
                    }}
                    required
                  />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Price (KES)</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #cbd5e0',
                      borderRadius: '5px'
                    }}
                    required
                  />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #cbd5e0',
                      borderRadius: '5px'
                    }}
                  >
                    <option value="mens-perfumes">Men's Perfumes</option>
                    <option value="womens-perfumes">Women's Perfumes</option>
                    <option value="unisex-perfumes">Unisex Perfumes</option>
                  </select>
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Description</label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #cbd5e0',
                      borderRadius: '5px',
                      minHeight: '100px'
                    }}
                  />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Stock Quantity</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #cbd5e0',
                      borderRadius: '5px'
                    }}
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '15px',
                background: '#48bb78',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Add Product
            </button>
          </form>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '25px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>All Orders</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f7fafc' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Order ID</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Customer</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Amount</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Date</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px' }}>{order.id}</td>
                    <td style={{ padding: '12px' }}>{order.customer}</td>
                    <td style={{ padding: '12px' }}>KES {order.amount}</td>
                    <td style={{ padding: '12px' }}>
                      <select
                        value={order.status}
                        onChange={(e) => {
                          const updatedOrders = orders.map(o => 
                            o.id === order.id ? {...o, status: e.target.value} : o
                          );
                          setOrders(updatedOrders);
                        }}
                        style={{
                          padding: '4px 8px',
                          borderRadius: '5px',
                          border: '1px solid #cbd5e0'
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td style={{ padding: '12px' }}>{order.date}</td>
                    <td style={{ padding: '12px' }}>
                      <button
                        onClick={() => alert(`View details for order ${order.id}`)}
                        style={{
                          padding: '6px 12px',
                          background: '#4299e1',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer'
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Customers Tab */}
      {activeTab === 'customers' && (
        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '25px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Customers</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f7fafc' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Orders</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Total Spent</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px' }}>{customer.name}</td>
                    <td style={{ padding: '12px' }}>{customer.email}</td>
                    <td style={{ padding: '12px' }}>{customer.orders}</td>
                    <td style={{ padding: '12px' }}>KES {customer.spent}</td>
                    <td style={{ padding: '12px' }}>
                      <button
                        onClick={() => alert(`View details for ${customer.name}`)}
                        style={{
                          padding: '6px 12px',
                          background: '#4299e1',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer'
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

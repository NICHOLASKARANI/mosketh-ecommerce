'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { productAPI } from '@/lib/productAPI';
import { FaShoppingCart, FaTruck, FaShieldAlt, FaUndo } from 'react-icons/fa';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const data = await productAPI.getById(id);
      setProduct(data);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product._id,
      name: product.name,
      price: product.priceKES,
      image: product.images?.[0],
      quantity: quantity
    };
    
    const existingCart = JSON.parse(localStorage.getItem('mosketh_cart') || '[]');
    const existingItemIndex = existingCart.findIndex(item => item.id === product._id);
    
    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }
    
    localStorage.setItem('mosketh_cart', JSON.stringify(existingCart));
    window.dispatchEvent(new Event('cartUpdated'));
    alert(`${product.name} added to cart!`);
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

  if (!product) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">Product not found</h1>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-4">
              <img
                src={product.images?.[selectedImage] || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600'}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            {product.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`border-2 rounded-lg overflow-hidden ${
                      selectedImage === index ? 'border-purple-600' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-20 object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.shortDescription}</p>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-bold text-purple-600">
                KES {product.priceKES?.toLocaleString()}
              </span>
              {product.stock > 0 ? (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  In Stock
                </span>
              ) : (
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                  Out of Stock
                </span>
              )}
            </div>

            <div className="border-t border-b py-6 my-6">
              <h3 className="font-semibold text-lg mb-4">Description</h3>
              <p className="text-gray-600 whitespace-pre-line">{product.description}</p>
            </div>

            {product.stock > 0 && (
              <div className="flex gap-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            )}

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <FaTruck className="text-2xl text-purple-600 mx-auto mb-2" />
                <p className="text-sm">Free Delivery</p>
              </div>
              <div className="text-center">
                <FaShieldAlt className="text-2xl text-purple-600 mx-auto mb-2" />
                <p className="text-sm">100% Authentic</p>
              </div>
              <div className="text-center">
                <FaUndo className="text-2xl text-purple-600 mx-auto mb-2" />
                <p className="text-sm">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
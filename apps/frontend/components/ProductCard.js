import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

export default function ProductCard({ product }) {
  // Handle MongoDB _id vs id
  const productId = product._id || product.id;
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const cartItem = {
      id: productId,
      name: product.name,
      price: product.priceKES,
      image: product.images?.[0] || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=200',
      quantity: 1
    };
    
    // Get existing cart
    const existingCart = JSON.parse(localStorage.getItem('mosketh_cart') || '[]');
    
    // Check if item exists
    const existingItemIndex = existingCart.findIndex(item => item.id === productId);
    
    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push(cartItem);
    }
    
    localStorage.setItem('mosketh_cart', JSON.stringify(existingCart));
    
    // Dispatch event for cart update
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Show feedback
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition group relative">
      <Link href={`/product/${productId}`}>
        <div className="relative h-64 overflow-hidden">
          <Image
            src={product.images?.[0] || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
          />
          {product.stock <= 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">Out of Stock</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.shortDescription}</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-purple-600">KES {product.priceKES?.toLocaleString()}</span>
            {product.stock > 0 && (
              <button
                onClick={handleAddToCart}
                className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition transform hover:scale-105"
                title="Add to Cart"
              >
                <FaShoppingCart />
              </button>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

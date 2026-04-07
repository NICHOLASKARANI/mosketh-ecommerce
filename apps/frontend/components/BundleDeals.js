'use client';

import { useState, useEffect } from 'react';
import { FaShoppingCart, FaCheck } from 'react-icons/fa';

const BUNDLE_DEALS = [
  {
    id: 'bundle1',
    name: 'Perfume Duo Set',
    products: ['YARA Cherry Body Mist', 'Marshmallow Blush'],
    originalPrice: 6000,
    bundlePrice: 5000,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400'
  },
  {
    id: 'bundle2',
    name: 'Skincare Essentials',
    products: ['Dr. Rashel Sunscreen', 'Fruit of the Wokali Face Cream'],
    originalPrice: 1000,
    bundlePrice: 800,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400'
  },
  {
    id: 'bundle3',
    name: 'Body Care Collection',
    products: ['Roushun Rice Shower Gel', 'Dr. Meinaier Lavender Scrub', 'Molato Body Cream'],
    originalPrice: 2800,
    bundlePrice: 2200,
    discount: 21,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400'
  }
];

export default function BundleDeals() {
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);

  const addBundleToCart = (bundle) => {
    // This would need actual product IDs from your database
    // For now, save bundle info to localStorage
    const bundles = JSON.parse(localStorage.getItem('cart_bundles') || '[]');
    bundles.push({
      ...bundle,
      addedAt: new Date().toISOString()
    });
    localStorage.setItem('cart_bundles', JSON.stringify(bundles));
    
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
    
    // Dispatch cart update event
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">🔥 Bundle & Save!</h2>
        <p className="text-gray-600">Buy together and save up to 20%</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BUNDLE_DEALS.map(bundle => (
          <div key={bundle.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
            <div className="relative h-48">
              <img src={bundle.image} alt={bundle.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                Save {bundle.discount}%
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{bundle.name}</h3>
              <p className="text-sm text-gray-600 mb-2">Includes:</p>
              <ul className="text-xs text-gray-500 mb-3 space-y-1">
                {bundle.products.map((product, idx) => (
                  <li key={idx}>• {product}</li>
                ))}
              </ul>
              
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-2xl font-bold text-purple-600">KES {bundle.bundlePrice}</span>
                  <span className="text-sm text-gray-400 line-through ml-2">KES {bundle.originalPrice}</span>
                </div>
                <span className="text-green-600 font-semibold">-{bundle.discount}%</span>
              </div>
              
              <button
                onClick={() => addBundleToCart(bundle)}
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2"
              >
                <FaShoppingCart /> Add Bundle to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {addedToCart && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in z-50">
          <FaCheck className="inline mr-2" /> Bundle added to cart!
        </div>
      )}
    </div>
  );
}

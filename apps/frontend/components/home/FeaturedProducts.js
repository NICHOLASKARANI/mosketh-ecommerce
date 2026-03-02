import React from 'react';
import Link from 'next/link';

export default function FeaturedProducts({ products }) {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Featured Products
        </h2>
        <p className="mt-4 text-lg text-gray-500">
          Our most popular fragrances loved by customers
        </p>
        
        <div className="mt-12 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-lg overflow-hidden group-hover:opacity-75">
                <img
                  src={product.images?.[0] || '/placeholder.jpg'}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/product/${product.slug}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.shortDescription}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">KES {product.priceKES}</p>
              </div>
              <button className="mt-2 w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            href="/products" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
          >
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
}
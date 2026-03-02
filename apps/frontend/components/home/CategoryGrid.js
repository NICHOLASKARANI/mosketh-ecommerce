import React from 'react';
import Link from 'next/link';

export default function CategoryGrid({ categories }) {
  const defaultCategories = [
    { id: 1, name: "Men's Perfumes", slug: 'mens-perfumes', image: '/category-men.jpg' },
    { id: 2, name: "Women's Perfumes", slug: 'womens-perfumes', image: '/category-women.jpg' },
    { id: 3, name: 'Body Mists', slug: 'body-mists', image: '/category-mists.jpg' },
    { id: 4, name: 'Gift Sets', slug: 'gift-sets', image: '/category-gifts.jpg' },
  ];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Shop by Category
        </h2>
        <p className="mt-4 text-lg text-gray-500">
          Find your perfect fragrance by category
        </p>
        
        <div className="mt-12 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayCategories.map((category) => (
            <Link key={category.id} href={`/category/${category.slug}`} className="group">
              <div className="relative rounded-lg overflow-hidden">
                <div className="relative w-full h-80">
                  <div className="absolute inset-0 bg-gray-900 opacity-30 group-hover:opacity-20 transition"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                    <p className="mt-2 text-sm text-white">Shop Now →</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
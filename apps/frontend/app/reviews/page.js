'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { FaStar, FaStarHalf, FaQuoteLeft, FaFilter } from 'react-icons/fa';

const allReviews = [
  {
    id: 1,
    name: 'John Mwangi',
    rating: 5,
    comment: 'Amazing quality perfumes! Fast delivery and great customer service. Will definitely buy again.',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    date: '2024-01-15',
    product: 'Vulcan Feu by French Avenue'
  },
  {
    id: 2,
    name: 'Sarah Wanjiku',
    rating: 5,
    comment: 'I love my new perfume! The scent lasts all day and the price was very reasonable.',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    date: '2024-01-10',
    product: 'Ameerat Al Arab by Asdaaf'
  },
  {
    id: 3,
    name: 'David Omondi',
    rating: 4,
    comment: 'Great selection of fragrances. The M-Pesa payment was seamless and easy.',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    date: '2024-01-05',
    product: 'Oud Wood'
  },
  {
    id: 4,
    name: 'Mary Akinyi',
    rating: 5,
    comment: 'The body oils are incredible! My skin feels so soft and smells amazing.',
    image: 'https://randomuser.me/api/portraits/women/4.jpg',
    date: '2024-01-20',
    product: 'Lavender Body Oil'
  },
  {
    id: 5,
    name: 'James Kariuki',
    rating: 5,
    comment: 'Best place for authentic perfumes in Kenya. The customer service is top-notch!',
    image: 'https://randomuser.me/api/portraits/men/5.jpg',
    date: '2024-01-18',
    product: 'Dior Sauvage'
  },
  {
    id: 6,
    name: 'Grace Nduta',
    rating: 5,
    comment: 'I ordered a gift set for my wife and she absolutely loved it! Will definitely order again.',
    image: 'https://randomuser.me/api/portraits/women/6.jpg',
    date: '2024-01-12',
    product: 'Luxury Gift Set'
  },
  {
    id: 7,
    name: 'Peter Ochieng',
    rating: 4,
    comment: 'Great prices and fast delivery. The face creams are amazing!',
    image: 'https://randomuser.me/api/portraits/men/7.jpg',
    date: '2024-01-08',
    product: 'Vitamin C Face Cream'
  },
  {
    id: 8,
    name: 'Lucy Wambui',
    rating: 5,
    comment: 'The unisex perfumes are perfect. My whole family loves them!',
    image: 'https://randomuser.me/api/portraits/women/8.jpg',
    date: '2024-01-03',
    product: 'Unisex Oud'
  },
  {
    id: 9,
    name: 'Daniel Mutua',
    rating: 5,
    comment: 'Excellent service and genuine products. Highly recommended!',
    image: 'https://randomuser.me/api/portraits/men/9.jpg',
    date: '2023-12-28',
    product: 'Bleu de Chanel'
  },
  {
    id: 10,
    name: 'Esther Njeri',
    rating: 5,
    comment: 'The hair products have transformed my hair. Thank you Mosketh!',
    image: 'https://randomuser.me/api/portraits/women/10.jpg',
    date: '2023-12-20',
    product: 'Argan Oil Hair Mask'
  },
  {
    id: 11,
    name: 'Michael Odhiambo',
    rating: 5,
    comment: 'Fast delivery and great communication. The perfume was exactly as described.',
    image: 'https://randomuser.me/api/portraits/men/11.jpg',
    date: '2023-12-15',
    product: 'Creed Aventus'
  },
  {
    id: 12,
    name: 'Jane Wanjiru',
    rating: 5,
    comment: 'Ive been looking for this perfume everywhere! Thank you Mosketh!',
    image: 'https://randomuser.me/api/portraits/women/12.jpg',
    date: '2023-12-10',
    product: 'Carolina Herrera Good Girl'
  }
];

export default function ReviewsPage() {
  const [filterRating, setFilterRating] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filteredReviews = allReviews.filter(r => 
    filterRating === 'all' || r.rating === parseInt(filterRating)
  );

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
    if (sortBy === 'highest') return b.rating - a.rating;
    if (sortBy === 'lowest') return a.rating - b.rating;
    return 0;
  });

  const averageRating = allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length;
  const totalReviews = allReviews.length;
  const ratingCounts = {
    5: allReviews.filter(r => r.rating === 5).length,
    4: allReviews.filter(r => r.rating === 4).length,
    3: allReviews.filter(r => r.rating === 3).length,
    2: allReviews.filter(r => r.rating === 2).length,
    1: allReviews.filter(r => r.rating === 1).length,
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i - 0.5 === rating) {
        stars.push(<FaStarHalf key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaStar key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Customer Reviews</h1>
          <p className="text-xl opacity-90">What our customers say about us</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Rating Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Average Rating */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold mb-4">Overall Rating</h2>
              <div className="flex items-center justify-center md:justify-start gap-4">
                <span className="text-5xl font-bold text-purple-600">{averageRating.toFixed(1)}</span>
                <div>
                  <div className="flex text-2xl">
                    {renderStars(Math.round(averageRating))}
                  </div>
                  <p className="text-gray-500 mt-1">Based on {totalReviews} reviews</p>
                </div>
              </div>
            </div>

            {/* Rating Breakdown */}
            <div>
              <h3 className="font-semibold mb-3">Rating Breakdown</h3>
              {[5,4,3,2,1].map(rating => (
                <div key={rating} className="flex items-center gap-3 mb-2">
                  <span className="text-sm w-12">{rating} stars</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-400 rounded-full"
                      style={{ width: `${(ratingCounts[rating] / totalReviews) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-500 w-12">{ratingCounts[rating]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-400" />
              <span className="font-medium">Filter:</span>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setFilterRating('all')}
                className={`px-4 py-2 rounded-lg transition ${
                  filterRating === 'all' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Reviews
              </button>
              {[5,4,3,2,1].map(rating => (
                <button
                  key={rating}
                  onClick={() => setFilterRating(rating.toString())}
                  className={`px-4 py-2 rounded-lg flex items-center gap-1 transition ${
                    filterRating === rating.toString()
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {rating} <FaStar className="text-yellow-400" />
                </button>
              ))}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl shadow-lg p-6 relative hover:shadow-xl transition">
              <FaQuoteLeft className="absolute top-4 right-4 text-gray-100 text-4xl" />
              
              <div className="flex items-center mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-purple-100"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{review.name}</h3>
                  <p className="text-sm text-gray-500">{review.product}</p>
                </div>
              </div>

              <div className="flex mb-3">
                {renderStars(review.rating)}
              </div>

              <p className="text-gray-600 italic mb-4">"{review.comment}"</p>

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">
                  {new Date(review.date).toLocaleDateString('en-KE', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span className="text-purple-600 font-semibold flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Verified Purchase
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Write Review CTA */}
        <div className="text-center mt-12">
          <Link 
            href="/contact" 
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition transform hover:scale-105"
          >
            Write a Review
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
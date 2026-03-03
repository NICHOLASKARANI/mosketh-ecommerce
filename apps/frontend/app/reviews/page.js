'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { FaStar, FaStarHalf, FaQuoteLeft } from 'react-icons/fa';

export default function ReviewsPage() {
  const [filter, setFilter] = useState('all');

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
      product: 'Ameerat Al Arab'
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

  const filteredReviews = filter === 'all' ? allReviews : allReviews.filter(r => r.rating === parseInt(filter));

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
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Customer Reviews</h1>

        {/* Filter Bar */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full ${filter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition`}
          >
            All Reviews
          </button>
          {[5,4,3,2,1].map((rating) => (
            <button
              key={rating}
              onClick={() => setFilter(rating.toString())}
              className={`px-4 py-2 rounded-full flex items-center gap-1 ${filter === rating.toString() ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition`}
            >
              {rating} <FaStar className="text-yellow-400" />
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <div key={review.id} className="bg-gray-50 rounded-xl p-6 shadow-lg relative">
              <FaQuoteLeft className="absolute top-4 right-4 text-gray-200 text-4xl" />
              
              <div className="flex items-center mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{review.name}</h3>
                  <p className="text-sm text-gray-500">{review.product}</p>
                </div>
              </div>

              <div className="flex mb-3">
                {renderStars(review.rating)}
              </div>

              <p className="text-gray-600 italic">{review.comment}</p>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-400">
                  {new Date(review.date).toLocaleDateString('en-KE', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span className="text-sm text-purple-600 font-semibold">
                  Verified Purchase ✓
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No reviews found for this rating.</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

export default function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    // Load reviews from localStorage (would be from API in production)
    const savedReviews = localStorage.getItem(`reviews_${productId}`);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, [productId]);

  const submitReview = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    const newReview = {
      id: Date.now(),
      name: customerName || 'Anonymous Customer',
      rating,
      comment,
      date: new Date().toISOString()
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${productId}`, JSON.stringify(updatedReviews));
    
    // Reset form
    setRating(0);
    setComment('');
    setCustomerName('');
    alert('Thank you for your review!');
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="mt-8 border-t pt-8">
      <h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
        <div>
          <div className="flex gap-1">
            {[1,2,3,4,5].map((star) => (
              <FaStar key={star} className={`${star <= averageRating ? 'text-yellow-400' : 'text-gray-300'}`} />
            ))}
          </div>
          <p className="text-sm text-gray-500">{reviews.length} reviews</p>
        </div>
      </div>

      <form onSubmit={submitReview} className="bg-gray-50 rounded-lg p-6 mb-8">
        <h4 className="font-semibold mb-4">Write a Review</h4>
        
        <div className="mb-4">
          <label className="block text-sm mb-2">Your Rating</label>
          <div className="flex gap-2">
            {[1,2,3,4,5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none"
              >
                {(hoverRating || rating) >= star ? (
                  <FaStar className="text-yellow-400 text-2xl" />
                ) : (
                  <FaStar className="text-gray-300 text-2xl" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2">Your Name (Optional)</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Anonymous Customer"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2">Your Review</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Share your experience with this product..."
          />
        </div>

        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Submit Review
        </button>
      </form>

      <div className="space-y-4">
        {reviews.map(review => (
          <div key={review.id} className="border-b pb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex gap-1">
                {[1,2,3,4,5].map((star) => (
                  <FaStar key={star} className={star <= review.rating ? 'text-yellow-400' : 'text-gray-300'} />
                ))}
              </div>
              <span className="font-semibold">{review.name}</span>
              <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

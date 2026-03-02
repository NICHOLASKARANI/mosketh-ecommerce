import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaStarHalf, FaQuoteLeft } from 'react-icons/fa';

export default function TestimonialsSection({ testimonials = [] }) {
  // Default testimonials if none provided
  const defaultTestimonials = [
    {
      id: 1,
      name: 'John Mwangi',
      rating: 5,
      comment: 'Amazing quality perfumes! Fast delivery and great customer service. Will definitely buy again.',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      date: '2024-01-15'
    },
    {
      id: 2,
      name: 'Sarah Wanjiku',
      rating: 5,
      comment: 'I love my new perfume! The scent lasts all day and the price was very reasonable.',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      date: '2024-01-10'
    },
    {
      id: 3,
      name: 'David Omondi',
      rating: 4,
      comment: 'Great selection of fragrances. The M-Pesa payment was seamless and easy.',
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      date: '2024-01-05'
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Join thousands of happy customers who trust Mosketh for their fragrance needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-gray-50 rounded-xl p-6 shadow-lg relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <FaQuoteLeft className="absolute top-4 right-4 text-gray-200 text-4xl" />
              
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <div className="flex text-sm text-gray-500">
                    {new Date(testimonial.date).toLocaleDateString('en-KE', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>

              <div className="flex mb-3">
                {renderStars(testimonial.rating)}
              </div>

              <p className="text-gray-600 italic">{testimonial.comment}</p>

              <div className="mt-4 text-sm text-purple-600 font-semibold">
                Verified Purchase ✓
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/reviews"
            className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Read All Reviews
          </a>
        </div>
      </div>
    </section>
  );
}

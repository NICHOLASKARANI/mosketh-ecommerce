'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaHeart, FaComment } from 'react-icons/fa';

export default function InstagramFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate Instagram API fetch
    // In production, use Instagram Graph API
    const fetchInstagramPosts = async () => {
      try {
        // Mock data - replace with actual Instagram API
        const mockPosts = [
          {
            id: 1,
            imageUrl: 'https://res.cloudinary.com/dycdn1xjt/image/upload/v1772115198/mosketh/products/adkdqzcs07sxpkl8t49y.jpg',
            caption: 'New arrival! Vulcan Feu by French Avenue 🔥',
            likes: 234,
            comments: 45,
            permalink: 'https://instagram.com/p/example1'
          },
          {
            id: 2,
            imageUrl: 'https://res.cloudinary.com/dycdn1xjt/image/upload/v1772114865/mosketh/products/b3yer9muc2rbs2tbqdmb.jpg',
            caption: 'Ameerat Al Arab - Arabian elegance 🇸🇦',
            likes: 567,
            comments: 89,
            permalink: 'https://instagram.com/p/example2'
          },
          {
            id: 3,
            imageUrl: 'https://res.cloudinary.com/dycdn1xjt/image/upload/v1772114400/mosketh/products/l8qczfzqeoxib13zlniu.jpg',
            caption: 'Perfect for evening occasions ✨',
            likes: 345,
            comments: 23,
            permalink: 'https://instagram.com/p/example3'
          },
          {
            id: 4,
            imageUrl: 'https://res.cloudinary.com/dycdn1xjt/image/upload/v1772115198/mosketh/products/adkdqzcs07sxpkl8t49y.jpg',
            caption: 'Get yours today at Mosketh! 🇰🇪',
            likes: 789,
            comments: 156,
            permalink: 'https://instagram.com/p/example4'
          }
        ];
        setPosts(mockPosts);
      } catch (error) {
        console.error('Error fetching Instagram posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramPosts();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FaInstagram className="w-8 h-8 text-pink-600" />
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Follow Us on Instagram
            </h2>
          </div>
          <p className="text-lg text-gray-500">
            @moskethperfumes • Tag us to get featured
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {posts.map((post, index) => (
              <motion.a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={post.imageUrl}
                  alt={post.caption}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="flex items-center justify-center gap-4 mb-2">
                      <span className="flex items-center gap-1">
                        <FaHeart /> {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaComment /> {post.comments}
                      </span>
                    </div>
                    <p className="text-sm max-w-[200px] line-clamp-2">{post.caption}</p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <a
            href="https://instagram.com/moskethperfumes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            <FaInstagram />
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
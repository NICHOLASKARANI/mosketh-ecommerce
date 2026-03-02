'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaWhatsapp, 
  FaFacebookF, 
  FaInstagram, 
  FaTiktok, 
  FaTelegramPlane,
  FaYoutube,
  FaTwitter,
  FaShareAlt,
  FaTimes 
} from 'react-icons/fa';

const socialPlatforms = [
  {
    name: 'WhatsApp',
    icon: FaWhatsapp,
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-600',
    url: 'https://wa.me/254742783907?text=Hi%20Mosketh%2C%20I%27m%20interested%20in%20your%20perfumes',
    message: 'Chat with us on WhatsApp'
  },
  {
    name: 'Instagram',
    icon: FaInstagram,
    color: 'bg-pink-600',
    hoverColor: 'hover:bg-pink-700',
    url: 'https://instagram.com/moskethperfumes',
    message: 'Follow us on Instagram'
  },
  {
    name: 'Facebook',
    icon: FaFacebookF,
    color: 'bg-blue-600',
    hoverColor: 'hover:bg-blue-700',
    url: 'https://facebook.com/moskethperfumes',
    message: 'Like us on Facebook'
  },
  {
    name: 'TikTok',
    icon: FaTiktok,
    color: 'bg-black',
    hoverColor: 'hover:bg-gray-800',
    url: 'https://tiktok.com/@moskethperfumes',
    message: 'Follow us on TikTok'
  },
  {
    name: 'Telegram',
    icon: FaTelegramPlane,
    color: 'bg-blue-400',
    hoverColor: 'hover:bg-blue-500',
    url: 'https://t.me/moskethperfumes',
    message: 'Join our Telegram channel'
  },
  {
    name: 'YouTube',
    icon: FaYoutube,
    color: 'bg-red-600',
    hoverColor: 'hover:bg-red-700',
    url: 'https://youtube.com/@moskethperfumes',
    message: 'Subscribe to our YouTube'
  },
  {
    name: 'Twitter',
    icon: FaTwitter,
    color: 'bg-blue-400',
    hoverColor: 'hover:bg-blue-500',
    url: 'https://twitter.com/moskethperfumes',
    message: 'Follow us on Twitter'
  }
];

export default function FloatingSocialWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hoveredPlatform, setHoveredPlatform] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (scrollPosition > 300 && !isOpen) {
      setIsOpen(true);
    }
  }, [scrollPosition]);

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-3"
          >
            {socialPlatforms.map((platform, index) => (
              <motion.a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative group ${platform.color} ${platform.hoverColor} text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl`}
                onMouseEnter={() => setHoveredPlatform(platform.name)}
                onMouseLeave={() => setHoveredPlatform(null)}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <platform.icon className="w-5 h-5" />
                <AnimatePresence>
                  {hoveredPlatform === platform.name && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="absolute right-full mr-2 px-2 py-1 bg-gray-800 text-white text-sm rounded whitespace-nowrap"
                    >
                      {platform.message}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`mt-3 ${isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-600 hover:bg-purple-700'} text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 180 : 0 }}
      >
        {isOpen ? <FaTimes className="w-5 h-5" /> : <FaShareAlt className="w-5 h-5" />}
      </motion.button>
    </div>
  );
}
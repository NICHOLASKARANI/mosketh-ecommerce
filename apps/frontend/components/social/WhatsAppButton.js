'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp, FaTimes, FaShoppingCart, FaHeadset } from 'react-icons/fa'
import { useCartStore } from '@/store/cartStore'

const WHATSAPP_NUMBER = '254742783907'
const WHATSAPP_MESSAGE = 'Hello MosKeth Perfumes & Beauty! I would like to:'

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const { items, total } = useCartStore()

  // Smooth floating animation
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleChat = (type) => {
    let message = ''
    
    switch(type) {
      case 'order':
        if (items.length > 0) {
          message = `🛍️ *NEW ORDER - MosKeth Perfumes & Beauty*\n\n`
          message += `📍 *Store:* Shop F5, Superior Centre, Kimathi Street, Nairobi CBD\n\n`
          message += `*ORDER SUMMARY:*\n`
          
          items.forEach((item, index) => {
            message += `${index + 1}. ${item.name} x${item.quantity} = KSh ${item.priceKES * item.quantity}\n`
          })
          
          message += `\n💰 *TOTAL: KSh ${total}*\n`
          message += `🚚 *Delivery Address:* \n`
          message += `📞 *Phone:* \n\n`
          message += `Pay via M-Pesa Paybill 0742783907`
        } else {
          message = `👋 Hello MosKeth Perfumes & Beauty! I would like to place an order.`
        }
        break
      case 'help':
        message = `👋 Hello MosKeth Perfumes & Beauty! I need help with:\n\n🔹 Product inquiry\n🔹 Order status\n🔹 Payment issue\n🔹 Delivery information\n🔹 Return/Exchange\n🔹 Other`
        break
      case 'inquiry':
        message = `👋 Hello MosKeth Perfumes & Beauty! I have a question about your products.`
        break
      default:
        message = `👋 Hello MosKeth Perfumes & Beauty! I would like to chat.`
    }
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank')
    setIsOpen(false)
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ 
          scale: 1,
          y: [0, -10, 0],
        }}
        transition={{ 
          scale: { duration: 0.3 },
          y: { 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        whileHover={{ scale: 1.1 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors group"
      >
        <FaWhatsapp className="w-6 h-6" />
        
        {/* Pulse Animation */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25"></span>

        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-sm py-2 px-3 rounded-lg whitespace-nowrap"
            >
              Chat with us on WhatsApp 📱
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Quick Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed bottom-24 right-6 z-50 bg-white rounded-2xl shadow-2xl w-96 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FaWhatsapp className="w-6 h-6" />
                    <div>
                      <h3 className="font-semibold">WhatsApp Chat</h3>
                      <p className="text-xs text-green-100">0742783907</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-gray-600 mb-4 text-center">
                  👋 Hi! How can we help you today?
                </p>

                {/* Social Media Info */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">📱 Follow us on social media:</p>
                  <div className="flex items-center justify-around">
                    <a href="https://instagram.com/moskethperfumes" target="_blank" rel="noopener" className="text-center group">
                      <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                        <span className="text-white text-xl">📷</span>
                      </div>
                      <span className="text-xs text-gray-600 mt-1 block">@moskethperfumes</span>
                    </a>
                    <a href="https://tiktok.com/@moskethbeautytouch" target="_blank" rel="noopener" className="text-center group">
                      <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                        <span className="text-white text-xl">🎵</span>
                      </div>
                      <span className="text-xs text-gray-600 mt-1 block">@moskethbeautytouch</span>
                    </a>
                    <a href="https://facebook.com/moskethbeautytouch" target="_blank" rel="noopener" className="text-center group">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                        <span className="text-white text-xl">f</span>
                      </div>
                      <span className="text-xs text-gray-600 mt-1 block">Mos Keth Oketch</span>
                    </a>
                  </div>
                </div>

                {/* Store Info */}
                <div className="bg-primary-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">📍 Store:</span> Shop F5, Superior Centre, Kimathi Street, Nairobi CBD
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    <span className="font-semibold">💰 M-Pesa Paybill:</span> 0742783907
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="space-y-2">
                  <button
                    onClick={() => handleChat('order')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <FaShoppingCart className="w-5 h-5" />
                    {items.length > 0 ? 'Order My Cart' : 'Place New Order'}
                  </button>

                  <button
                    onClick={() => handleChat('inquiry')}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <FaHeadset className="w-5 h-5" />
                    Product Inquiry
                  </button>

                  <button
                    onClick={() => handleChat('help')}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Need Help?
                  </button>
                </div>

                {/* Operating Hours */}
                <div className="mt-4 text-xs text-gray-500 text-center border-t pt-3">
                  <p>📞 Response time: Within 5 minutes</p>
                  <p className="mt-1">🕒 Mon-Sat: 9am-8pm | Sun: 11am-5pm</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
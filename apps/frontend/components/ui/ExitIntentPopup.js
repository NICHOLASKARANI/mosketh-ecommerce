'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

export default function ExitIntentPopup() {
  const [showPopup, setShowPopup] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY < 10 && !localStorage.getItem('popupShown')) {
        setShowPopup(true)
        localStorage.setItem('popupShown', 'true')
      }
    }
    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast.success('Thanks for subscribing! Check your email for 10% off.')
    setShowPopup(false)
    setLoading(false)
  }

  return (
    <AnimatePresence>
      {showPopup && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPopup(false)}
            className="fixed inset-0 bg-black/50 z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-white rounded-2xl shadow-2xl p-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Wait! 🎁</h3>
            <p className="text-gray-600 mb-4">Get 10% off your first order!</p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border rounded-lg mb-3"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold"
              >
                {loading ? 'Subscribing...' : 'Get 10% Off'}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const mockPurchases = [
  { name: 'John from Nairobi', product: 'Dior Sauvage', time: '2 min ago' },
  { name: 'Mary from Mombasa', product: 'Chanel No.5', time: '5 min ago' },
  { name: 'Peter from Kisumu', product: 'Bio-Oil', time: '12 min ago' },
]

export default function LivePurchaseNotification() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % mockPurchases.length)
        setVisible(true)
      }, 500)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-24 left-4 z-40 max-w-sm">
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={current}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white rounded-lg shadow-lg border border-gray-200 p-4"
          >
            <p className="text-sm text-gray-900">
              <span className="font-semibold">{mockPurchases[current].name}</span> purchased{' '}
              <span className="font-semibold text-primary-600">{mockPurchases[current].product}</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">{mockPurchases[current].time}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
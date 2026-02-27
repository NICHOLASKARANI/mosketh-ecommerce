// apps/frontend/components/cart/Cart.tsx
'use client'

import { useState, useEffect } from 'react'  // Make sure this import exists

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load cart from localStorage or API
    const loadCart = async () => {
      try {
        // Your cart loading logic
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to load cart:', error)
        setIsLoading(false)
      }
    }

    loadCart()
  }, [])

  // Rest of your component...
}
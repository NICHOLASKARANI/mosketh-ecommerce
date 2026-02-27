'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  slug?: string
}

interface WishlistContextType {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  isInWishlist: (id: string) => boolean
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist) {
      try {
        setItems(JSON.parse(savedWishlist))
      } catch (error) {
        console.error('Failed to parse wishlist from localStorage:', error)
      }
    }
    setIsInitialized(true)
  }, [])

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('wishlist', JSON.stringify(items))
    }
  }, [items, isInitialized])

  const addItem = (item: WishlistItem) => {
    setItems(prev => {
      if (prev.some(i => i.id === item.id)) {
        return prev
      }
      return [...prev, item]
    })
  }

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const isInWishlist = (id: string) => {
    return items.some(item => item.id === id)
  }

  const clearWishlist = () => {
    setItems([])
    localStorage.removeItem('wishlist')
  }

  return (
    <WishlistContext.Provider value={{
      items,
      addItem,
      removeItem,
      isInWishlist,
      clearWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}

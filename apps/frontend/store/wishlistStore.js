import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        const items = get().items
        const existing = items.find(i => i.id === product.id)
        if (!existing) {
          set({ items: [...items, product] })
        }
      },
      
      removeItem: (id) => {
        set({ items: get().items.filter(i => i.id !== id) })
      },
      
      isInWishlist: (id) => {
        return get().items.some(i => i.id === id)
      },
      
      clearWishlist: () => set({ items: [] })
    }),
    { name: 'wishlist-storage' }
  )
)

// Create Provider component
export const WishlistProvider = ({ children }) => {
  return <>{children}</>
}
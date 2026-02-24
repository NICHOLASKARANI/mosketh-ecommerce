import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,

      addItem: (item) => {
        const items = get().items
        const existing = items.find(i => i.id === item.id)

        if (existing) {
          const updated = items.map(i =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          )
          set({
            items: updated,
            total: updated.reduce((sum, i) => sum + i.priceKES * i.quantity, 0),
            itemCount: updated.reduce((sum, i) => sum + i.quantity, 0)
          })
        } else {
          const newItems = [...items, { ...item, quantity: 1 }]
          set({
            items: newItems,
            total: newItems.reduce((sum, i) => sum + i.priceKES * i.quantity, 0),
            itemCount: newItems.reduce((sum, i) => sum + i.quantity, 0)
          })
        }
      },

      removeItem: (id) => {
        const newItems = get().items.filter(i => i.id !== id)
        set({
          items: newItems,
          total: newItems.reduce((sum, i) => sum + i.priceKES * i.quantity, 0),
          itemCount: newItems.reduce((sum, i) => sum + i.quantity, 0)
        })
      },

      updateQuantity: (id, quantity) => {
        const items = get().items.map(i =>
          i.id === id ? { ...i, quantity } : i
        )
        set({
          items,
          total: items.reduce((sum, i) => sum + i.priceKES * i.quantity, 0),
          itemCount: items.reduce((sum, i) => sum + i.quantity, 0)
        })
      },

      clearCart: () => set({ items: [], total: 0, itemCount: 0 })
    }),
    { name: 'cart-storage' }
  )
)

export { useCartStore }
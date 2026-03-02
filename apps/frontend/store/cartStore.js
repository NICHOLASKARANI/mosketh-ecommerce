import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      addItem: (product) => set((state) => ({
        items: [...state.items, { ...product, quantity: 1 }]
      })),
      removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
      })),
      clearCart: () => set({ items: [] })
    }),
    { name: 'cart-storage' }
  )
);

// Provider component for layout.js
export const CartProvider = ({ children }) => {
  return children;
};

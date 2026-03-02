import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Create the store hook
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

// Add a Provider component that just renders children
// This satisfies the import in layout.js
export const CartProvider = ({ children }) => {
  return children;
};

import React from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
  persist(
    (set) => ({
      items: [],
      addItem: (product) => set((state) => ({ items: [...state.items, product] })),
      removeItem: (id) => set((state) => ({ items: state.items.filter(item => item.id !== id) }))
    }),
    { name: 'wishlist-storage' }
  )
);

export const WishlistProvider = ({ children }) => {
  return children;
};

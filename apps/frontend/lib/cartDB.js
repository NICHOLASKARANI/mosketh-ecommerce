// Universal cart utility
const CART_KEY = 'mosketh_cart_v2';

export const cartDB = {
  // Get cart items
  getCart: () => {
    try {
      const cart = localStorage.getItem(CART_KEY);
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error('Error loading cart:', error);
      return [];
    }
  },

  // Add item to cart
  addItem: (product) => {
    try {
      const cart = cartDB.getCart();
      const existingItem = cart.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.priceKES,
          quantity: 1,
          image: product.images?.[0] || ''
        });
      }
      
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      
      // Trigger events
      window.dispatchEvent(new Event('cartUpdated'));
      window.dispatchEvent(new StorageEvent('storage', { key: CART_KEY }));
      
      return { success: true, cart };
    } catch (error) {
      console.error('Error adding to cart:', error);
      return { success: false, error: error.message };
    }
  },

  // Remove item
  removeItem: (id) => {
    try {
      const cart = cartDB.getCart();
      const filtered = cart.filter(item => item.id !== id);
      localStorage.setItem(CART_KEY, JSON.stringify(filtered));
      
      window.dispatchEvent(new Event('cartUpdated'));
      window.dispatchEvent(new StorageEvent('storage', { key: CART_KEY }));
      
      return true;
    } catch (error) {
      console.error('Error removing item:', error);
      return false;
    }
  },

  // Update quantity
  updateQuantity: (id, quantity) => {
    try {
      if (quantity < 1) return false;
      
      const cart = cartDB.getCart();
      const item = cart.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        
        window.dispatchEvent(new Event('cartUpdated'));
        window.dispatchEvent(new StorageEvent('storage', { key: CART_KEY }));
      }
      return true;
    } catch (error) {
      console.error('Error updating quantity:', error);
      return false;
    }
  },

  // Clear cart
  clearCart: () => {
    localStorage.removeItem(CART_KEY);
    window.dispatchEvent(new Event('cartUpdated'));
    window.dispatchEvent(new StorageEvent('storage', { key: CART_KEY }));
  },

  // Get total items
  getTotalItems: () => {
    return cartDB.getCart().reduce((sum, item) => sum + (item.quantity || 1), 0);
  },

  // Get total price
  getTotalPrice: () => {
    return cartDB.getCart().reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  }
};

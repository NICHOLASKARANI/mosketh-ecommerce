// Simple cart utility using localStorage
export const cartDB = {
  // Get cart items
  getCart: () => {
    try {
      const cart = localStorage.getItem('mosketh_cart');
      return cart ? JSON.parse(cart) : [];
    } catch {
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
      
      localStorage.setItem('mosketh_cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
      
      return { success: true, message: 'Added to cart!' };
    } catch (error) {
      console.error('Error adding to cart:', error);
      return { success: false, message: 'Failed to add to cart' };
    }
  },

  // Remove item
  removeItem: (id) => {
    const cart = cartDB.getCart();
    const filtered = cart.filter(item => item.id !== id);
    localStorage.setItem('mosketh_cart', JSON.stringify(filtered));
    window.dispatchEvent(new Event('cartUpdated'));
  },

  // Clear cart
  clearCart: () => {
    localStorage.removeItem('mosketh_cart');
    window.dispatchEvent(new Event('cartUpdated'));
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

// Universal cart utility
export const cart = {
  // Get cart items
  getItems: () => {
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
      const items = cart.getItems();
      const existingItem = items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        items.push({
          id: product.id || Date.now(),
          name: product.name || 'Product',
          price: product.priceKES || 0,
          quantity: 1,
          image: product.images?.[0] || ''
        });
      }
      
      localStorage.setItem('mosketh_cart', JSON.stringify(items));
      window.dispatchEvent(new Event('cartUpdated'));
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return false;
    }
  },

  // Remove item
  removeItem: (id) => {
    const items = cart.getItems();
    const filtered = items.filter(item => item.id !== id);
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
    return cart.getItems().reduce((sum, item) => sum + (item.quantity || 1), 0);
  },

  // Get total price
  getTotalPrice: () => {
    return cart.getItems().reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);
  }
};

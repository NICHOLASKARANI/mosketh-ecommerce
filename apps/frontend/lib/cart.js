// Universal cart utility - works exactly like our test page
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
      const newItem = {
        id: product.id || Date.now(),
        name: product.name || 'Product',
        price: product.priceKES || 0,
        quantity: 1,
        image: product.images?.[0] || ''
      };
      
      items.push(newItem);
      localStorage.setItem('mosketh_cart', JSON.stringify(items));
      
      // Dispatch event for other tabs/windows
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
    return cart.getItems().length;
  },

  // Get total price
  getTotalPrice: () => {
    return cart.getItems().reduce((sum, item) => sum + (item.price || 0), 0);
  }
};

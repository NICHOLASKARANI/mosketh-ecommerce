// Universal cart utility with improved storage
const CART_KEY = 'mosketh_cart_v3';

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
      
      let updatedCart;
      if (existingItem) {
        updatedCart = cart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        updatedCart = [...cart, {
          id: product.id,
          name: product.name,
          price: product.priceKES,
          quantity: 1,
          image: product.images?.[0] || ''
        }];
      }
      
      localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
      window.dispatchEvent(new Event('cartUpdated'));
      
      return { success: true, cart: updatedCart };
    } catch (error) {
      console.error('Error adding to cart:', error);
      return { success: false, error: error.message };
    }
  },

  // Remove item
  removeItem: (id) => {
    try {
      const cart = cartDB.getCart();
      const updatedCart = cart.filter(item => item.id !== id);
      localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
      window.dispatchEvent(new Event('cartUpdated'));
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
      const updatedCart = cart.map(item => 
        item.id === id ? { ...item, quantity } : item
      );
      
      localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
      window.dispatchEvent(new Event('cartUpdated'));
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

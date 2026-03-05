// Unified product storage that works across all domains
const STORAGE_KEY = 'mosketh_products_unified';

export const productDB = {
  // Get all products
  getAll: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading products:', error);
      return [];
    }
  },

  // Add product
  add: (product) => {
    try {
      const products = productDB.getAll();
      const newProduct = {
        ...product,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      products.push(newProduct);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
      
      // Trigger storage event for cross-tab sync
      window.dispatchEvent(new Event('productsUpdated'));
      return newProduct;
    } catch (error) {
      console.error('Error adding product:', error);
      return null;
    }
  },

  // Delete product
  delete: (id) => {
    try {
      const products = productDB.getAll();
      const filtered = products.filter(p => p.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      window.dispatchEvent(new Event('productsUpdated'));
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  },

  // Update product
  update: (id, updates) => {
    try {
      const products = productDB.getAll();
      const index = products.findIndex(p => p.id === id);
      if (index !== -1) {
        products[index] = { ...products[index], ...updates };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
        window.dispatchEvent(new Event('productsUpdated'));
        return products[index];
      }
      return null;
    } catch (error) {
      console.error('Error updating product:', error);
      return null;
    }
  },

  // Clear all products
  clear: () => {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('productsUpdated'));
  }
};

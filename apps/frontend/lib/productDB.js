// Universal product storage with seed data
const STORAGE_KEY = 'mosketh_admin_products';
import { SEED_PRODUCTS } from './seedProducts';

export const productDB = {
  // Get all products
  getAll: () => {
    try {
      const adminProducts = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      
      // If no admin products, use seed products
      if (adminProducts.length === 0) {
        console.log('🌱 Using seed products');
        // Save seed products to localStorage for next time
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_PRODUCTS));
        return SEED_PRODUCTS;
      }
      
      return adminProducts;
    } catch (error) {
      console.error('Error loading products:', error);
      return SEED_PRODUCTS;
    }
  },

  // Add product
  add: (product) => {
    try {
      const adminProducts = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      
      const newProduct = {
        ...product,
        id: Date.now().toString(),
        images: product.images?.length ? product.images : ['https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      adminProducts.push(newProduct);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(adminProducts));
      window.dispatchEvent(new Event('productsUpdated'));
      
      return newProduct;
    } catch (error) {
      console.error('Error adding product:', error);
      return null;
    }
  },

  // Update product
  update: (id, updatedData) => {
    try {
      const adminProducts = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const index = adminProducts.findIndex(p => p.id === id);
      
      if (index >= 0) {
        adminProducts[index] = {
          ...adminProducts[index],
          ...updatedData,
          updatedAt: new Date().toISOString()
        };
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(adminProducts));
        window.dispatchEvent(new Event('productsUpdated'));
        
        return adminProducts[index];
      }
      return null;
    } catch (error) {
      console.error('Error updating product:', error);
      return null;
    }
  },

  // Delete product
  delete: (id) => {
    try {
      const adminProducts = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const filtered = adminProducts.filter(p => p.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      window.dispatchEvent(new Event('productsUpdated'));
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  }
};

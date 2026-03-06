// Universal product storage - ONLY admin products show
const STORAGE_KEY = 'mosketh_admin_products';

export const productDB = {
  // Get all products - ONLY from admin storage
  getAll: () => {
    try {
      const adminProducts = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      // Ensure we always return an array
      const products = Array.isArray(adminProducts) ? adminProducts : [];
      console.log(`📦 Loading ${products.length} admin products`);
      return products;
    } catch (error) {
      console.error('Error loading products:', error);
      return [];
    }
  },

  // Add product
  add: (product) => {
    try {
      const adminProducts = productDB.getAll();
      
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
      const adminProducts = productDB.getAll();
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
      const adminProducts = productDB.getAll();
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

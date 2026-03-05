// Universal product storage with image support
const STORAGE_KEY = 'mosketh_admin_products';
const VERSION_KEY = 'mosketh_products_version';

// Default products
export const DEFAULT_PRODUCTS = [
  {
    id: "1",
    name: "Ameerat Al Arab by Asdaaf",
    priceKES: 2500,
    category: "womens-perfumes",
    description: "A luxurious Arabian fragrance",
    shortDescription: "Luxury Arabian fragrance",
    stock: 10,
    images: ["https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400"],
    featured: true,
    slug: "ameerat-al-arab-by-asdaaf"
  },
  // ... (rest of your 11 products)
];

export const productDB = {
  // Get all products
  getAll: () => {
    try {
      const adminProducts = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      
      if (!adminProducts || adminProducts.length === 0) {
        return DEFAULT_PRODUCTS;
      }
      
      // Merge admin products with defaults
      const mergedProducts = [...DEFAULT_PRODUCTS];
      
      adminProducts.forEach(adminProduct => {
        const index = mergedProducts.findIndex(p => p.id === adminProduct.id);
        if (index >= 0) {
          mergedProducts[index] = adminProduct;
        } else {
          mergedProducts.push(adminProduct);
        }
      });
      
      return mergedProducts;
    } catch (error) {
      console.error('Error loading products:', error);
      return DEFAULT_PRODUCTS;
    }
  },

  // Add product
  add: (product) => {
    try {
      const adminProducts = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      
      const newProduct = {
        ...product,
        id: Date.now().toString(),
        images: product.images || ['https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      adminProducts.push(newProduct);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(adminProducts));
      
      // Force refresh
      window.dispatchEvent(new Event('productsUpdated'));
      
      return newProduct;
    } catch (error) {
      console.error('Error adding product:', error);
      return null;
    }
  },

  // Update product (with image support)
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

// Include all 11 default products here (copy from your previous file)
// Add the remaining 8 products to DEFAULT_PRODUCTS array

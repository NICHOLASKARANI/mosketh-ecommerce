// Universal product storage with real-time sync
const STORAGE_KEY = 'mosketh_admin_products';
const VERSION_KEY = 'mosketh_products_version';
const CURRENT_VERSION = '2026-03-06-v2'; // Update this when you make major changes

// Default products (fallback if no admin products)
const DEFAULT_PRODUCTS = [
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
  {
    id: "2",
    name: "La charmante by Maison Alhambra",
    priceKES: 2800,
    category: "womens-perfumes",
    description: "Elegant floral scent",
    shortDescription: "Elegant floral",
    stock: 10,
    images: ["https://images.unsplash.com/photo-1541643600914-78b084683601?w=400"],
    featured: true,
    slug: "la-charmante-by-maison-alhambra"
  },
  {
    id: "3",
    name: "Intense Wayfarer By Pendora scents",
    priceKES: 3000,
    category: "unisex-perfumes",
    description: "Bold and intense",
    shortDescription: "Bold fragrance",
    stock: 10,
    images: ["https://images.unsplash.com/photo-1592919505780-303950717480?w=400"],
    featured: true,
    slug: "intense-wayfarer-by-pendora-scents"
  }
  // Add more defaults as needed
];

export const productDB = {
  // Get all products (prioritizes admin products)
  getAll: () => {
    try {
      // Check if we need to force refresh
      const storedVersion = localStorage.getItem(VERSION_KEY);
      
      // Get admin products
      const adminProducts = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      
      // If no admin products, use defaults
      if (adminProducts.length === 0) {
        return DEFAULT_PRODUCTS;
      }
      
      // Return admin products (they override defaults)
      return adminProducts;
    } catch (error) {
      console.error('Error loading products:', error);
      return DEFAULT_PRODUCTS;
    }
  },

  // Add product (admin only)
  add: (product) => {
    try {
      const adminProducts = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      
      // Create new product with unique ID
      const newProduct = {
        ...product,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      adminProducts.push(newProduct);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(adminProducts));
      
      // Update version to force refresh for all users
      localStorage.setItem(VERSION_KEY, Date.now().toString());
      
      // Trigger events for real-time updates
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('productsUpdated'));
        window.dispatchEvent(new StorageEvent('storage', { 
          key: STORAGE_KEY, 
          newValue: JSON.stringify(adminProducts) 
        }));
      }
      
      console.log('✅ Product added:', newProduct.name);
      return newProduct;
    } catch (error) {
      console.error('Error adding product:', error);
      return null;
    }
  },

  // Update product (admin only)
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
        
        // Update version to force refresh
        localStorage.setItem(VERSION_KEY, Date.now().toString());
        
        // Trigger events
        window.dispatchEvent(new Event('productsUpdated'));
        window.dispatchEvent(new StorageEvent('storage', { 
          key: STORAGE_KEY, 
          newValue: JSON.stringify(adminProducts) 
        }));
        
        console.log('✅ Product updated:', adminProducts[index].name);
        return adminProducts[index];
      }
      return null;
    } catch (error) {
      console.error('Error updating product:', error);
      return null;
    }
  },

  // Delete product (admin only)
  delete: (id) => {
    try {
      const adminProducts = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const filtered = adminProducts.filter(p => p.id !== id);
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      
      // Update version to force refresh
      localStorage.setItem(VERSION_KEY, Date.now().toString());
      
      // Trigger events
      window.dispatchEvent(new Event('productsUpdated'));
      window.dispatchEvent(new StorageEvent('storage', { 
        key: STORAGE_KEY, 
        newValue: JSON.stringify(filtered) 
      }));
      
      console.log('✅ Product deleted');
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  },

  // Clear all admin products
  clearAll: () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem(VERSION_KEY, Date.now().toString());
    window.dispatchEvent(new Event('productsUpdated'));
  },

  // Force refresh for all users
  forceRefresh: () => {
    localStorage.setItem(VERSION_KEY, Date.now().toString());
    window.dispatchEvent(new Event('productsUpdated'));
  }
};

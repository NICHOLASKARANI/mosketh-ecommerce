// Universal product storage with version control
const STORAGE_KEY = 'mosketh_products_v3';
const VERSION_KEY = 'mosketh_products_version';
const CURRENT_VERSION = '2026-03-06-v1'; // Change this date to force refresh

// Default products that EVERYONE sees
export const DEFAULT_PRODUCTS = [
  {
    id: "1",
    name: "Ameerat Al Arab by Asdaaf",
    priceKES: 2500,
    category: "womens-perfumes",
    description: "A luxurious Arabian fragrance crafted for the modern queen",
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
    description: "Elegant and charming floral scent",
    shortDescription: "Elegant floral scent",
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
    description: "Bold and intense fragrance",
    shortDescription: "Bold and intense",
    stock: 10,
    images: ["https://images.unsplash.com/photo-1592919505780-303950717480?w=400"],
    featured: true,
    slug: "intense-wayfarer-by-pendora-scents"
  },
  {
    id: "4",
    name: "Ishq Al shuyukh silver by lataffa",
    priceKES: 3000,
    category: "mens-perfumes",
    description: "Silver scent for men",
    shortDescription: "Silver scent",
    stock: 10,
    images: ["https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400"],
    featured: true,
    slug: "ishq-al-shuyukh-silver-by-lataffa"
  },
  {
    id: "5",
    name: "Her Confession by Lattafa",
    priceKES: 3000,
    category: "womens-perfumes",
    description: "Elegant women's fragrance",
    shortDescription: "Elegant fragrance",
    stock: 10,
    images: ["https://images.unsplash.com/photo-1541643600914-78b084683601?w=400"],
    featured: true,
    slug: "her-confession-by-lattafa"
  },
  {
    id: "6",
    name: "MAYAR BY LATAFFA",
    priceKES: 2900,
    category: "womens-perfumes",
    description: "Sweet and floral scent",
    shortDescription: "Sweet floral",
    stock: 10,
    images: ["https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400"],
    featured: true,
    slug: "mayar-by-lataffa"
  },
  {
    id: "7",
    name: "Ramz Silver By Lattafa",
    priceKES: 2500,
    category: "unisex-perfumes",
    description: "Silver fragrance",
    shortDescription: "Silver scent",
    stock: 10,
    images: ["https://images.unsplash.com/photo-1592919505780-303950717480?w=400"],
    featured: true,
    slug: "ramz-silver-by-lattafa"
  },
  {
    id: "8",
    name: "Bint Hooran Passion by Ard Alzaafaran",
    priceKES: 2000,
    category: "womens-perfumes",
    description: "Passionate floral scent",
    shortDescription: "Passionate floral",
    stock: 10,
    images: ["https://images.unsplash.com/photo-1541643600914-78b084683601?w=400"],
    featured: true,
    slug: "bint-hooran-passion-by-ard-alzaafaran"
  },
  {
    id: "9",
    name: "HAYA BY LATAFFA",
    priceKES: 3000,
    category: "womens-perfumes",
    description: "Fresh and vibrant",
    shortDescription: "Fresh vibrant",
    stock: 10,
    images: ["https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400"],
    featured: true,
    slug: "haya-by-lataffa"
  },
  {
    id: "10",
    name: "Ana abiyedh Scarlet by Lattafa",
    priceKES: 2500,
    category: "womens-perfumes",
    description: "Scarlet fragrance",
    shortDescription: "Scarlet scent",
    stock: 10,
    images: ["https://images.unsplash.com/photo-1541643600914-78b084683601?w=400"],
    featured: true,
    slug: "ana-abiyedh-scarlet-by-lattafa"
  },
  {
    id: "11",
    name: "Vulcan Feu by French Avenue",
    priceKES: 4000,
    category: "mens-perfumes",
    description: "Powerful men's fragrance",
    shortDescription: "Powerful scent",
    stock: 10,
    images: ["https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400"],
    featured: true,
    slug: "vulcan-feu-by-french-avenue"
  }
];

export const productDB = {
  // Get all products (forces refresh if version changed)
  getAll: () => {
    try {
      // Check if we need to refresh
      const storedVersion = localStorage.getItem(VERSION_KEY);
      
      if (storedVersion !== CURRENT_VERSION) {
        // Clear old data and force refresh
        localStorage.removeItem(STORAGE_KEY);
        localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
        console.log('🔄 Product database refreshed to version', CURRENT_VERSION);
        return DEFAULT_PRODUCTS;
      }
      
      // Get admin-modified products
      const adminProducts = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      
      // Merge default with admin products (admin takes precedence)
      const allProducts = [...DEFAULT_PRODUCTS];
      
      adminProducts.forEach(adminProduct => {
        const index = allProducts.findIndex(p => p.id === adminProduct.id);
        if (index >= 0) {
          allProducts[index] = adminProduct; // Update existing
        } else {
          allProducts.push(adminProduct); // Add new
        }
      });
      
      return allProducts;
    } catch (error) {
      console.error('Error loading products:', error);
      return DEFAULT_PRODUCTS;
    }
  },

  // Add or update product
  add: (product) => {
    try {
      const adminProducts = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const newProduct = {
        ...product,
        id: product.id || Date.now().toString(),
        updatedAt: new Date().toISOString()
      };
      
      // Check if product exists
      const index = adminProducts.findIndex(p => p.id === newProduct.id);
      if (index >= 0) {
        adminProducts[index] = newProduct; // Update
      } else {
        adminProducts.push(newProduct); // Add
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(adminProducts));
      
      // Trigger update event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('productsUpdated'));
        // Also trigger storage event for cross-tab sync
        window.dispatchEvent(new StorageEvent('storage', { key: STORAGE_KEY }));
      }
      
      return newProduct;
    } catch (error) {
      console.error('Error adding product:', error);
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
      window.dispatchEvent(new StorageEvent('storage', { key: STORAGE_KEY }));
      
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  },

  // Force refresh for all users (call this after updates)
  forceRefresh: () => {
    localStorage.setItem(VERSION_KEY, 'old-version'); // This will trigger refresh
    window.dispatchEvent(new Event('productsUpdated'));
  }
};

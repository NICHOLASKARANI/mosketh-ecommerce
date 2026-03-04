// Product utility to manage products across the site
export const productUtils = {
  // Get all products from localStorage
  getAllProducts: () => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('mosketh_products');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading products:', error);
      return [];
    }
  },

  // Get featured products
  getFeaturedProducts: () => {
    const products = productUtils.getAllProducts();
    return products.filter(p => p.featured === true);
  },

  // Get products by category
  getProductsByCategory: (category) => {
    const products = productUtils.getAllProducts();
    if (category === 'all') return products;
    return products.filter(p => p.category === category);
  },

  // Add a product
  addProduct: (product) => {
    const products = productUtils.getAllProducts();
    const newProduct = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    products.push(newProduct);
    localStorage.setItem('mosketh_products', JSON.stringify(products));
    return newProduct;
  },

  // Delete a product
  deleteProduct: (id) => {
    const products = productUtils.getAllProducts();
    const filtered = products.filter(p => p.id !== id);
    localStorage.setItem('mosketh_products', JSON.stringify(filtered));
    return filtered;
  },

  // Update a product
  updateProduct: (id, updates) => {
    const products = productUtils.getAllProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updates };
      localStorage.setItem('mosketh_products', JSON.stringify(products));
      return products[index];
    }
    return null;
  }
};

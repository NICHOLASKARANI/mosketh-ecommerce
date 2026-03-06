import { productDB } from '@/lib/productDB';

export async function generateProductSitemaps() {
  const baseUrl = 'https://moskethperfumesandbeauty.com';
  const products = productDB.getAll() || [];
  
  // Generate sitemap for first 1000 products
  const sitemap1 = products.slice(0, 1000).map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date(product.updatedAt || Date.now()),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return {
    sitemap1,
    totalProducts: products.length,
    hasMore: products.length > 1000,
  };
}

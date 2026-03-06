import { productDB } from '@/lib/productDB';

export default async function sitemapIndex() {
  const baseUrl = 'https://moskethperfumesandbeauty.com';
  const products = productDB.getAll() || [];
  
  // Split products into chunks of 1000 (Google's limit per sitemap)
  const chunkSize = 1000;
  const productChunks = [];
  
  for (let i = 0; i < products.length; i += chunkSize) {
    productChunks.push(products.slice(i, i + chunkSize));
  }

  const sitemaps = [
    {
      url: `${baseUrl}/sitemap.xml`,
      lastModified: new Date(),
    },
    ...productChunks.map((_, index) => ({
      url: `${baseUrl}/sitemap/products-${index + 1}.xml`,
      lastModified: new Date(),
    })),
  ];

  return sitemaps;
}

// apps/frontend/app/sitemap.ts
import { MetadataRoute } from 'next'

async function fetchBlogPosts() {
  try {
    const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL
    if (!apiUrl) {
      console.warn('API_URL not defined, skipping blog posts fetch')
      return []
    }
    
    const res = await fetch(`${apiUrl}/blog`, {
      next: { revalidate: 3600 }
    })
    if (!res.ok) return []
    return await res.json()
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
    return []
  }
}

async function fetchProducts() {
  try {
    const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL
    if (!apiUrl) {
      console.warn('API_URL not defined, skipping products fetch')
      return []
    }
    
    const res = await fetch(`${apiUrl}/products`, {
      next: { revalidate: 3600 }
    })
    if (!res.ok) return []
    return await res.json()
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  
  const [blogPosts, products] = await Promise.all([
    fetchBlogPosts(),
    fetchProducts()
  ])

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/perfumes`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/perfumes/men`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/perfumes/women`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/perfumes/unisex`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/body-oils`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/face-creams`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hair-products`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cart`,
      lastModified: new Date(),
      changeFrequency: 'never' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/wishlist`,
      lastModified: new Date(),
      changeFrequency: 'never' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/checkout`,
      lastModified: new Date(),
      changeFrequency: 'never' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]

  const blogUrls = blogPosts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const productUrls = products.map((product: any) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(product.updatedAt || product.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...blogUrls, ...productUrls]
}
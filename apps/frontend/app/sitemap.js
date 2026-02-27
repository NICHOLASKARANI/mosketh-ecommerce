export default async function sitemap() {
  const baseUrl = 'https://moskethperfumesandbeauty.co.ke'

  // Static routes
  const staticRoutes = [
    '',
    '/products',
    '/perfumes/men',
    '/perfumes/women',
    '/perfumes/unisex',
    '/body-oils',
    '/face-creams',
    '/hair-products',
    '/blog',
    '/contact',
    '/about',
    '/faqs',
    '/shipping',
    '/returns',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8,
  }))

  // Fetch dynamic blog posts
  let blogRoutes = []
  try {
    const blogRes = await fetch(`${process.env.API_URL}/blog`)
    const blogs = await blogRes.json()
    blogRoutes = blogs.data.map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: new Date(blog.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.6,
    }))
  } catch (error) {
    console.error('Failed to fetch blog posts for sitemap:', error)
  }

  // Fetch dynamic products
  let productRoutes = []
  try {
    const productsRes = await fetch(`${process.env.API_URL}/products`)
    const products = await productsRes.json()
    productRoutes = products.data.map((product) => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: new Date(product.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.7,
    }))
  } catch (error) {
    console.error('Failed to fetch products for sitemap:', error)
  }

  return [...staticRoutes, ...blogRoutes, ...productRoutes]
}
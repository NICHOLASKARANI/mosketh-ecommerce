'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '@/lib/api'
import ProductCard from '@/components/ProductCard'

export default function PerfumesPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products')
      // Filter for all perfumes
      const perfumes = res.data.data.filter(p => 
        p.category?.name?.includes('Perfumes')
      )
      setProducts(perfumes)
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { name: "Men's Perfumes", slug: '/perfumes/men', icon: '👔' },
    { name: "Women's Perfumes", slug: '/perfumes/women', icon: '👗' },
    { name: "Unisex Perfumes", slug: '/perfumes/unisex', icon: '👥' },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-8">
        <ol className="flex items-center gap-2 text-gray-600">
          <li><Link href="/" className="hover:text-primary-600">Home</Link></li>
          <li>/</li>
          <li className="text-gray-900 font-medium">Perfumes</li>
        </ol>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Perfumes</h1>

      {/* Category Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={cat.slug}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-center group"
          >
            <span className="text-4xl mb-2 block">{cat.icon}</span>
            <h3 className="font-semibold text-gray-900 group-hover:text-primary-600">
              {cat.name}
            </h3>
          </Link>
        ))}
      </div>

      {/* Products Grid */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">All Perfumes</h2>
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
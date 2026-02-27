'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '@/lib/api'
import ProductCard from '@/components/ProductCard'

export default function FaceCreamsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products')
      // Filter for face creams
      const faceCreams = res.data.data.filter(p => 
        p.category?.slug === 'face-creams' || 
        p.category?.name === "Face Creams"
      )
      setProducts(faceCreams)
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

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
          <li className="text-gray-900 font-medium">Face Creams</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Face Creams</h1>
        <p className="text-gray-600">Nourish and hydrate your skin with our premium face creams</p>
      </div>

      {/* Category Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-4xl mb-3">🧴</div>
          <h3 className="font-semibold text-gray-900 mb-2">Deep Hydration</h3>
          <p className="text-sm text-gray-600">Intense moisture for all skin types</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-4xl mb-3">✨</div>
          <h3 className="font-semibold text-gray-900 mb-2">Anti-Aging</h3>
          <p className="text-sm text-gray-600">Reduce fine lines and wrinkles</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-4xl mb-3">🌿</div>
          <h3 className="font-semibold text-gray-900 mb-2">Natural Ingredients</h3>
          <p className="text-sm text-gray-600">Gentle and effective formulas</p>
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No face creams found in this category</p>
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
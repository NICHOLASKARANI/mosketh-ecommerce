'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import ProductCard from '../components/ProductCard'
import { api } from '../lib/api'

export default function HomePage() {
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    api.get('/products/featured')
      .then(res => setFeatured(res.data.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">MosKeth Beauty & Perfumes</h1>
          <p className="text-xl mb-2">Shop F5, First Floor, Superior Centre</p>
          <p className="text-xl mb-8">Kimathi Street, Nairobi CBD</p>
          <div className="flex gap-4 justify-center">
            <Link href="/products" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold">
              Shop Now
            </Link>
            <a 
              href="https://wa.me/254742783907" 
              target="_blank" 
              rel="noopener"
              className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg font-semibold"
            >
              WhatsApp 0742783907
            </a>
          </div>
        </div>
      </section>

      {/* Business Info Bar */}
      <section className="bg-primary-50 py-4 border-y">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <span>📍 Shop F5, Superior Centre, Kimathi Street</span>
            <span>📞 0742783907</span>
            <span>💬 WhatsApp: 0742783907</span>
            <span>💰 Paybill: 0742783907</span>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
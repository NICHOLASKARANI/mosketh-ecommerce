'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/store/cartStore'
import toast from 'react-hot-toast'

export default function ProductCard({ product }) {
  const { addItem } = useCartStore()

  const handleAddToCart = (e) => {
    e.preventDefault()
    addItem({
      id: product.id,
      name: product.name,
      priceKES: product.priceKES,
      quantity: 1,
      image: product.images?.[0] || '/images/placeholder.jpg',
      slug: product.slug
    })
    toast.success('Added to cart!')
  }

  return (
    <Link href={`/product/${product.slug}`} className="group">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative h-48 bg-gray-100">
          <Image
            src={product.images?.[0] || '/images/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary-600">
              KSh {product.priceKES?.toLocaleString()}
            </span>
            <button
              onClick={handleAddToCart}
              className="bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { api } from '../../../lib/api'
import { useCartStore } from '../../../store/cartStore'
import { FaWhatsapp, FaShoppingCart } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function ProductPage() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCartStore()

  useEffect(() => {
    api.get(`/products/slug/${slug}`)
      .then(res => setProduct(res.data.data))
      .catch(err => console.error(err))
  }, [slug])

  if (!product) {
    return <div className="text-center py-20">Loading...</div>
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      priceKES: product.priceKES,
      quantity,
      image: product.images[0],
      slug: product.slug
    })
    toast.success('Added to cart!')
  }

  const handleWhatsApp = () => {
    const message = `I want to order:\n${product.name}\nQuantity: ${quantity}\nTotal: KSh ${product.priceKES * quantity}`
    window.open(`https://wa.me/254742783907?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
          <Image 
            src={product.images[0] || '/images/placeholder.jpg'} 
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl text-primary-600 font-bold mb-4">
            KSh {product.priceKES.toLocaleString()}
          </p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Quantity */}
          <div className="flex gap-4 mb-4">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 border rounded-lg px-3 py-2"
            />
            <button 
              onClick={handleAddToCart}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              <FaShoppingCart /> Add to Cart
            </button>
          </div>

          {/* WhatsApp Order */}
          <button 
            onClick={handleWhatsApp}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 mb-6"
          >
            <FaWhatsapp /> Order via WhatsApp 0742783907
          </button>

          {/* Store Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold mb-2">📍 Store Location:</p>
            <p className="text-sm mb-2">Shop F5, First Floor, Superior Centre</p>
            <p className="text-sm mb-2">Kimathi Street, Nairobi CBD</p>
            <p className="font-semibold mt-3 mb-1">💰 M-Pesa Paybill:</p>
            <p className="text-xl text-primary-600 font-bold">0742783907</p>
          </div>
        </div>
      </div>
    </div>
  )
}
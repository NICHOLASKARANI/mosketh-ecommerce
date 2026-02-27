'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { FaTrash, FaArrowLeft, FaShoppingBag } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function CartPage() {
  const router = useRouter()
  const { items, total, itemCount, removeItem, updateQuantity, clearCart } = useCartStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(id)
      toast.success('Item removed from cart')
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty')
      return
    }
    router.push('/checkout')
  }

  const handleWhatsAppOrder = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    let message = "🛍️ *NEW ORDER - MosKeth Beauty*\n\n"
    message += "📍 *Store:* Shop F5, Superior Centre, Kimathi Street, Nairobi CBD\n\n"
    message += "*ORDER SUMMARY:*\n"
    
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} x${item.quantity} = KSh ${item.priceKES * item.quantity}\n`
    })
    
    message += `\n💰 *TOTAL: KSh ${total}*\n`
    message += "🚚 *Delivery Address:* \n"
    message += "📞 *Phone:* \n\n"
    message += "Pay via M-Pesa Paybill 0742783907"
    
    window.open(`https://wa.me/254742783907?text=${encodeURIComponent(message)}`, '_blank')
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart ({itemCount} items)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm p-4 flex gap-4">
              {/* Product Image */}
              <Link href={`/product/${item.slug}`} className="flex-shrink-0">
                <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={item.image || '/images/placeholder.jpg'}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>

              {/* Product Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <Link href={`/product/${item.slug}`} className="font-medium text-gray-900 hover:text-primary-600">
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">Price: KSh {item.priceKES} each</p>
                  </div>
                  <button
                    onClick={() => {
                      removeItem(item.id)
                      toast.success('Item removed from cart')
                    }}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>

                {/* Quantity and Subtotal */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Qty:</label>
                    <select
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Subtotal:</p>
                    <p className="font-bold text-gray-900">KSh {item.priceKES * item.quantity}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Continue Shopping */}
          <div className="flex items-center justify-between pt-4">
            <Link href="/products" className="text-primary-600 hover:text-primary-700 flex items-center gap-2">
              <FaArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
            <button
              onClick={() => {
                clearCart()
                toast.success('Cart cleared')
              }}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

            {/* Price Breakdown */}
            <div className="space-y-2 py-4 border-y border-gray-200">
              <div className="flex items-center justify-between text-gray-600">
                <span>Subtotal ({itemCount} items)</span>
                <span className="font-medium">KSh {total}</span>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between py-4">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-primary-600">KSh {total}</span>
            </div>

            {/* Checkout Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleCheckout}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={handleWhatsAppOrder}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.064 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
                Order via WhatsApp
              </button>
            </div>

            {/* Trust Badge */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 text-center">
                🔒 Secure checkout powered by M-Pesa Paybill <strong>0742783907</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '../store/cartStore'
import { FaTrash, FaWhatsapp } from 'react-icons/fa'

export default function CartPage() {
  const { items, total, removeItem, updateQuantity } = useCartStore()

  const handleWhatsApp = () => {
    let message = "🛍️ *NEW ORDER - MosKeth Beauty*\n\n"
    items.forEach(item => {
      message += `${item.name} x${item.quantity} = KSh ${item.priceKES * item.quantity}\n`
    })
    message += `\n💰 *Total: KSh ${total}*\n`
    message += `📍 *Delivery Address:* \n`
    message += `📞 *Phone:* \n\n`
    message += `Pay via M-Pesa Paybill 0742783907`
    
    window.open(`https://wa.me/254742783907?text=${encodeURIComponent(message)}`, '_blank')
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link href="/products" className="btn-primary inline-block">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm p-4 flex gap-4">
              <Link href={`/product/${item.slug}`} className="w-24 h-24 relative bg-gray-100 rounded">
                <Image 
                  src={item.image || '/images/placeholder.jpg'} 
                  alt={item.name}
                  fill
                  className="object-cover rounded"
                />
              </Link>

              <div className="flex-1">
                <Link href={`/product/${item.slug}`} className="font-medium hover:text-primary-600">
                  {item.name}
                </Link>
                <p className="text-gray-600">KSh {item.priceKES}</p>

                <div className="flex items-center justify-between mt-2">
                  <select
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                    className="border rounded px-2 py-1"
                  >
                    {[1,2,3,4,5].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>

                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              <div className="text-right font-bold">
                KSh {item.priceKES * item.quantity}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          
          <div className="flex justify-between mb-4">
            <span>Total:</span>
            <span className="font-bold text-primary-600">KSh {total}</span>
          </div>

          <Link href="/checkout" className="btn-primary w-full block text-center mb-3">
            Proceed to Checkout
          </Link>

          <button 
            onClick={handleWhatsApp}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
          >
            <FaWhatsapp /> Order via WhatsApp
          </button>

          <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
            <p className="font-semibold">📍 Store:</p>
            <p>Shop F5, Superior Centre</p>
            <p>Kimathi Street, Nairobi CBD</p>
            <p className="font-semibold mt-2">💰 Paybill:</p>
            <p className="text-primary-600 font-bold">0742783907</p>
          </div>
        </div>
      </div>
    </div>
  )
}
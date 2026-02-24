'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '../store/authStore'
import { api } from '../lib/api'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCartStore()
  const { user } = useAuthStore()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    address: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await api.post('/orders', {
        userId: user?.id || 'guest',
        items: items.map(i => ({
          productId: i.id,
          quantity: i.quantity,
          priceKES: i.priceKES
        })),
        totalKES: total,
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: formData.address
      })

      clearCart()
      toast.success('Order placed! We will contact you soon.')
      router.push('/')
    } catch (error) {
      toast.error('Failed to place order')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    router.push('/cart')
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              className="form-input"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="form-input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="form-input"
            placeholder="e.g., 0742783907"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Delivery Address</label>
          <textarea
            required
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            className="form-input"
            rows={3}
            placeholder="Shop F5, Superior Centre, Kimathi Street, Nairobi"
          />
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between text-lg font-bold mb-4">
            <span>Total:</span>
            <span className="text-primary-600">KSh {total}</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary"
          >
            {loading ? 'Processing...' : `Place Order • Pay KSh ${total}`}
          </button>

          <p className="text-sm text-gray-500 mt-4 text-center">
            After placing order, send M-Pesa to Paybill <strong>0742783907</strong>
          </p>
        </div>
      </form>
    </div>
  )
}
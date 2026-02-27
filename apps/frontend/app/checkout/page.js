'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import { api } from '@/lib/api'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCartStore()
  const { user, isAuthenticated } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  })

  useEffect(() => {
    setMounted(true)
    // Pre-fill form with user data if logged in
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: '',
        address: ''
      })
    }
  }, [user])

  // Redirect if cart is empty
  useEffect(() => {
    if (mounted && items.length === 0) {
      toast.error('Your cart is empty')
      router.push('/cart')
    }
  }, [mounted, items, router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.address) {
      toast.error('Please fill in all fields')
      setLoading(false)
      return
    }

    // Validate phone number (simple validation)
    const phoneRegex = /^[0-9]{10,12}$/
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      toast.error('Please enter a valid phone number')
      setLoading(false)
      return
    }

    try {
      console.log('Placing order with data:', {
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

      const response = await api.post('/orders', {
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

      console.log('Order response:', response.data)
      
      // Clear cart and show success
      clearCart()
      toast.success('Order placed successfully! We will contact you soon.')
      
      // Redirect to home or order confirmation page
      router.push('/')
    } catch (error) {
      console.error('Order error:', error)
      
      // Show detailed error message
      const errorMessage = error.response?.data?.error || error.message || 'Failed to place order'
      toast.error(errorMessage)
      
      if (error.response) {
        console.error('Error response data:', error.response.data)
        console.error('Error response status:', error.response.status)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (items.length === 0) {
    return null // Will redirect via useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name *</label>
            <input
              type="text"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="John"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name *</label>
            <input
              type="text"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="Doe"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            placeholder="0712345678"
          />
          <p className="text-xs text-gray-500 mt-1">Format: 0712345678 or 254712345678</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Delivery Address *</label>
          <textarea
            name="address"
            required
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            rows={3}
            placeholder="Shop F5, Superior Centre, Kimathi Street, Nairobi"
          />
        </div>

        {/* Order Summary */}
        <div className="border-t pt-4 mt-4">
          <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm mb-1">
              <span>{item.name} x{item.quantity}</span>
              <span>KSh {item.priceKES * item.quantity}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
            <span>Total:</span>
            <span className="text-primary-600">KSh {total}</span>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Payment Instructions:</strong> After placing order, send M-Pesa to Paybill <strong>0742783907</strong> with your order number as reference.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
        >
          {loading ? 'Processing...' : `Place Order • KSh ${total}`}
        </button>
      </form>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '../lib/api'
import toast from 'react-hot-toast'

export default function NewProduct() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    priceKES: '',
    stock: '',
    description: '',
    categoryId: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await api.post('/admin/products', {
        ...formData,
        priceKES: Number(formData.priceKES),
        stock: Number(formData.stock),
        images: ['/images/product.jpg']
      })
      toast.success('Product created')
      router.push('/admin/products')
    } catch (error) {
      toast.error('Failed to create product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="form-input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">SKU</label>
          <input
            type="text"
            required
            value={formData.sku}
            onChange={(e) => setFormData({...formData, sku: e.target.value})}
            className="form-input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price (KES)</label>
          <input
            type="number"
            required
            value={formData.priceKES}
            onChange={(e) => setFormData({...formData, priceKES: e.target.value})}
            className="form-input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Stock</label>
          <input
            type="number"
            required
            value={formData.stock}
            onChange={(e) => setFormData({...formData, stock: e.target.value})}
            className="form-input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="form-input"
            rows={4}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  )
}
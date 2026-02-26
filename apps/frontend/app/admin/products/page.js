'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuthStore } from '../../../store/authStore'  // ← Changed
import { api } from '../../../lib/api'  // ← Changed
import { FaPlus, FaTrash } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function AdminProducts() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await api.get('/admin/products')
      setProducts(res.data.data)
    } catch (error) {
      toast.error('Failed to fetch products')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return
    
    try {
      await api.delete(`/admin/products/${id}`)
      toast.success('Product deleted')
      fetchProducts()
    } catch (error) {
      toast.error('Failed to delete product')
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/admin/products/new" className="btn-primary flex items-center gap-2">
          <FaPlus /> Add Product
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">SKU</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-t">
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.sku}</td>
                <td className="p-3">KSh {p.priceKES}</td>
                <td className="p-3">
                  <span className={p.stock < 5 ? 'text-red-600 font-bold' : ''}>
                    {p.stock}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '../../lib/api'
import { FaPlus, FaTrash } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products')
      setProducts(res.data.data)
    } catch (error) {
      toast.error('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  // ... rest of your component
}

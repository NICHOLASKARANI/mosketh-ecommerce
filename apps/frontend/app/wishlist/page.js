'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuthStore } from '@/store/authStore'
import { FaHeart, FaTrash, FaShoppingCart } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function WishlistPage() {
  const { user, isAuthenticated } = useAuthStore()
  const [wishlistItems, setWishlistItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      toast.error('Please login to view your wishlist')
      window.location.href = '/login'
      return
    }
    
    // Load wishlist from localStorage or API
    loadWishlist()
  }, [isAuthenticated])

  const loadWishlist = () => {
    try {
      // For now, load from localStorage (you can replace with API later)
      const saved = localStorage.getItem('wishlist')
      if (saved) {
        setWishlistItems(JSON.parse(saved))
      }
    } catch (error) {
      console.error('Failed to load wishlist:', error)
    } finally {
      setLoading(false)
    }
  }

  const removeFromWishlist = (productId) => {
    const newWishlist = wishlistItems.filter(item => item.id !== productId)
    setWishlistItems(newWishlist)
    localStorage.setItem('wishlist', JSON.stringify(newWishlist))
    toast.success('Removed from wishlist')
  }

  const addToCart = (product) => {
    // Add to cart logic here
    toast.success('Added to cart')
    // You can remove from wishlist if desired
    // removeFromWishlist(product.id)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-8">
        <ol className="flex items-center gap-2 text-gray-600">
          <li><Link href="/" className="hover:text-primary-600">Home</Link></li>
          <li>/</li>
          <li className="text-gray-900 font-medium">My Wishlist</li>
        </ol>
      </nav>

      <div className="flex items-center gap-3 mb-8">
        <FaHeart className="w-8 h-8 text-primary-600" />
        <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <div className="text-6xl mb-4">❤️</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8">Save your favorite items to buy later</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <Link href={`/product/${item.slug}`}>
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={item.image || '/images/placeholder.jpg'}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>
              
              <div className="p-4">
                <Link href={`/product/${item.slug}`}>
                  <h3 className="font-semibold text-gray-900 mb-2 hover:text-primary-600 line-clamp-2">
                    {item.name}
                  </h3>
                </Link>
                
                <div className="text-lg font-bold text-primary-600 mb-3">
                  KSh {item.price?.toLocaleString()}
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(item)}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <FaShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove from wishlist"
                  >
                    <FaTrash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { api } from '@/lib/api'
import toast from 'react-hot-toast'

export default function NewProduct() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    priceKES: '',
    comparePriceKES: '',
    stock: '',
    description: '',
    shortDescription: '',
    categoryId: '',
    featured: false
  })

  // Fetch categories when component loads
  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories')
      console.log('Categories fetched:', res.data.data)
      setCategories(res.data.data)
    } catch (error) {
      console.error('Failed to fetch categories:', error)
      toast.error('Failed to load categories')
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be less than 2MB')
      return
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setImageFile(file)
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const uploadImage = async () => {
    if (!imageFile) return null

    setImageUploading(true)
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = async () => {
        try {
          const base64Image = reader.result
          console.log('Uploading image...')
          const res = await api.post('/admin/upload-image', { image: base64Image })
          console.log('Image upload response:', res.data)
          toast.success('Image uploaded successfully')
          resolve(res.data.imageUrl)
        } catch (error) {
          console.error('Image upload error:', error)
          toast.error('Failed to upload image: ' + (error.response?.data?.error || error.message))
          reject(error)
        } finally {
          setImageUploading(false)
        }
      }
      reader.onerror = (error) => {
        console.error('FileReader error:', error)
        setImageUploading(false)
        reject(error)
      }
      reader.readAsDataURL(imageFile)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate required fields
      if (!formData.name || !formData.sku || !formData.priceKES || !formData.stock || !formData.description || !formData.categoryId) {
        toast.error('Please fill in all required fields')
        setLoading(false)
        return
      }

      // Verify category exists
      const selectedCategory = categories.find(c => c.id === formData.categoryId)
      if (!selectedCategory) {
        toast.error('Please select a valid category from the list')
        setLoading(false)
        return
      }

      console.log('Selected category:', selectedCategory)

      // Upload image first if selected
      let imageUrl = 'https://via.placeholder.com/800x800?text=MosKeth+Product'
      if (imageFile) {
        try {
          const uploadedUrl = await uploadImage()
          if (uploadedUrl) imageUrl = uploadedUrl
        } catch (error) {
          console.warn('Image upload failed, using placeholder')
        }
      }

      // Prepare product data
      const productData = {
        name: formData.name.trim(),
        sku: formData.sku.trim().toUpperCase(),
        priceKES: Number(formData.priceKES),
        comparePriceKES: formData.comparePriceKES ? Number(formData.comparePriceKES) : null,
        stock: Number(formData.stock),
        description: formData.description.trim(),
        shortDescription: formData.shortDescription?.trim() || '',
        categoryId: formData.categoryId, // This sends the actual database ID
        featured: formData.featured,
        images: [imageUrl]
      }

      console.log('Creating product with data:', productData)

      // Create product
      const response = await api.post('/admin/products', productData)
      console.log('Product creation response:', response.data)

      toast.success('Product created successfully')
      router.push('/admin/products')
    } catch (error) {
      console.error('Create product error:', error)
      
      // Show detailed error message
      const errorMessage = error.response?.data?.error || error.message || 'Failed to create product'
      toast.error(errorMessage)
      
      // Log additional details for debugging
      if (error.response) {
        console.error('Error response data:', error.response.data)
        console.error('Error response status:', error.response.status)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Product Image (800x800 recommended)</h2>
          
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Image Preview */}
            <div className="flex-shrink-0">
              <div className="relative w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                    <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs text-center">No image selected</span>
                  </div>
                )}
              </div>
            </div>

            {/* Upload Controls */}
            <div className="flex-1">
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleImageChange}
                className="hidden"
                id="product-image"
                disabled={imageUploading}
              />
              <label
                htmlFor="product-image"
                className={`inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg cursor-pointer hover:bg-primary-700 transition-colors ${imageUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Choose Image
              </label>
              <p className="mt-2 text-sm text-gray-500">
                Recommended: 800x800 pixels, max 2MB (JPG, PNG, WEBP)
              </p>
              {imageUploading && (
                <div className="mt-2 flex items-center gap-2 text-sm text-primary-600">
                  <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>Uploading...</span>
                </div>
              )}
              {imagePreview && !imageUploading && (
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null)
                    setImagePreview(null)
                  }}
                  className="mt-2 text-sm text-red-600 hover:text-red-700"
                >
                  Remove image
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="e.g., Dior Sauvage 100ml"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SKU <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="sku"
                required
                value={formData.sku}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., DIOR-001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="categoryId"
                required
                value={formData.categoryId}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {categories.length === 0 && (
                <p className="text-sm text-red-500 mt-1">Loading categories...</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (KES) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="priceKES"
                required
                min="0"
                step="0.01"
                value={formData.priceKES}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., 8500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Compare Price (KES)
              </label>
              <input
                type="number"
                name="comparePriceKES"
                min="0"
                step="0.01"
                value={formData.comparePriceKES}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Optional - for showing discounts"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="stock"
              required
              min="0"
              step="1"
              value={formData.stock}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="e.g., 10"
            />
          </div>
        </div>

        {/* Description */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
          <h2 className="text-lg font-semibold mb-4">Description</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Short Description
            </label>
            <input
              type="text"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Brief description for product cards (max 150 characters)"
              maxLength="150"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              required
              value={formData.description}
              onChange={handleInputChange}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Detailed product description..."
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              id="featured"
              checked={formData.featured}
              onChange={handleInputChange}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="featured" className="text-sm font-medium text-gray-700">
              Featured Product (show on homepage)
            </label>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || imageUploading}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  )
}
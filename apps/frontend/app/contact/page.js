'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaPhone, FaWhatsapp, FaEnvelope, FaClock, FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Message sent successfully! We\'ll respond within 24 hours.')
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const businessInfo = {
    address: 'Shop F5, First Floor, Superior Centre, Kimathi Street, Nairobi CBD',
    phone: '0742783907',
    whatsapp: '0742783907',
    email: 'info@mosketh.co.ke',
    hours: 'Mon-Sat: 9am-8pm | Sun: 11am-5pm',
    social: {
      facebook: 'Mos Keth Oketch',
      instagram: '@MoskethPerfumes',
      tiktok: '@MoskethBeautyTouch',
    },
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-8">
        <ol className="flex items-center gap-2 text-gray-600">
          <li><Link href="/" className="hover:text-primary-600">Home</Link></li>
          <li>/</li>
          <li className="text-gray-900 font-medium">Contact Us</li>
        </ol>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Visit Our Store</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <FaMapMarkerAlt className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Address</p>
                  <p className="text-gray-600">{businessInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <FaPhone className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <p className="text-gray-600">{businessInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <FaWhatsapp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">WhatsApp</p>
                  <p className="text-gray-600">{businessInfo.whatsapp}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <FaEnvelope className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">{businessInfo.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <FaClock className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Working Hours</p>
                  <p className="text-gray-600">{businessInfo.hours}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Follow Us</h2>
            <div className="flex gap-4">
              <a href="#" className="bg-gray-100 p-3 rounded-full hover:bg-primary-100 transition-colors">
                <FaFacebookF className="w-5 h-5 text-gray-600 hover:text-primary-600" />
              </a>
              <a href="#" className="bg-gray-100 p-3 rounded-full hover:bg-primary-100 transition-colors">
                <FaInstagram className="w-5 h-5 text-gray-600 hover:text-primary-600" />
              </a>
              <a href="#" className="bg-gray-100 p-3 rounded-full hover:bg-primary-100 transition-colors">
                <FaTiktok className="w-5 h-5 text-gray-600 hover:text-primary-600" />
              </a>
            </div>
          </div>

          <div className="bg-primary-50 rounded-lg p-6 border border-primary-100">
            <h3 className="font-semibold text-gray-900 mb-2">M-Pesa Paybill</h3>
            <p className="text-3xl font-bold text-primary-600 mb-1">0742783907</p>
            <p className="text-sm text-gray-600">Pochi la Biashara - Business Number</p>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="0742783907"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="How can we help you?"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
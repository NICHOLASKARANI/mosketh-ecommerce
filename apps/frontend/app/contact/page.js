'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, FaInstagram, FaFacebook, FaTiktok, FaTelegram, FaYoutube, FaTwitter } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the message to your backend
    toast.success('Message sent! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl opacity-90">We're here to help 24/7</p>
          </div>
        </div>

        {/* Contact Info Grid */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <FaPhone className="text-3xl text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Phone/WhatsApp</h3>
              <a href="tel:0742783907" className="text-gray-600 hover:text-purple-600">
                0742783907
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <FaEnvelope className="text-3xl text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Email</h3>
              <a href="mailto:moskethbeautytouch@gmail.com" className="text-gray-600 hover:text-purple-600">
                moskethbeautytouch@gmail.com
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <FaMapMarkerAlt className="text-3xl text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-gray-600">Shop F5, Superior Centre<br />Kimathi Street, Nairobi CBD</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <FaClock className="text-3xl text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Opening Hours</h3>
              <p className="text-gray-600">24 Hours Everyday</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea
                    required
                    rows="5"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Map & Social Media */}
            <div>
              <div className="bg-gray-50 p-8 rounded-lg mb-6">
                <h2 className="text-2xl font-bold mb-6">Visit Our Store</h2>
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.846296276516!2d36.8179!3d-1.2833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTcnMDAuMCJTIDM2wrA0OScwMC4wIkU!5e0!3m2!1sen!2ske!4v1234567890"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    className="rounded-lg"
                  ></iframe>
                </div>
                <p className="text-gray-600">
                  Shop F5, Superior Centre<br />
                  Kimathi Street, Nairobi CBD
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-6">Follow Us</h2>
                <div className="grid grid-cols-4 gap-4">
                  <a href="https://instagram.com/mosketh_beauty_touch" target="_blank" rel="noopener noreferrer" 
                     className="bg-pink-600 text-white p-4 rounded-lg hover:bg-pink-700 transition text-center">
                    <FaInstagram size={24} className="mx-auto mb-2" />
                    <span className="text-sm">Instagram</span>
                  </a>
                  
                  <a href="https://facebook.com/MosKethOketch" target="_blank" rel="noopener noreferrer"
                     className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition text-center">
                    <FaFacebook size={24} className="mx-auto mb-2" />
                    <span className="text-sm">Facebook</span>
                  </a>
                  
                  <a href="https://tiktok.com/@MoskethBeautyTouch" target="_blank" rel="noopener noreferrer"
                     className="bg-black text-white p-4 rounded-lg hover:bg-gray-800 transition text-center">
                    <FaTiktok size={24} className="mx-auto mb-2" />
                    <span className="text-sm">TikTok</span>
                  </a>
                  
                  <a href="https://wa.me/254742783907" target="_blank" rel="noopener noreferrer"
                     className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition text-center">
                    <FaWhatsapp size={24} className="mx-auto mb-2" />
                    <span className="text-sm">WhatsApp</span>
                  </a>
                  
                  <a href="https://t.me/moskethbeauty" target="_blank" rel="noopener noreferrer"
                     className="bg-blue-400 text-white p-4 rounded-lg hover:bg-blue-500 transition text-center">
                    <FaTelegram size={24} className="mx-auto mb-2" />
                    <span className="text-sm">Telegram</span>
                  </a>
                  
                  <a href="https://twitter.com/MoskethBeauty" target="_blank" rel="noopener noreferrer"
                     className="bg-blue-400 text-white p-4 rounded-lg hover:bg-blue-500 transition text-center">
                    <FaTwitter size={24} className="mx-auto mb-2" />
                    <span className="text-sm">Twitter</span>
                  </a>
                  
                  <a href="https://youtube.com/@MoskethBeautyTouch" target="_blank" rel="noopener noreferrer"
                     className="bg-red-600 text-white p-4 rounded-lg hover:bg-red-700 transition text-center">
                    <FaYoutube size={24} className="mx-auto mb-2" />
                    <span className="text-sm">YouTube</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
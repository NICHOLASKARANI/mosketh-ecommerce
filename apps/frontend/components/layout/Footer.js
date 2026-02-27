'use client'

import Link from 'next/link'
import Image from 'next/image'
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTiktok, 
  FaWhatsapp,
  FaYoutube,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaPaypal,
  FaCcVisa,
  FaCcMastercard
} from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'Instagram',
      icon: FaInstagram,
      url: 'https://instagram.com/moskethperfumes',
      bgColor: 'bg-pink-500',
      username: '@moskethperfumes'
    },
    {
      name: 'TikTok',
      icon: FaTiktok,
      url: 'https://tiktok.com/@moskethbeautytouch',
      bgColor: 'bg-black',
      username: '@moskethbeautytouch'
    },
    {
      name: 'Facebook',
      icon: FaFacebookF,
      url: 'https://facebook.com/moskethbeautytouch',
      bgColor: 'bg-blue-500',
      username: 'Mos Keth Oketch'
    },
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      url: 'https://wa.me/254742783907',
      bgColor: 'bg-green-500',
      username: '0742783907'
    }
  ]

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Shipping & Delivery', href: '/shipping' },
    { name: 'Returns & Refunds', href: '/returns' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms & Conditions', href: '/terms' },
  ]

  const categoryLinks = [
    { name: "Men's Perfumes", href: '/perfumes/men' },
    { name: "Women's Perfumes", href: '/perfumes/women' },
    { name: 'Unisex Perfumes', href: '/perfumes/unisex' },
    { name: 'Body Oils', href: '/body-oils' },
    { name: 'Face Creams', href: '/face-creams' },
    { name: 'Hair Products', href: '/hair-products' },
    { name: 'Body Mists', href: '/body-mists' },
    { name: 'Gift Sets', href: '/gift-sets' },
  ]

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/logo-white.png"
                alt="MosKeth Perfumes & Beauty"
                width={50}
                height={50}
                className="rounded-lg"
              />
              <div>
                <h3 className="text-xl font-bold text-white">MosKeth</h3>
                <p className="text-xs text-gray-400">Perfumes & Beauty</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Nairobi's premier destination for authentic perfumes and beauty products. 
              Visit our CBD store or order online for fast delivery across Kenya.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-2 mb-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 ${social.bgColor} rounded-full flex items-center justify-center hover:scale-110 transition-transform`}
                  title={`Follow us on ${social.name}`}
                >
                  <social.icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>

            {/* Social Media Handles */}
            <div className="space-y-1 text-sm">
              <p className="text-gray-400">📱 Instagram: <span className="text-white">@moskethperfumes</span></p>
              <p className="text-gray-400">🎵 TikTok: <span className="text-white">@moskethbeautytouch</span></p>
              <p className="text-gray-400">📘 Facebook: <span className="text-white">Mos Keth Oketch</span></p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-primary-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop by Category */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Shop by Category</h3>
            <ul className="space-y-2">
              {categoryLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-primary-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Visit Our Store</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  Shop F5, First Floor, Superior Centre, Kimathi Street, Nairobi CBD
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <span className="text-gray-400">0742783907</span>
              </div>
              <div className="flex items-center gap-3">
                <FaWhatsapp className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-400">0742783907 (Chat via WhatsApp)</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <span className="text-gray-400">info@mosketh.co.ke</span>
              </div>
              <div className="flex items-center gap-3">
                <FaClock className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <span className="text-gray-400">Mon-Sat: 9am-8pm | Sun: 11am-5pm</span>
              </div>
            </div>

            {/* Payment Methods - Fixed M-Pesa Icon */}
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-3">We Accept</h4>
              <div className="space-y-3">
                {/* M-Pesa - Using text instead of icon */}
                <div className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg">
                  <span className="text-green-500 text-xl">💰</span>
                  <div>
                    <span className="text-white font-medium">M-Pesa Paybill:</span>
                    <span className="text-primary-400 font-bold ml-2">0742783907</span>
                  </div>
                </div>
                
                {/* Other Payment Methods */}
                <div className="flex gap-3 items-center">
                  <div className="text-gray-400 hover:text-white transition-colors" title="PayPal">
                    <FaPaypal className="w-8 h-8" />
                  </div>
                  <div className="text-gray-400 hover:text-white transition-colors" title="Visa">
                    <FaCcVisa className="w-8 h-8" />
                  </div>
                  <div className="text-gray-400 hover:text-white transition-colors" title="Mastercard">
                    <FaCcMastercard className="w-8 h-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © {currentYear} MosKeth Perfumes & Beauty. All rights reserved.
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 text-sm">
              <span className="text-gray-400 flex items-center gap-1">
                <span className="text-green-500">✓</span> 100% Authentic
              </span>
              <span className="text-gray-400 flex items-center gap-1">
                <span className="text-primary-500">✓</span> Fast Delivery
              </span>
              <span className="text-gray-400 flex items-center gap-1">
                <span className="text-blue-500">✓</span> Secure Payments
              </span>
            </div>

            {/* M-Pesa Paybill Badge */}
            <div className="bg-gray-800 px-4 py-2 rounded-lg">
              <p className="text-sm text-white">
                <span className="text-primary-400 font-bold">M-Pesa Paybill:</span> 0742783907
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
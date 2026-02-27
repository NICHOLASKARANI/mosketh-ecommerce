'use client'

import { FaInstagram, FaTiktok, FaFacebookF, FaWhatsapp, FaYoutube, FaTwitter } from 'react-icons/fa'

export default function SocialMediaBar() {
  const socialLinks = [
    {
      name: 'Instagram',
      icon: FaInstagram,
      url: 'https://instagram.com/moskethperfumes',
      color: 'hover:bg-pink-600',
      bgColor: 'bg-pink-500',
      username: '@moskethperfumes'
    },
    {
      name: 'TikTok',
      icon: FaTiktok,
      url: 'https://tiktok.com/@moskethbeautytouch',
      color: 'hover:bg-black',
      bgColor: 'bg-black',
      username: '@moskethbeautytouch'
    },
    {
      name: 'Facebook',
      icon: FaFacebookF,
      url: 'https://facebook.com/moskethbeautytouch',
      color: 'hover:bg-blue-600',
      bgColor: 'bg-blue-500',
      username: 'Mos Keth Oketch'
    },
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      url: 'https://wa.me/254742783907',
      color: 'hover:bg-green-600',
      bgColor: 'bg-green-500',
      username: '0742783907'
    }
  ]

  return (
    <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          {/* Left side - Social Media Links */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium hidden sm:block">Follow us:</span>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-8 h-8 ${social.bgColor} rounded-full flex items-center justify-center hover:scale-110 transition-transform`}
                  title={`Follow us on ${social.name}`}
                >
                  <social.icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Right side - Business Info */}
          <div className="flex items-center gap-6 text-sm">
            <div className="hidden md:flex items-center gap-2">
              <span className="text-primary-200">📍</span>
              <span>Shop F5, Superior Centre, Kimathi Street</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary-200">📞</span>
              <span>0742783907</span>
            </div>
            <div className="hidden lg:flex items-center gap-2">
              <span className="text-primary-200">💰</span>
              <span>Paybill: 0742783907</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
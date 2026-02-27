import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">About</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-gray-500 hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-500 hover:text-gray-900">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Shop</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/perfumes" className="text-gray-500 hover:text-gray-900">
                  Perfumes
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-500 hover:text-gray-900">
                  All Products
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/faq" className="text-gray-500 hover:text-gray-900">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-500 hover:text-gray-900">
                  Shipping
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-500 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-500 hover:text-gray-900">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Mosketh. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

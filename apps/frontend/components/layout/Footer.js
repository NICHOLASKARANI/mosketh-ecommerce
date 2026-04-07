import Link from "next/link";
import { FaTiktok, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Mosketh Perfumes & Beauty</h3>
            <p className="text-gray-400">Luxury fragrances and beauty products in Kenya.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/" className="hover:text-purple-400">Home</Link></li>
              <li><Link href="/products" className="hover:text-purple-400">Products</Link></li>
              <li><Link href="/about" className="hover:text-purple-400">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-purple-400">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: moskethbeautytouch@gmail.com</li>
              <li>Phone: +254 742 783 907</li>
              <li>Nairobi, Kenya</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://www.tiktok.com/@mosketh_beauty" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition">
                <FaTiktok size={24} />
              </a>
              <a href="https://www.instagram.com/mosketh_beauty_touch" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition">
                <FaInstagram size={24} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61579337011725" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition">
                <FaFacebook size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Mosketh Perfumes & Beauty. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}


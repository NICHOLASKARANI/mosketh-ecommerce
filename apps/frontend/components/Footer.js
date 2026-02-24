export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-4">MosKeth Beauty</h3>
            <p className="text-sm text-gray-300">
              Shop F5, First Floor<br />
              Superior Centre<br />
              Kimathi Street, Nairobi CBD
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <p className="text-sm text-gray-300">Phone: 0742783907</p>
            <p className="text-sm text-gray-300">WhatsApp: 0742783907</p>
            <p className="text-sm text-gray-300">Paybill: 0742783907</p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Hours</h3>
            <p className="text-sm text-gray-300">Mon-Sat: 9am - 8pm</p>
            <p className="text-sm text-gray-300">Sunday: 11am - 5pm</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} MosKeth Beauty & Perfumes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
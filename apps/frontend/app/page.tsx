export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to Mosketh</h1>
      <p className="text-lg text-gray-600 mb-8">
        Discover our collection of luxury perfumes and cosmetics
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Featured categories */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Perfumes</h2>
          <p className="text-gray-600">Explore our fragrance collection</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Body Oils</h2>
          <p className="text-gray-600">Nourishing body oils</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Face Creams</h2>
          <p className="text-gray-600">Premium face care</p>
        </div>
      </div>
    </div>
  )
}

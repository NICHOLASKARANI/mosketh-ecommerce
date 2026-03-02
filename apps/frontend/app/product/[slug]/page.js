async function getProduct(slug) {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mosketh-backend.vercel.app'
    const res = await fetch(`${API_URL}/api/products/${slug}`, { cache: 'no-store' })
    if (!res.ok) return null
    const data = await res.json()
    return data.data
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.slug)

  if (!product) {
    return <div className="p-8">Product not found</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="grid md:grid-cols-2 gap-8">
        {product.images?.[0] && (
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full rounded-lg"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl text-blue-600 mb-4">KES {product.priceKES}</p>
          <p className="text-gray-600 mb-4">Stock: {product.stock}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg w-full">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
// app/page.js
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let products = [];
  
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mosketh-backend.vercel.app';
    // IMPORTANT: The line below has backticks ` around the template literal
    const res = await fetch(`${API_URL}/api/products`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (res.ok) {
      const data = await res.json();
      // Handle both possible response structures
      products = data.data || data || [];
    }
  } catch (error) {
    console.error('Error fetching products:', error.message);
  }

  return (
    <main style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ 
        fontSize: '2.5rem', 
        textAlign: 'center', 
        marginBottom: '2rem',
        color: '#333'
      }}>
        Welcome to Mosketh Perfumes
      </h1>
      
      <p style={{ 
        textAlign: 'center', 
        fontSize: '1.2rem', 
        marginBottom: '3rem',
        color: '#666'
      }}>
        Discover your signature scent
      </p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        padding: '20px'
      }}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} style={{
              border: '1px solid #eaeaea',
              borderRadius: '8px',
              padding: '15px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              {product.images && product.images[0] && (
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    marginBottom: '10px'
                  }}
                />
              )}
              <h3 style={{ margin: '10px 0', fontSize: '1.2rem' }}>
                {product.name}
              </h3>
              <p style={{ color: '#666', marginBottom: '10px' }}>
                {product.shortDescription?.substring(0, 100)}...
              </p>
              <p style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                color: '#0070f3' 
              }}>
                KES {product.priceKES}
              </p>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>
            No products available at the moment.
          </p>
        )}
      </div>
    </main>
  );
}

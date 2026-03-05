export default function HomePage() {
  return (
    <html>
      <head>
        <title>Mosketh Perfumes & Beauty</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
          .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 100px 20px; text-align: center; }
          .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
          .benefits { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; padding: 50px 20px; }
          .benefit { text-align: center; }
          .footer { background: #1a202c; color: white; padding: 50px 20px; margin-top: 50px; }
        `}</style>
      </head>
      <body>
        <div className="hero">
          <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Mosketh Perfumes & Beauty</h1>
          <p style={{ fontSize: '1.2rem' }}>Luxury fragrances in Kenya</p>
        </div>

        <div className="container">
          <div className="benefits">
            <div className="benefit">
              <h3>Fast Delivery</h3>
              <p>Nationwide delivery within 1-3 days</p>
            </div>
            <div className="benefit">
              <h3>100% Authentic</h3>
              <p>All products are genuine</p>
            </div>
            <div className="benefit">
              <h3>24/7 Support</h3>
              <p>We're here to help anytime</p>
            </div>
          </div>

          <div style={{ textAlign: 'center', padding: '50px 0' }}>
            <h2 style={{ marginBottom: '30px' }}>Our Products</h2>
            <p style={{ marginBottom: '20px' }}>Visit our products page to see our collection.</p>
            <a 
              href="/products" 
              style={{ 
                background: '#667eea', 
                color: 'white', 
                padding: '12px 30px', 
                textDecoration: 'none', 
                borderRadius: '5px',
                display: 'inline-block'
              }}
            >
              View Products
            </a>
          </div>
        </div>

        <div className="footer">
          <div className="container">
            <p>© 2026 Mosketh Perfumes & Beauty. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  );
}

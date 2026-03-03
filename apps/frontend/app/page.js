export default function Home() {
  return (
    <html>
      <head><title>Mosketh</title></head>
      <body style={{ fontFamily: 'Arial', padding: '2rem', textAlign: 'center' }}>
        <h1 style={{ color: 'green' }}>✅ Mosketh Perfumes</h1>
        <p style={{ fontSize: '1.2rem' }}>Your site is now live!</p>
        <p style={{ color: '#666' }}>Deployment successful on {new Date().toLocaleString()}</p>
      </body>
    </html>
  )
}

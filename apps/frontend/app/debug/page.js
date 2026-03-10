export default function DebugPage() {
  return (
    <html>
      <head><title>Debug Info</title></head>
      <body style={{ padding: '20px', fontFamily: 'Arial' }}>
        <h1>Debug Information</h1>
        <pre>{JSON.stringify(process.env, null, 2)}</pre>
      </body>
    </html>
  );
}

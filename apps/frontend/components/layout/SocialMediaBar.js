// components/layout/SocialMediaBar.js
export default function SocialMediaBar() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      padding: '10px',
      backgroundColor: '#f5f5f5'
    }}>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
    </div>
  );
}

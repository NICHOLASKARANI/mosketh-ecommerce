import React from 'react';

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  let posts = [];

  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mosketh-backend.vercel.app';
    const res = await fetch(`${API_URL}/api/blog`, {
      cache: 'no-store'
    });
    if (res.ok) {
      const data = await res.json();
      posts = data.data || [];
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error.message);
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '40px' }}>
        Mosketh Perfumes Blog
      </h1>
      
      {posts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ fontSize: '1.2rem', color: '#666' }}>No blog posts yet. Check back soon!</p>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
          gap: '30px' 
        }}>
          {posts.map((post) => (
            <article key={post.id} style={{ 
              border: '1px solid #eaeaea', 
              borderRadius: '8px', 
              overflow: 'hidden',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              {post.image && (
                <img 
                  src={post.image} 
                  alt={post.title}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
              )}
              <div style={{ padding: '20px' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{post.title}</h2>
                <p style={{ color: '#666', marginBottom: '15px' }}>
                  {new Date(post.date).toLocaleDateString()}
                </p>
                <p style={{ marginBottom: '20px' }}>{post.excerpt}</p>
                <a 
                  href={`/blog/${post.slug}`}
                  style={{ 
                    color: '#2563eb', 
                    textDecoration: 'none',
                    fontWeight: 'bold'
                  }}
                >
                  Read More →
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
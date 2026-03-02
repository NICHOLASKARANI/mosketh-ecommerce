import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Your Instagram access token from environment variables
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    
    if (!accessToken) {
      // Return mock data if no token configured
      return NextResponse.json({
        data: [
          {
            id: '1',
            media_url: 'https://res.cloudinary.com/dycdn1xjt/image/upload/v1772115198/mosketh/products/adkdqzcs07sxpkl8t49y.jpg',
            caption: 'New arrival! Vulcan Feu by French Avenue 🔥 Experience the luxury of French Avenue fragrances at Mosketh.',
            like_count: 234,
            comments_count: 45,
            permalink: 'https://instagram.com/moskethperfumes'
          },
          {
            id: '2',
            media_url: 'https://res.cloudinary.com/dycdn1xjt/image/upload/v1772114865/mosketh/products/b3yer9muc2rbs2tbqdmb.jpg',
            caption: 'Ameerat Al Arab - Arabian elegance 🇸🇦 A beautiful blend of floral and oriental notes.',
            like_count: 567,
            comments_count: 89,
            permalink: 'https://instagram.com/moskethperfumes'
          },
          {
            id: '3',
            media_url: 'https://res.cloudinary.com/dycdn1xjt/image/upload/v1772114400/mosketh/products/l8qczfzqeoxib13zlniu.jpg',
            caption: 'Perfect for evening occasions ✨ Make a statement with our premium collection.',
            like_count: 345,
            comments_count: 23,
            permalink: 'https://instagram.com/moskethperfumes'
          },
          {
            id: '4',
            media_url: 'https://res.cloudinary.com/dycdn1xjt/image/upload/v1772115198/mosketh/products/adkdqzcs07sxpkl8t49y.jpg',
            caption: 'Get yours today at Mosketh! 🇰🇪 Fast delivery across Kenya with M-Pesa payments.',
            like_count: 789,
            comments_count: 156,
            permalink: 'https://instagram.com/moskethperfumes'
          }
        ]
      });
    }

    // Fetch from Instagram Graph API
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,like_count,comments_count&access_token=${accessToken}&limit=8`
    );

    if (!response.ok) {
      throw new Error('Instagram API error');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Instagram API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Instagram feed' },
      { status: 500 }
    );
  }
}

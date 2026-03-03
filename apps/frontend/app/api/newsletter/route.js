import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Here you would add the email to your newsletter system
    // For example, using Mailchimp, SendGrid, etc.
    
    console.log('Newsletter subscription:', email);

    // Simulate successful subscription
    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter!'
    });
    
  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json(
      { success: false, error: 'Subscription failed' },
      { status: 500 }
    );
  }
}
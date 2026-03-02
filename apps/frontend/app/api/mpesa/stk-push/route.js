import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { phone, amount, orderId } = await request.json();

    // Validate input
    if (!phone || !amount) {
      return NextResponse.json(
        { success: false, error: 'Phone and amount are required' },
        { status: 400 }
      );
    }

    // Format phone number (remove 0 or +254)
    const formattedPhone = phone.replace(/^0+/, '254').replace(/^\+254/, '254');
    
    if (formattedPhone.length !== 12) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // M-Pesa credentials from environment variables
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const businessShortCode = process.env.MPESA_BUSINESS_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;
    
    if (!consumerKey || !consumerSecret || !businessShortCode || !passkey) {
      console.error('Missing M-Pesa credentials');
      return NextResponse.json(
        { success: false, error: 'Payment service configuration error' },
        { status: 500 }
      );
    }

    // Get access token
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const tokenResponse = await fetch(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        method: 'GET',
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    if (!tokenResponse.ok) {
      throw new Error('Failed to get M-Pesa access token');
    }

    const { access_token } = await tokenResponse.json();

    // Get timestamp
    const date = new Date();
    const timestamp = 
      date.getFullYear() +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      ('0' + date.getDate()).slice(-2) +
      ('0' + date.getHours()).slice(-2) +
      ('0' + date.getMinutes()).slice(-2) +
      ('0' + date.getSeconds()).slice(-2);

    // Generate password
    const password = Buffer.from(
      businessShortCode + passkey + timestamp
    ).toString('base64');

    // STK Push request
    const stkResponse = await fetch(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          BusinessShortCode: businessShortCode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: 'CustomerPayBillOnline',
          Amount: Math.round(amount),
          PartyA: formattedPhone,
          PartyB: businessShortCode,
          PhoneNumber: formattedPhone,
          CallBackURL: `${process.env.NEXT_PUBLIC_API_URL}/api/mpesa/callback`,
          AccountReference: `MOSKETH${orderId || Date.now()}`,
          TransactionDesc: 'Payment for perfume order',
        }),
      }
    );

    const data = await stkResponse.json();

    if (data.ResponseCode === '0') {
      return NextResponse.json({ 
        success: true, 
        data,
        message: 'STK Push sent. Check your phone to complete payment.' 
      });
    } else {
      return NextResponse.json(
        { success: false, error: data.ResponseDescription || 'Payment failed' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('M-Pesa error:', error);
    return NextResponse.json(
      { success: false, error: 'Payment service unavailable' },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { phone, amount, orderId } = await request.json();

    // M-Pesa credentials
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const businessShortCode = process.env.MPESA_BUSINESS_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;
    
    // Get access token
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const tokenResponse = await fetch(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );
    
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
          Amount: amount,
          PartyA: phone,
          PartyB: businessShortCode,
          PhoneNumber: phone,
          CallBackURL: `${process.env.NEXT_PUBLIC_API_URL}/api/mpesa/callback`,
          AccountReference: `MOSKETH${orderId}`,
          TransactionDesc: 'Payment for perfume order',
        }),
      }
    );

    const data = await stkResponse.json();

    return NextResponse.json({ 
      success: true, 
      data,
      message: 'STK Push sent. Check your phone to complete payment.' 
    });
  } catch (error) {
    console.error('M-Pesa error:', error);
    return NextResponse.json(
      { success: false, error: 'Payment failed' },
      { status: 500 }
    );
  }
}
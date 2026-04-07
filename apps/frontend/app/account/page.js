'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LoyaltyPoints from '@/components/LoyaltyPoints';
import ReferralProgram from '@/components/ReferralProgram';

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Simple check - you can expand this later
    const user = localStorage.getItem('user_email');
    setIsLoggedIn(!!user);
  }, []);

  if (!isLoggedIn) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 py-20">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">My Account</h1>
            <p className="text-gray-600 mb-6">Sign in to view your loyalty points and referral rewards</p>
            <a href="/manage/login" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition inline-block">
              Sign In
            </a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">My Account</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <LoyaltyPoints />
            </div>
            <div>
              <ReferralProgram />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

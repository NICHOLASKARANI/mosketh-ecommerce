'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ManagePage() {
  const router = useRouter();

  useEffect(() => {
    // Check if already authenticated
    const isAuthenticated = localStorage.getItem('admin_authenticated');
    if (isAuthenticated) {
      router.push('/manage/dashboard');
    } else {
      router.push('/manage/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>
  );
}
'use client';

import { useEffect } from 'react';

export default function AbandonedCartTracker() {
  useEffect(() => {
    // Track cart abandonment
    const trackCart = () => {
      const cart = JSON.parse(localStorage.getItem('mosketh_cart') || '[]');
      const hasBeenNotified = localStorage.getItem('abandoned_cart_notified');
      
      if (cart.length > 0 && !hasBeenNotified) {
        // Save abandoned cart to localStorage for recovery
        localStorage.setItem('abandoned_cart_data', JSON.stringify({
          items: cart,
          timestamp: new Date().toISOString(),
          total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        }));
        
        // Show recovery popup after 30 seconds on cart page
        if (window.location.pathname === '/cart') {
          setTimeout(() => {
            const recoveryMessage = document.createElement('div');
            recoveryMessage.className = 'fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-white rounded-lg shadow-2xl p-4 z-50 border-l-4 border-purple-600 animate-slide-in-right';
            recoveryMessage.innerHTML = `
              <div class="flex items-start gap-3">
                <div class="bg-purple-100 p-2 rounded-full">
                  <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 15v6"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <p class="font-semibold">Don't miss out! 🛒</p>
                  <p class="text-sm text-gray-600">You have items waiting in your cart.</p>
                  <a href="/cart" class="inline-block mt-2 text-purple-600 font-semibold text-sm hover:underline">Complete your purchase →</a>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" class="text-gray-400 hover:text-gray-600">✕</button>
              </div>
            `;
            document.body.appendChild(recoveryMessage);
            
            // Save that we've notified
            localStorage.setItem('abandoned_cart_notified', 'true');
          }, 30000);
        }
      }
    };

    trackCart();
    
    // Reset notification when cart is empty
    const checkCart = () => {
      const cart = JSON.parse(localStorage.getItem('mosketh_cart') || '[]');
      if (cart.length === 0) {
        localStorage.removeItem('abandoned_cart_notified');
        localStorage.removeItem('abandoned_cart_data');
      }
    };
    
    window.addEventListener('cartUpdated', checkCart);
    return () => window.removeEventListener('cartUpdated', checkCart);
  }, []);

  return null;
}

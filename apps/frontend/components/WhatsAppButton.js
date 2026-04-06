'use client';

import { useEffect, useState } from 'react';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button after scrolling
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const phoneNumber = '254742783907'; // Replace with your actual WhatsApp number
  const message = encodeURIComponent('Hello! I am interested in your products at Mosketh Perfumes & Beauty');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 z-50 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
      }`}
      aria-label="Chat on WhatsApp"
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.032 2.001c-5.523 0-10 4.477-10 10 0 1.866.512 3.614 1.397 5.126l-1.496 4.666 4.823-1.435c1.452.808 3.1 1.264 4.866 1.264 5.523 0 10-4.477 10-10s-4.477-10-10-10z"/>
        <path d="M12.032 18.456c-1.433 0-2.841-.38-4.048-1.097l-2.946.877.951-2.854c-.807-1.264-1.234-2.7-1.234-4.163 0-4.34 3.53-7.87 7.87-7.87 4.34 0 7.87 3.53 7.87 7.87 0 4.34-3.53 7.87-7.87 7.87z" fill="#fff"/>
        <path d="M16.646 14.233c-.256-.128-1.512-.746-1.747-.832-.235-.085-.406-.128-.576.128-.171.256-.663.832-.813 1.003-.15.171-.299.192-.555.064-.256-.128-1.08-.398-2.058-1.27-.762-.682-1.277-1.52-1.427-1.778-.15-.256-.016-.394.113-.522.128-.128.256-.341.384-.512.128-.171.171-.299.256-.512.085-.213.043-.384-.021-.512-.064-.128-.576-1.387-.79-1.899-.192-.478-.384-.413-.512-.413-.128 0-.299-.043-.469-.043-.17 0-.448.064-.683.32-.235.256-.896.875-.896 2.133 0 1.259.917 2.475 1.045 2.645.128.171 1.792 2.752 4.352 3.84 2.56 1.088 2.56.725 3.029.683.469-.043 1.504-.619 1.717-1.216.213-.597.213-1.109.149-1.216-.064-.107-.234-.171-.49-.299z"/>
      </svg>
    </a>
  );
}

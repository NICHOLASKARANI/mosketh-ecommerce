import React from 'react';

export const dynamic = 'force-dynamic';

export default function FAQsPage() {
  const faqs = [
    {
      question: "Are your perfumes authentic?",
      answer: "Yes, we guarantee 100% authentic perfumes. All our products are sourced directly from authorized distributors and brand representatives."
    },
    {
      question: "Do you deliver nationwide?",
      answer: "Yes, we offer fast and reliable delivery to all locations across Kenya. Delivery times vary by location, typically 1-3 business days."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept M-Pesa (Paybill: 0742783907), bank transfers, and card payments via our secure payment gateway."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 7 days of delivery for unopened and unused products in their original packaging. Please contact us to initiate a return."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is dispatched, you will receive a tracking number via SMS and email to track your delivery status."
    },
    {
      question: "Do you have a physical store?",
      answer: "Yes, we are located at Shop F5, Superior Centre, Kimathi Street, Nairobi CBD. Visit us during business hours."
    }
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>Frequently Asked Questions</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {faqs.map((faq, index) => (
          <div key={index} style={{ 
            border: '1px solid #eaeaea', 
            borderRadius: '8px', 
            padding: '20px',
            background: '#f9fafb'
          }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#10b981' }}>
              Q: {faq.question}
            </h3>
            <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#333' }}>
              A: {faq.answer}
            </p>
          </div>
        ))}
      </div>

      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        background: '#3b82f6', 
        borderRadius: '8px',
        color: 'white',
        textAlign: 'center'
      }}>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>Still have questions?</h3>
        <p>Contact us at 0742783907 or visit our store in Nairobi CBD</p>
      </div>
    </div>
  );
}
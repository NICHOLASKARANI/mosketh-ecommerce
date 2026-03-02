import React from 'react';
import { FaTruck, FaShieldAlt, FaHeadset, FaGift } from 'react-icons/fa';

const benefits = [
  {
    icon: FaTruck,
    title: 'Fast Delivery',
    description: 'Nationwide delivery within 1-3 business days'
  },
  {
    icon: FaShieldAlt,
    title: '100% Authentic',
    description: 'All products are 100% genuine and original'
  },
  {
    icon: FaHeadset,
    title: '24/7 Support',
    description: 'We are here to help you anytime'
  },
  {
    icon: FaGift,
    title: 'Gift Wrapping',
    description: 'Beautiful gift wrapping for your loved ones'
  }
];

export default function BenefitsSection() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center">
                  <Icon className="h-12 w-12 text-purple-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">{benefit.title}</h3>
                <p className="mt-2 text-base text-gray-500">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
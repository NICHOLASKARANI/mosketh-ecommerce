'use client';

import { useState } from 'react';

const KENYAN_COUNTIES = [
  'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Kitale',
  'Malindi', 'Garissa', 'Kakamega', 'Nyeri', 'Meru', 'Machakos', 'Kiambu'
];

const DELIVERY_OPTIONS = {
  standard: { name: 'Standard Delivery', days: '3-5 days', price: 350 },
  express: { name: 'Express Delivery', days: '1-2 days', price: 800 },
  pickup: { name: 'Pickup from Store', days: 'Same day', price: 0 }
};

export default function KenyanDelivery({ onSelect }) {
  const [county, setCounty] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [deliveryPrice, setDeliveryPrice] = useState(350);

  const handleDeliveryChange = (method) => {
    setDeliveryMethod(method);
    setDeliveryPrice(DELIVERY_OPTIONS[method].price);
    onSelect?.({ method, county, price: DELIVERY_OPTIONS[method].price });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Your County</label>
        <select 
          value={county}
          onChange={(e) => {
            setCounty(e.target.value);
            onSelect?.({ method: deliveryMethod, county: e.target.value, price: deliveryPrice });
          }}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          <option value="">Select your county</option>
          {KENYAN_COUNTIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-3">
        <h3 className="font-semibold">Delivery Method</h3>
        {Object.entries(DELIVERY_OPTIONS).map(([key, option]) => (
          <label key={key} className={`border rounded-lg p-4 cursor-pointer transition ${deliveryMethod === key ? 'border-purple-600 bg-purple-50' : 'border-gray-200'}`}>
            <input
              type="radio"
              name="delivery"
              value={key}
              checked={deliveryMethod === key}
              onChange={() => handleDeliveryChange(key)}
              className="mr-3"
            />
            <div className="inline-block">
              <span className="font-semibold">{option.name}</span>
              <p className="text-sm text-gray-500">{option.days}</p>
              <p className="text-sm font-bold text-purple-600">
                {option.price === 0 ? 'FREE' : `KES ${option.price}`}
              </p>
            </div>
          </label>
        ))}
      </div>

      {county && deliveryMethod !== 'pickup' && (
        <div className="bg-blue-50 rounded-lg p-3 text-sm">
          <p>🚚 Delivery to {county}: {DELIVERY_OPTIONS[deliveryMethod].days}</p>
          <p className="text-xs text-gray-500 mt-1">Free delivery on orders over KES 5,000</p>
        </div>
      )}
    </div>
  );
}

'use client';

import ProductShowcase from '@/components/ProductShowcase';
import Navbar from '@/components/Navbar';

export default function BoldRingPage() {
  const productData = {
    productType: 'ring' as const,
    productName: 'Bold & Refined Ring',
    price: '$1,850',
    description: 'Discover our sophisticated collection of men\'s jewelry, featuring bold designs and premium materials. From elegant signet rings to statement pieces, each piece embodies masculine style and enduring quality.',
    materials: ['18k Yellow Gold', '18k White Gold', '18k Rose Gold'],
    onAddToCart: () => {
      console.log('Added to cart');
      // Add to cart logic
    },
    onContactAdvisor: () => {
      console.log('Contact advisor');
      // Contact advisor logic
    },
    onFindInStore: () => {
      console.log('Find in store');
      // Find in store logic
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ProductShowcase {...productData} />
    </div>
  );
}

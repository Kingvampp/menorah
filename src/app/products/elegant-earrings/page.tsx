'use client';

import ProductShowcase from '@/components/ProductShowcase';
import Navbar from '@/components/Navbar';

export default function ElegantEarringsPage() {
  const productData = {
    productType: 'earring' as const,
    productName: 'Elegant Diamond Earrings',
    price: '$1,250',
    description: 'Discover our exquisite collection of handcrafted earrings designed for the modern woman. From delicate studs to statement drops, each piece celebrates feminine elegance and timeless beauty.',
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

'use client';

import ProductShowcase from '@/components/ProductShowcase';
import Navbar from '@/components/Navbar';

export default function MenorahRingPage() {
  const productData = {
    productType: 'menorah' as const,
    productName: 'Menorah Diamond Ring',
    price: '$2,850',
    description: 'Experience the perfect fusion of traditional craftsmanship and contemporary design. This exquisite ring features a handcrafted menorah design with brilliant diamonds, symbolizing heritage and luxury.',
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

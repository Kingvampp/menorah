'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: {
    primary: string;
    secondary: string;
    alt: string;
  };
  productName: string;
  price: string;
  description: string;
  materials?: string[];
  onAddToCart?: () => void;
  onContactAdvisor?: () => void;
  onFindInStore?: () => void;
}

export default function ProductGallery({
  images,
  productName,
  price,
  description,
  materials = [],
  onAddToCart,
  onContactAdvisor,
  onFindInStore
}: ProductGalleryProps) {
  const [hoveredImage, setHoveredImage] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      {/* Product Gallery Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Side - Product Information */}
            <div className="space-y-8">
              {/* Product Title and Price */}
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-light text-gray-900 tracking-tight">
                  {productName}
                </h1>
                <p className="text-2xl font-light text-gray-800">
                  {price}
                </p>
              </div>

              {/* Product Description */}
              <div className="space-y-4">
                <p className="text-lg text-gray-600 leading-relaxed font-light">
                  {description}
                </p>
                <button className="text-sm text-gray-500 hover:text-gray-700 font-light underline">
                  More details &gt;
                </button>
              </div>

              {/* Material Options */}
              {materials.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-light text-gray-700 uppercase tracking-widest">
                    Materials
                  </h3>
                  <div className="flex space-x-4">
                    {materials.map((material, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedMaterial(index)}
                        className={`relative w-16 h-16 border-2 rounded-lg overflow-hidden transition-all duration-300 ${
                          selectedMaterial === index
                            ? 'border-gray-900'
                            : 'border-gray-300 hover:border-gray-500'
                        }`}
                      >
                        <Image
                          src={images.primary}
                          alt={`${material} version`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={onAddToCart}
                  className="w-full bg-gray-900 text-white py-4 px-8 font-light tracking-widest uppercase text-sm hover:bg-gray-800 transition-all duration-300"
                >
                  Add to Cart
                </button>
                
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={onContactAdvisor}
                    className="bg-gray-100 text-gray-900 py-3 px-6 font-light tracking-widest uppercase text-sm hover:bg-gray-200 transition-all duration-300"
                  >
                    Contact Advisor
                  </button>
                  <button
                    onClick={onFindInStore}
                    className="bg-gray-100 text-gray-900 py-3 px-6 font-light tracking-widest uppercase text-sm hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Find in Store
                  </button>
                </div>
              </div>

              {/* Save Option */}
              <div className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 cursor-pointer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-sm font-light">SAVE</span>
              </div>
            </div>

            {/* Right Side - Product Images */}
            <div className="space-y-6">
              {/* Main Product Image with Hover Effect */}
              <div 
                className="relative aspect-square w-full overflow-hidden bg-gray-50 group cursor-pointer"
                onMouseEnter={() => setHoveredImage(true)}
                onMouseLeave={() => setHoveredImage(false)}
              >
                {/* Primary Image */}
                <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  hoveredImage ? 'opacity-0' : 'opacity-100'
                }`}>
                  <Image
                    src={images.primary}
                    alt={images.alt}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                
                {/* Secondary Image (Hover) */}
                <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  hoveredImage ? 'opacity-100' : 'opacity-0'
                }`}>
                  <Image
                    src={images.secondary}
                    alt={`${images.alt} - Detail view`}
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Hover Overlay */}
                <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                  hoveredImage ? 'bg-opacity-5' : 'bg-opacity-0'
                }`} />
                
                {/* Hover Indicator */}
                <div className={`absolute bottom-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full transition-all duration-300 ${
                  hoveredImage ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                }`}>
                  <span className="text-xs font-light text-gray-700">
                    Hover to explore
                  </span>
                </div>
                
                {/* Zoom Icon */}
                <div className={`absolute top-4 right-4 bg-white bg-opacity-90 p-2 rounded-full transition-all duration-300 ${
                  hoveredImage ? 'scale-110' : 'scale-100'
                }`}>
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>

              {/* Additional Product Images */}
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square relative overflow-hidden bg-gray-50">
                  <Image
                    src={images.primary}
                    alt={`${images.alt} - Detail view`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="aspect-square relative overflow-hidden bg-gray-50">
                  <Image
                    src={images.secondary}
                    alt={`${images.alt} - Alternative view`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Scroll Indicator */}
              <div className="text-center">
                <span className="text-sm text-gray-500 font-light">Scroll to discover</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

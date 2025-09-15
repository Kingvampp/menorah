'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Earring3D from './Earring3D';
import Ring3D from './Ring3D';

interface ProductShowcaseProps {
  productType: 'menorah' | 'earring' | 'ring';
  productName: string;
  price: string;
  description: string;
  materials?: string[];
  onAddToCart?: () => void;
  onContactAdvisor?: () => void;
  onFindInStore?: () => void;
}

export default function ProductShowcase({
  productType,
  productName,
  price,
  description,
  materials = [],
  onAddToCart,
  onContactAdvisor,
  onFindInStore
}: ProductShowcaseProps) {
  const [hoveredModel, setHoveredModel] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(0);

  const getModelComponent = () => {
    switch (productType) {
      case 'menorah':
        return <Ring3D />;
      case 'earring':
        return <Earring3D modelPath="/models/for_her.glb" canvasId="product-canvas" />;
      case 'ring':
        return <Earring3D modelPath="/models/for_him.glb" canvasId="product-canvas" />;
      default:
        return <Ring3D />;
    }
  };

  const getModelVariations = () => {
    switch (productType) {
      case 'menorah':
        return [
          { name: 'Classic Gold', model: 'menorah_render.glb' },
          { name: 'Diamond Accent', model: 'menorah_render.glb' },
          { name: 'Platinum', model: 'menorah_render.glb' }
        ];
      case 'earring':
        return [
          { name: 'Yellow Gold', model: 'for_her.glb' },
          { name: 'White Gold', model: 'for_her.glb' },
          { name: 'Rose Gold', model: 'for_her.glb' }
        ];
      case 'ring':
        return [
          { name: 'Yellow Gold', model: 'for_him.glb' },
          { name: 'White Gold', model: 'for_him.glb' },
          { name: 'Rose Gold', model: 'for_him.glb' }
        ];
      default:
        return [];
    }
  };

  const variations = getModelVariations();

  return (
    <div className="min-h-screen bg-white">
      {/* Product Showcase Section */}
      <section className="pt-24 pb-20">
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
              {variations.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-light text-gray-700 uppercase tracking-widest">
                    Materials
                  </h3>
                  <div className="flex space-x-4">
                    {variations.map((variation, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedMaterial(index)}
                        className={`relative w-16 h-16 border-2 rounded-lg overflow-hidden transition-all duration-300 ${
                          selectedMaterial === index
                            ? 'border-gray-900'
                            : 'border-gray-300 hover:border-gray-500'
                        }`}
                      >
                        <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-yellow-400 flex items-center justify-center">
                          <span className="text-xs font-light text-gray-700">
                            {variation.name.split(' ')[0]}
                          </span>
                        </div>
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

            {/* Right Side - 3D Model with Hover Effect */}
            <div className="space-y-6">
              {/* Main 3D Model with Hover Effect */}
              <div 
                className="relative aspect-square w-full overflow-hidden bg-gray-50 group cursor-pointer"
                onMouseEnter={() => setHoveredModel(true)}
                onMouseLeave={() => setHoveredModel(false)}
              >
                {/* 3D Model Container */}
                <div className="relative w-full h-full">
                  <Canvas 
                    camera={{ position: [0, 0, 5], fov: 50 }}
                    style={{ width: '100%', height: '100%' }}
                  >
                    <Suspense fallback={null}>
                      {getModelComponent()}
                    </Suspense>
                  </Canvas>
                </div>
                
                {/* Hover Overlay */}
                <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                  hoveredModel ? 'bg-opacity-5' : 'bg-opacity-0'
                }`} />
                
                {/* Hover Indicator */}
                <div className={`absolute bottom-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full transition-all duration-300 ${
                  hoveredModel ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                }`}>
                  <span className="text-xs font-light text-gray-700">
                    Hover to explore
                  </span>
                </div>
                
                {/* Zoom Icon */}
                <div className={`absolute top-4 right-4 bg-white bg-opacity-90 p-2 rounded-full transition-all duration-300 ${
                  hoveredModel ? 'scale-110' : 'scale-100'
                }`}>
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>

              {/* Additional Model Views */}
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square relative overflow-hidden bg-gray-50">
                  <Canvas 
                    camera={{ position: [2, 1, 6], fov: 45 }}
                    style={{ width: '100%', height: '100%' }}
                  >
                    <Suspense fallback={null}>
                      {productType === 'earring' ? (
                        <Earring3D modelPath="/models/for_her.glb" canvasId="detail-canvas-1" />
                      ) : (
                        <Ring3D />
                      )}
                    </Suspense>
                  </Canvas>
                </div>
                <div className="aspect-square relative overflow-hidden bg-gray-50">
                  <Canvas 
                    camera={{ position: [-2, 1, 6], fov: 45 }}
                    style={{ width: '100%', height: '100%' }}
                  >
                    <Suspense fallback={null}>
                      {productType === 'ring' ? (
                        <Earring3D modelPath="/models/for_him.glb" canvasId="detail-canvas-2" />
                      ) : (
                        <Ring3D />
                      )}
                    </Suspense>
                  </Canvas>
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

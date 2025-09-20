'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';

interface CartPreviewProps {
  children: React.ReactNode;
}

const CartPreview: React.FC<CartPreviewProps> = ({ children }) => {
  const { cartItems, getTotalItems, getTotalPrice, removeFromCart, updateQuantity } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const showPreview = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(true);
  };

  const hidePreview = () => {
    timeoutRef.current = setTimeout(() => {
      if (!isHovered) {
        setIsVisible(false);
      }
    }, 150);
  };

  const handlePreviewMouseEnter = () => {
    setIsHovered(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handlePreviewMouseLeave = () => {
    setIsHovered(false);
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="relative"
      onMouseEnter={showPreview}
      onMouseLeave={hidePreview}
    >
      {children}
      
      {/* Cart Preview Popup */}
      {isVisible && cartItems.length > 0 && (
        <div
          ref={previewRef}
          className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
          onMouseEnter={handlePreviewMouseEnter}
          onMouseLeave={handlePreviewMouseLeave}
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-900">Shopping Cart</h3>
            <p className="text-xs text-gray-600">{getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''}</p>
          </div>

          {/* Cart Items */}
          <div className="max-h-64 overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 last:border-b-0">
                {/* Product Image */}
                <div className="w-12 h-12 flex-shrink-0 bg-gray-50 rounded">
                  {item.id === 'amethyst-ring' ? (
                    <img 
                      src="/images/amethyst-ring-1.jpeg" 
                      alt={item.name}
                      className="w-full h-full object-contain rounded"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-lg">
                      {item.name.includes('Earring') ? '💎' :
                       item.name.includes('Men') ? '💍' : '🕎'}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-medium text-gray-900 truncate">{item.name}</h4>
                  <p className="text-xs text-gray-600">{item.price}</p>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-5 h-5 flex items-center justify-center text-xs border border-gray-300 rounded hover:bg-gray-50 text-black font-medium"
                    >
                      -
                    </button>
                    <span className="text-xs text-gray-900 min-w-[20px] text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-5 h-5 flex items-center justify-center text-xs border border-gray-300 rounded hover:bg-gray-50 text-black font-medium"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-900">Total:</span>
              <span className="text-sm font-medium text-gray-900">${getTotalPrice().toFixed(2)}</span>
            </div>
            
            <Link
              href="/cart"
              className="block w-full bg-black text-white text-center py-2 px-4 text-sm font-medium tracking-widest uppercase hover:bg-gray-800 transition-colors"
            >
              View Cart
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPreview;

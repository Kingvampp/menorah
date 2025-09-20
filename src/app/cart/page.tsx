'use client';

import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  // Safety check to prevent undefined errors
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-40 pb-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-light text-black mb-4">Your Cart</h1>
            <p className="text-black mb-8">Your cart is empty</p>
            <Link 
              href="/products"
              className="inline-block bg-black text-white px-8 py-3 text-sm font-medium tracking-widest uppercase hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-40 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-light text-black mb-8">Your Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                  {/* Product Image */}
                  <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded">
                    {item.id === 'amethyst-ring' ? (
                      <img 
                        src="/Images/amethyst-ring-1.jpeg" 
                        alt={item.name}
                        className="w-full h-full object-contain rounded"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">
                        {item.name.includes('Earring') ? '💎' :
                         item.name.includes('Men') ? '💍' : '🕎'}
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-light text-black mb-1">{item.name}</h3>
                    <p className="text-sm text-black mb-2">{item.description}</p>
                    <p className="text-lg font-light text-black">{item.price}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 text-black font-medium"
                    >
                      -
                    </button>
                    <span className="text-lg font-light text-black min-w-[30px] text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 text-black font-medium"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-light text-black mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-black">
                    <span>Subtotal</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-black">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-sm text-black">
                    <span>Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="border-t border-gray-300 pt-3">
                    <div className="flex justify-between text-lg font-medium text-black">
                      <span>Total</span>
                      <span>${getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-black text-white py-4 px-6 text-sm font-medium tracking-widest uppercase hover:bg-gray-800 transition-colors mb-4">
                  Proceed to Checkout
                </button>

                <button 
                  onClick={() => {
                    cartItems.forEach(item => removeFromCart(item.id));
                  }}
                  className="w-full border border-gray-300 text-black py-3 px-6 text-sm font-medium tracking-widest uppercase hover:bg-gray-50 transition-colors"
                >
                  Clear Cart
                </button>

                <Link 
                  href="/products"
                  className="block text-center text-sm text-black hover:text-gray-600 transition-colors mt-4"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

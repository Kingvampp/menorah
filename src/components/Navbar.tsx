'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import CartPreview from './CartPreview';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const { getTotalItems } = useCart();

  // Handle scroll effect with elegant behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if scrolling up or down
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px - hide navbar
        setIsScrolled(false);
        setIsScrollingUp(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsScrolled(true);
        setIsScrollingUp(true);
      } else if (currentScrollY <= 20) {
        // At the top - show full navbar
        setIsScrolled(false);
        setIsScrollingUp(false);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { name: 'Home', href: '/', id: 'home' },
    { name: 'Collection', href: '/products', id: 'products' },
    { name: 'About', href: '/about', id: 'about' },
    { name: 'Contact', href: '/contact', id: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out bg-white ${
      !isScrollingUp && lastScrollY > 100 ? '-translate-y-full' : 'translate-y-0'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top Row - Brand Name Centered - Show when at top or scrolling up */}
        {(lastScrollY <= 20 || isScrollingUp) && (
          <div className={`flex items-center justify-center transition-all duration-700 ease-in-out ${
            lastScrollY <= 20 ? 'h-24 pt-8' : 'h-16 pt-4'
          }`}>
            <Link 
              href="/" 
              className="font-bold text-gray-900 hover:text-gray-700 transition-all duration-700 ease-in-out"
              style={{ 
                fontSize: lastScrollY <= 20 ? '28px' : '20px',
                fontFamily: '"Times New Roman", "Times", serif',
                fontWeight: '400',
                letterSpacing: '0.05em'
              }}
            >
              <span className="uppercase">Menorah Diamond & Jewelry</span>
            </Link>
          </div>
        )}

        {/* Bottom Row - Navigation - Always show when navbar is visible */}
        <div className="flex items-center justify-between h-14">
          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center space-x-10 flex-1 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-300 tracking-wider uppercase"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="hidden lg:flex items-center">
            {/* Shopping Bag Icon with Cart Preview */}
            <CartPreview>
              <Link href="/cart" className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
                </svg>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            </CartPreview>
          </div>

          {/* Mobile menu button - positioned to avoid brand name conflict */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden absolute top-4 right-4 p-2 text-gray-700 hover:text-gray-900 transition-colors duration-300 z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-500 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white border-t border-gray-200/30 shadow-lg">
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300 transform font-medium tracking-wider uppercase text-sm ${
                    isMenuOpen ? 'translate-x-0' : 'translate-x-4'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

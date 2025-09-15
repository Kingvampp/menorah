'use client';

import { useEffect, useState } from 'react';

export default function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') return;

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      setScrollProgress(Math.min(progress, 1));
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Initial call

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', updateScrollProgress);
      }
    };
  }, []);

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
      {/* Scroll progress dots */}
      <div className="flex flex-col space-y-4">
        {[0, 1, 2].map((section, index) => {
          const isActive = scrollProgress >= index * 0.33;
          return (
            <div
              key={index}
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                isActive 
                  ? 'bg-amber-900 border-amber-900' 
                  : 'bg-transparent border-amber-900/50'
              }`}
            />
          );
        })}
      </div>
      
    </div>
  );
}

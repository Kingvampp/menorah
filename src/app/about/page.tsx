'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[20vh] md:min-h-[60vh] flex items-center pt-20 md:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-4 md:space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-gray-900 leading-none tracking-tight" style={{ fontFamily: '"Times New Roman", "Times", serif', fontWeight: '400', letterSpacing: '0.05em' }}>
              Our Story
            </h1>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-8 md:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 leading-tight" style={{ fontFamily: '"Times New Roman", "Times", serif', fontWeight: '400', letterSpacing: '0.05em' }}>
                Crafting Excellence in Yangon
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-light">
                Our journey began in 1952 when master jeweler Samuel Menorah established our workshop in downtown Yangon with a simple yet profound mission: to create jewelry that tells stories, preserves traditions, and celebrates life's most precious moments.
              </p>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-light">
                Today, under the leadership of his granddaughter Sarah, we continue to honor this legacy while pushing the boundaries of contemporary design. Each piece in our collection is a testament to our commitment to excellence, authenticity, and timeless beauty, crafted with the finest materials sourced from Myanmar's rich gemstone heritage.
              </p>
            </div>
            <div className="bg-gray-50 rounded-sm p-8 h-96 flex items-center justify-center">
              <div className="text-8xl">🏺</div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-4" style={{ fontFamily: '"Times New Roman", "Times", serif', fontWeight: '400', letterSpacing: '0.05em' }}>
              Located in Yangon, Myanmar
            </h2>
            <p className="text-base sm:text-lg text-gray-600 font-light">
              Where tradition meets modern craftsmanship
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-light text-gray-900" style={{ fontFamily: '"Times New Roman", "Times", serif', fontWeight: '400', letterSpacing: '0.05em' }}>
                Our Heritage
              </h3>
              <p className="text-base text-gray-600 leading-relaxed font-light">
                Myanmar has long been known as the "Land of Gems," home to some of the world's finest rubies, sapphires, and jade. Our workshop in Yangon allows us to work directly with local gemstone dealers and master craftsmen, ensuring authenticity and supporting the local community.
              </p>
              <p className="text-base text-gray-600 leading-relaxed font-light">
                Our location in the heart of Yangon's jewelry district gives us access to generations of traditional techniques passed down through families, while also embracing modern design principles that appeal to contemporary tastes.
              </p>
            </div>
            <div className="bg-white rounded-sm p-8 h-80 flex items-center justify-center">
              <div className="text-6xl">🗺️</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-4" style={{ fontFamily: '"Times New Roman", "Times", serif', fontWeight: '400', letterSpacing: '0.05em' }}>
              Our Values
            </h2>
            <p className="text-base sm:text-lg text-gray-600 font-light">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">✨</div>
              <h3 className="text-xl font-light text-gray-900 tracking-wide uppercase" style={{ fontFamily: '"Times New Roman", "Times", serif', fontWeight: '400', letterSpacing: '0.05em' }}>Excellence</h3>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                We never compromise on quality. Every piece undergoes rigorous inspection to ensure it meets our exacting standards.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">🤝</div>
              <h3 className="text-xl font-light text-gray-900 tracking-wide uppercase" style={{ fontFamily: '"Times New Roman", "Times", serif', fontWeight: '400', letterSpacing: '0.05em' }}>Integrity</h3>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                We believe in honest craftsmanship, fair pricing, and transparent business practices that build lasting relationships.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-xl font-light text-gray-900 tracking-wide uppercase" style={{ fontFamily: '"Times New Roman", "Times", serif', fontWeight: '400', letterSpacing: '0.05em' }}>Sustainability</h3>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                We source our materials responsibly and support ethical mining practices to protect our planet for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-4" style={{ fontFamily: '"Times New Roman", "Times", serif', fontWeight: '400', letterSpacing: '0.05em' }}>
              Meet Our Artisans
            </h2>
            <p className="text-base sm:text-lg text-gray-600 font-light">
              The master craftsmen behind our beautiful creations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-32 h-32 bg-white rounded-full mx-auto flex items-center justify-center shadow-sm">
                <span className="text-4xl">👨‍🎨</span>
              </div>
              <h3 className="text-lg font-light text-gray-900 tracking-wide" style={{ fontFamily: '"Times New Roman", "Times", serif', fontWeight: '400', letterSpacing: '0.05em' }}>Sarah Menorah</h3>
              <p className="text-sm text-gray-600 font-light">Creative Director</p>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                Third-generation jeweler with 20+ years of experience in traditional and contemporary design.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-32 h-32 bg-white rounded-full mx-auto flex items-center justify-center shadow-sm">
                <span className="text-4xl">👨‍🔧</span>
              </div>
              <h3 className="text-lg font-light text-gray-900 tracking-wide" style={{ fontFamily: '"Times New Roman", "Times", serif', fontWeight: '400', letterSpacing: '0.05em' }}>David Goldstein</h3>
              <p className="text-sm text-gray-600 font-light">Master Craftsman</p>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                Specializes in intricate metalwork and stone setting with over 30 years of expertise.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-32 h-32 bg-white rounded-full mx-auto flex items-center justify-center shadow-sm">
                <span className="text-4xl">👩‍💎</span>
              </div>
              <h3 className="text-lg font-light text-gray-900 tracking-wide" style={{ fontFamily: '"Times New Roman", "Times", serif', fontWeight: '400', letterSpacing: '0.05em' }}>Rachel Cohen</h3>
              <p className="text-sm text-gray-600 font-light">Gem Specialist</p>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                Expert in precious stones and gemology, ensuring only the finest materials reach our customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-8" style={{ fontFamily: '"Times New Roman", "Times", serif', fontWeight: '400', letterSpacing: '0.05em' }}>
            Ready to Create Something Beautiful?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-12 font-light">
            Let us help you find the perfect piece or create a custom design that tells your unique story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products" 
              className="border border-gray-800 text-gray-800 px-8 sm:px-12 py-3 sm:py-4 hover:bg-gray-800 hover:text-white transition-all duration-300 flex items-center gap-3 inline-block font-light tracking-widest uppercase text-sm"
            >
              View Collection
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link 
              href="/contact" 
              className="border border-gray-800 text-gray-800 px-8 sm:px-12 py-3 sm:py-4 hover:bg-gray-800 hover:text-white transition-all duration-300 flex items-center gap-3 inline-block font-light tracking-widest uppercase text-sm"
            >
              Get in Touch
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-light text-gray-900 mb-4" style={{ fontFamily: '"Times New Roman", "Times", serif', fontWeight: '400', letterSpacing: '0.05em' }}>
                Menorah Diamond & Jewelry
              </h3>
              <p className="text-gray-600 font-light leading-relaxed mb-6 max-w-md">
                Where heritage meets innovation. Each piece tells a story of timeless elegance, crafted with the finest materials and unparalleled attention to detail.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 tracking-widest uppercase mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link href="/products" className="text-gray-600 hover:text-gray-900 transition-colors duration-300 font-light">Collection</Link></li>
                <li><Link href="/products?category=women" className="text-gray-600 hover:text-gray-900 transition-colors duration-300 font-light">For Her</Link></li>
                <li><Link href="/products?category=men" className="text-gray-600 hover:text-gray-900 transition-colors duration-300 font-light">For Him</Link></li>
                <li><Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors duration-300 font-light">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors duration-300 font-light">Contact</Link></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 tracking-widest uppercase mb-4">Customer Service</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-300 font-light">Size Guide</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-300 font-light">Care Instructions</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-300 font-light">Shipping & Returns</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-300 font-light">Warranty</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-300 font-light">FAQ</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-200 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-500 font-light mb-4 md:mb-0">
                © 2024 Menorah Diamond & Jewelry. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm text-gray-500 font-light">
                <a href="#" className="hover:text-gray-700 transition-colors duration-300">Privacy Policy</a>
                <a href="#" className="hover:text-gray-700 transition-colors duration-300">Terms of Service</a>
                <a href="#" className="hover:text-gray-700 transition-colors duration-300">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

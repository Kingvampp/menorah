'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useSearchParams } from 'next/navigation';
import Menorah3D from '@/components/Ring3D';
import Navbar from '@/components/Navbar';
import CartPreview from '@/components/CartPreview';

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const { addToCart, getTotalItems } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showSubCategories, setShowSubCategories] = useState(false);
  const [currentMainCategory, setCurrentMainCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [showProductPopup, setShowProductPopup] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageZoom, setShowImageZoom] = useState(false);
  const [zoomedImageIndex, setZoomedImageIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const category = searchParams.get('category');
    const product = searchParams.get('product');
    
    if (category) {
      setSelectedCategory(category);
    }
    
    if (product) {
      const foundProduct = products.find(p => p.id === product);
      if (foundProduct) {
        setSelectedProduct(foundProduct);
        setShowProductPopup(true);
      }
    }
  }, [searchParams]);

  // Cleanup effect to restore scrolling when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Effect to handle popup state changes
  useEffect(() => {
    if (showProductPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showProductPopup]);

  const products = [
    {
      id: "amethyst-ring",
      name: "Amethyst Centerpiece Ring",
      price: "$2,850",
      description: "Amethyst centerpiece ring with diamond side accents 24k gold",
      image: "/Images/amethyst-ring-1.jpeg",
      features: ["24k Gold", "Amethyst Centerpiece", "Diamond Side Accents"],
      category: "women"
    },
    {
      id: "elegant-earrings",
      name: "Elegant Pearl Earrings",
      price: "$1,200",
      description: "Sophisticated pearl earrings with diamond accents",
      image: "/api/placeholder/400/400",
      features: ["Freshwater Pearls", "Diamond Accents", "18k Gold"],
      category: "women"
    },
    {
      id: "bold-ring",
      name: "Men's Signet Ring",
      price: "$1,800",
      description: "Bold signet ring with personalized engraving option",
      image: "/api/placeholder/400/400",
      features: ["Sterling Silver", "Personalized", "Bold Design"],
      category: "men"
    },
    {
      id: 4,
      name: "Diamond Solitaire Ring",
      price: "$2,500",
      description: "Classic solitaire ring with brilliant-cut diamond",
      image: "/api/placeholder/400/400",
      features: ["1ct Diamond", "Platinum Setting", "GIA Certified"],
      category: "women"
    },
    {
      id: 5,
      name: "Men's Gold Cufflinks",
      price: "$850",
      description: "Handcrafted gold cufflinks with subtle geometric patterns",
      image: "/api/placeholder/400/400",
      features: ["18k Gold", "Handcrafted", "Classic Design"],
      category: "men"
    },
    {
      id: 6,
      name: "Men's Signet Ring",
      price: "$1,800",
      description: "Bold signet ring with personalized engraving option",
      image: "/api/placeholder/400/400",
      features: ["Sterling Silver", "Personalized", "Bold Design"],
      category: "men"
    },
    {
      id: 7,
      name: "Luxury Royal Menorah",
      price: "$6,800",
      description: "Opulent design featuring rare gemstones and intricate filigree work",
      image: "/api/placeholder/400/400",
      features: ["24k Gold", "Rare Gemstones", "Royal Design"],
      category: "unisex"
    },
    {
      id: 8,
      name: "Vintage Art Deco Menorah",
      price: "$4,500",
      description: "Inspired by 1920s Art Deco style with emerald accents",
      image: "/api/placeholder/400/400",
      features: ["White Gold", "Emeralds", "Art Deco Style"],
      category: "unisex"
    },
    {
      id: 9,
      name: "Diamond Tennis Necklace",
      price: "$3,200",
      description: "Classic tennis necklace with brilliant-cut diamonds",
      image: "/api/placeholder/400/400",
      features: ["18k Gold", "Diamonds", "Tennis Style"],
      category: "necklaces"
    },
    {
      id: 10,
      name: "Pearl Drop Earrings",
      price: "$1,800",
      description: "Elegant pearl drop earrings with diamond accents",
      image: "/api/placeholder/400/400",
      features: ["Freshwater Pearls", "Diamonds", "18k Gold"],
      category: "earrings"
    },
    {
      id: 11,
      name: "Gold Chain Bracelet",
      price: "$950",
      description: "Sophisticated gold chain bracelet with diamond clasp",
      image: "/api/placeholder/400/400",
      features: ["18k Gold", "Diamond Clasp", "Adjustable"],
      category: "bracelets"
    },
    {
      id: 12,
      name: "Solitaire Diamond Ring",
      price: "$2,200",
      description: "Classic solitaire ring with brilliant-cut diamond",
      image: "/api/placeholder/400/400",
      features: ["1ct Diamond", "Platinum", "Classic Setting"],
      category: "rings"
    },
    {
      id: 13,
      name: "Diamond Pendant",
      price: "$1,500",
      description: "Elegant diamond pendant on gold chain",
      image: "/api/placeholder/400/400",
      features: ["0.5ct Diamond", "18k Gold", "Chain Included"],
      category: "pendants"
    }
  ];


  const handleMainCategoryClick = (category: string) => {
    if (category === 'all') {
      setSelectedCategory('all');
      setShowSubCategories(false);
      setCurrentMainCategory('all');
    } else {
      setCurrentMainCategory(category);
      setShowSubCategories(true);
      setSelectedCategory(category);
    }
  };

  const handleSubCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleBackToMain = () => {
    setShowSubCategories(false);
    setCurrentMainCategory('all');
    setSelectedCategory('all');
  };

  const handleProductClick = (product: typeof products[0]) => {
    setSelectedProduct(product);
    setShowProductPopup(true);
    setCurrentImageIndex(0);
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
  };

  const handleClosePopup = () => {
    setShowProductPopup(false);
    setSelectedProduct(null);
    setCurrentImageIndex(0);
    // Restore background scrolling
    document.body.style.overflow = 'unset';
  };


  const handleImageZoom = (imageIndex: number) => {
    setZoomedImageIndex(imageIndex);
    setShowImageZoom(true);
  };

  const handleCloseZoom = () => {
    setShowImageZoom(false);
  };

  const filteredProducts = products.filter(product => 
    selectedCategory === 'all' || product.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[20vh] flex items-center pt-8 overflow-hidden bg-white">
        
        {/* Elegant Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border border-gray-300 rotate-45"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border border-gray-300 rotate-12"></div>
          <div className="absolute bottom-32 left-32 w-40 h-40 border border-gray-300 rotate-45"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 border border-gray-300 rotate-12"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <div className="text-center space-y-4">
            {/* Empty space for visual balance */}
            <div className="max-w-2xl mx-auto" style={{ paddingTop: '20px' }}>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-16 w-1 h-1 bg-gray-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-20 w-1.5 h-1.5 bg-gray-300 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/3 right-10 w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-500"></div>
      </section>

      {/* Elegant Category Navigation */}
      <section className="pt-2 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {!showSubCategories ? (
            // Main Categories
            <div className="flex gap-6 overflow-x-auto scrollbar-hide px-4 md:justify-center md:overflow-x-visible md:px-0">
              {/* For Her */}
              <div 
                className="group cursor-pointer relative overflow-hidden bg-white border border-gray-200 rounded-lg flex-shrink-0 transition-all duration-300 hover:shadow-lg"
                style={{ width: '240px', height: '280px' }}
                onClick={() => handleMainCategoryClick('women')}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="/models/forher.jpg" 
                    alt="For Her Collection" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-medium tracking-wider uppercase text-gray-900">
                    For Her
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">Elegant jewelry for women</p>
                </div>
                {selectedCategory === 'women' && (
                  <div className="absolute inset-0 border-2 border-gray-900 rounded-lg"></div>
                )}
              </div>

              {/* For Him */}
              <div 
                className="group cursor-pointer relative overflow-hidden bg-white border border-gray-200 rounded-lg flex-shrink-0 transition-all duration-300 hover:shadow-lg"
                style={{ width: '240px', height: '280px' }}
                onClick={() => handleMainCategoryClick('men')}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="/models/forhim.png" 
                    alt="For Him Collection" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-medium tracking-wider uppercase text-gray-900">
                    For Him
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">Bold pieces for men</p>
                </div>
                {selectedCategory === 'men' && (
                  <div className="absolute inset-0 border-2 border-gray-900 rounded-lg"></div>
                )}
              </div>
          
              {/* View All */}
              <div 
                className="group cursor-pointer relative overflow-hidden bg-white border border-gray-200 rounded-lg flex-shrink-0 transition-all duration-300 hover:shadow-lg"
                style={{ width: '240px', height: '280px' }}
                onClick={() => handleMainCategoryClick('all')}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="/models/viewall.png" 
                    alt="View All Collection" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 w-full h-full">
                    <Canvas
                      camera={{ position: [0, 0, 3], fov: 40 }}
                      style={{ width: '100%', height: '100%' }}
                    >
              <Suspense fallback={null}>
                <Menorah3D />
              </Suspense>
            </Canvas>
          </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-medium tracking-wider uppercase text-gray-900">
                    View All
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">Complete collection</p>
                </div>
                {selectedCategory === 'all' && (
                  <div className="absolute inset-0 border-2 border-gray-900 rounded-lg"></div>
                )}
              </div>
            </div>
          ) : (
            // Sub Categories
            <div className="space-y-6">
              {/* Back Button */}
              <div className="flex justify-center">
                <button 
                  onClick={handleBackToMain}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Categories
                </button>
              </div>

              {/* Sub Category Grid */}
              <div className="flex gap-4 overflow-x-auto scrollbar-hide px-4 md:justify-center md:flex-wrap md:overflow-x-visible md:px-0">
                {currentMainCategory === 'women' || currentMainCategory === 'all' ? (
                  <>
                    {/* Rings */}
                    <div 
                      className="group cursor-pointer relative overflow-hidden bg-white border border-gray-200 rounded-lg flex-shrink-0 transition-all duration-300 hover:shadow-lg"
                      style={{ width: '180px', height: '220px' }}
                      onClick={() => handleSubCategoryClick('rings')}
                    >
                      <div className="relative h-32 overflow-hidden">
                        <img 
                          src="/models/rings.jpg" 
                          alt="Rings" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="text-sm font-medium tracking-wider uppercase text-gray-900">
                          Rings
                        </h3>
                      </div>
                      {selectedCategory === 'rings' && (
                        <div className="absolute inset-0 border-2 border-gray-900 rounded-lg"></div>
                      )}
                    </div>

                    {/* Bracelets */}
                    <div 
                      className="group cursor-pointer relative overflow-hidden bg-white border border-gray-200 rounded-lg flex-shrink-0 transition-all duration-300 hover:shadow-lg"
                      style={{ width: '180px', height: '220px' }}
                      onClick={() => handleSubCategoryClick('bracelets')}
                    >
                      <div className="relative h-32 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <div className="text-6xl">⌚</div>
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="text-sm font-medium tracking-wider uppercase text-gray-900">
                          Bracelets
                        </h3>
                      </div>
                      {selectedCategory === 'bracelets' && (
                        <div className="absolute inset-0 border-2 border-gray-900 rounded-lg"></div>
                      )}
                    </div>

                    {/* Earrings */}
                    <div 
                      className="group cursor-pointer relative overflow-hidden bg-white border border-gray-200 rounded-lg flex-shrink-0 transition-all duration-300 hover:shadow-lg"
                      style={{ width: '180px', height: '220px' }}
                      onClick={() => handleSubCategoryClick('earrings')}
                    >
                      <div className="relative h-32 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <div className="text-6xl">💎</div>
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="text-sm font-medium tracking-wider uppercase text-gray-900">
                          Earrings
                        </h3>
                      </div>
                      {selectedCategory === 'earrings' && (
                        <div className="absolute inset-0 border-2 border-gray-900 rounded-lg"></div>
                      )}
                    </div>

                    {/* Necklaces */}
                    <div 
                      className="group cursor-pointer relative overflow-hidden bg-white border border-gray-200 rounded-lg flex-shrink-0 transition-all duration-300 hover:shadow-lg"
                      style={{ width: '180px', height: '220px' }}
                      onClick={() => handleSubCategoryClick('necklaces')}
                    >
                      <div className="relative h-32 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <div className="text-6xl">📿</div>
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="text-sm font-medium tracking-wider uppercase text-gray-900">
                          Necklaces
                        </h3>
                      </div>
                      {selectedCategory === 'necklaces' && (
                        <div className="absolute inset-0 border-2 border-gray-900 rounded-lg"></div>
                      )}
                    </div>

                    {/* Pendants */}
                    <div 
                      className="group cursor-pointer relative overflow-hidden bg-white border border-gray-200 rounded-lg flex-shrink-0 transition-all duration-300 hover:shadow-lg"
                      style={{ width: '180px', height: '220px' }}
                      onClick={() => handleSubCategoryClick('pendants')}
                    >
                      <div className="relative h-32 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <div className="text-6xl">🔗</div>
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="text-sm font-medium tracking-wider uppercase text-gray-900">
                          Pendants
                        </h3>
                      </div>
                      {selectedCategory === 'pendants' && (
                        <div className="absolute inset-0 border-2 border-gray-900 rounded-lg"></div>
                      )}
                    </div>

                    {/* View All */}
                    <div 
                      className="group cursor-pointer relative overflow-hidden bg-white border border-gray-200 rounded-lg flex-shrink-0 transition-all duration-300 hover:shadow-lg"
                      style={{ width: '180px', height: '220px' }}
                      onClick={() => handleSubCategoryClick(currentMainCategory)}
                    >
                      <div className="relative h-32 overflow-hidden bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                        <div className="text-6xl">🕎</div>
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="text-sm font-medium tracking-wider uppercase text-gray-900">
                          View All
                        </h3>
                      </div>
                      {selectedCategory === currentMainCategory && (
                        <div className="absolute inset-0 border-2 border-gray-900 rounded-lg"></div>
                      )}
                    </div>
                  </>
                ) : currentMainCategory === 'men' ? (
                  <>
                    {/* Rings */}
                    <div 
                      className="group cursor-pointer relative overflow-hidden bg-white border border-gray-200 rounded-lg flex-shrink-0 transition-all duration-300 hover:shadow-lg"
                      style={{ width: '180px', height: '220px' }}
                      onClick={() => handleSubCategoryClick('rings')}
                    >
                      <div className="relative h-32 overflow-hidden">
                        <img 
                          src="/models/rings.jpg" 
                          alt="Rings" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="text-sm font-medium tracking-wider uppercase text-gray-900">
                          Rings
                        </h3>
                      </div>
                      {selectedCategory === 'rings' && (
                        <div className="absolute inset-0 border-2 border-gray-900 rounded-lg"></div>
                      )}
                    </div>

                    {/* Bracelets */}
                    <div 
                      className="group cursor-pointer relative overflow-hidden bg-white border border-gray-200 rounded-lg flex-shrink-0 transition-all duration-300 hover:shadow-lg"
                      style={{ width: '180px', height: '220px' }}
                      onClick={() => handleSubCategoryClick('bracelets')}
                    >
                      <div className="relative h-32 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <div className="text-6xl">⌚</div>
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="text-sm font-medium tracking-wider uppercase text-gray-900">
                          Bracelets
                        </h3>
                      </div>
                      {selectedCategory === 'bracelets' && (
                        <div className="absolute inset-0 border-2 border-gray-900 rounded-lg"></div>
                      )}
                    </div>

                    {/* Necklaces */}
                    <div 
                      className="group cursor-pointer relative overflow-hidden bg-white border border-gray-200 rounded-lg flex-shrink-0 transition-all duration-300 hover:shadow-lg"
                      style={{ width: '180px', height: '220px' }}
                      onClick={() => handleSubCategoryClick('necklaces')}
                    >
                      <div className="relative h-32 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <div className="text-6xl">📿</div>
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="text-sm font-medium tracking-wider uppercase text-gray-900">
                          Necklaces
                        </h3>
                      </div>
                      {selectedCategory === 'necklaces' && (
                        <div className="absolute inset-0 border-2 border-gray-900 rounded-lg"></div>
                      )}
                    </div>

                    {/* Pendants */}
                    <div 
                      className="group cursor-pointer relative overflow-hidden bg-white border border-gray-200 rounded-lg flex-shrink-0 transition-all duration-300 hover:shadow-lg"
                      style={{ width: '180px', height: '220px' }}
                      onClick={() => handleSubCategoryClick('pendants')}
                    >
                      <div className="relative h-32 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <div className="text-6xl">🔗</div>
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="text-sm font-medium tracking-wider uppercase text-gray-900">
                          Pendants
                        </h3>
                      </div>
                      {selectedCategory === 'pendants' && (
                        <div className="absolute inset-0 border-2 border-gray-900 rounded-lg"></div>
                      )}
                    </div>

                    {/* View All */}
                    <div 
                      className="group cursor-pointer relative overflow-hidden bg-white border border-gray-200 rounded-lg flex-shrink-0 transition-all duration-300 hover:shadow-lg"
                      style={{ width: '180px', height: '220px' }}
                      onClick={() => handleSubCategoryClick('men')}
                    >
                      <div className="relative h-32 overflow-hidden bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                        <div className="text-6xl">🕎</div>
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="text-sm font-medium tracking-wider uppercase text-gray-900">
                          View All
                        </h3>
                      </div>
                      {selectedCategory === 'men' && (
                        <div className="absolute inset-0 border-2 border-gray-900 rounded-lg"></div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-center text-gray-600">
                    Sub-categories coming soon...
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="pt-10 pb-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-4 tracking-tight">
              {selectedCategory === 'all' ? 'Featured Pieces' : 
               selectedCategory === 'women' ? 'For Her' :
               selectedCategory === 'men' ? 'For Him' : 
               selectedCategory === 'necklaces' ? 'Necklaces' :
               selectedCategory === 'earrings' ? 'Earrings' :
               selectedCategory === 'bracelets' ? 'Bracelets' :
               selectedCategory === 'rings' ? 'Rings' :
               selectedCategory === 'pendants' ? 'Pendants' :
               'Unisex Collection'}
            </h2>
            <p className="text-xl text-gray-600 font-light">
              {selectedCategory === 'all' ? 'Each piece is a testament to our commitment to excellence' :
               selectedCategory === 'women' ? 'Elegant jewelry designed for the modern woman' :
               selectedCategory === 'men' ? 'Bold and refined pieces for the discerning gentleman' : 
               selectedCategory === 'necklaces' ? 'Elegant necklaces to complement any style' :
               selectedCategory === 'earrings' ? 'Sophisticated earrings for every occasion' :
               selectedCategory === 'bracelets' ? 'Refined bracelets that add the perfect finishing touch' :
               selectedCategory === 'rings' ? 'Timeless rings that make a statement' :
               selectedCategory === 'pendants' ? 'Beautiful pendants to express your personal style' :
               'Timeless pieces that work for everyone'}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer" onClick={() => handleProductClick(product)}>
                {/* Product Image Container */}
                <div className="relative aspect-[4/3] md:aspect-[3/2] lg:aspect-square max-h-64 lg:max-h-80 mb-4 overflow-hidden bg-white">
                    {/* Primary Image */}
                    <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0">
                      <div className="w-full h-full flex items-center justify-center bg-gray-50">
                        {product.id === 'amethyst-ring' ? (
                          <img 
                            src="/Images/amethyst-ring-1.jpeg" 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-6xl md:text-7xl lg:text-8xl">
                            {product.category === 'women' ? '💎' :
                             product.category === 'men' ? '💍' : '🕎'}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Secondary Image (Hover) */}
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100">
                        {product.id === 'amethyst-ring' ? (
                          <img 
                            src="/Images/amethyst-ring-2.jpg" 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-6xl md:text-7xl lg:text-8xl">✨</div>
                        )}
                      </div>
                  </div>
                </div>

                {/* Product Information - Tiffany Style */}
                <div className="text-center space-y-1">
                  <h3 className="text-sm font-light text-gray-900 tracking-wide uppercase">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-600 font-light">
                    {product.description.split('.')[0]}
                  </p>
                  <p className="text-sm font-light text-gray-900 tracking-wide">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Tiffany-Style Product Popup - Scrollable Layout */}
      {showProductPopup && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          {/* Header with Navigation */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
            {/* Left - Back Button */}
            <button 
              onClick={handleClosePopup}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">Back</span>
            </button>

            {/* Center - Product Name */}
            <h1 className="text-sm font-medium text-gray-900 tracking-wide uppercase">
              {selectedProduct.name}
            </h1>

            {/* Right - Cart Icon with Preview */}
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

           {/* Main Content - Mobile: Image Top, Desktop: 2-Column Layout */}
           <div className="flex flex-col lg:flex-row max-w-6xl mx-auto">
             {/* Mobile: Image First, Desktop: Product Information Left */}
             <div className="lg:w-1/2 lg:pr-8 order-2 lg:order-1">
               {/* Product Details Section */}
               <div className="px-4 py-6 space-y-6 text-center lg:text-left">
                 {/* Product Title & Price */}
                 <div>
                   <h2 className="text-2xl lg:text-3xl font-light text-gray-900 tracking-wide mb-1">
                     {selectedProduct.name}
                   </h2>
                   <p className="text-xl lg:text-2xl font-light text-gray-900 tracking-wide">
                     {selectedProduct.price}
                   </p>
                 </div>

                 {/* Product Description */}
                 <div>
                   <p className="text-gray-600 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                     {selectedProduct.description}
                   </p>
                 </div>

                 {/* Features */}
                 <div>
                   <h4 className="text-xs font-medium text-gray-900 tracking-widest uppercase mb-3">Features</h4>
                   <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                     {selectedProduct.features.map((feature, index) => (
                       <span key={index} className="text-xs text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                         {feature}
                       </span>
                     ))}
                   </div>
                 </div>

                 {/* Action Buttons */}
                 <div className="space-y-3 pt-4">
                   <button 
                     onClick={() => {
                       if (selectedProduct) {
                         addToCart({
                           id: String(selectedProduct.id),
                           name: selectedProduct.name,
                           price: selectedProduct.price,
                           description: selectedProduct.description,
                           image: selectedProduct.id === 'amethyst-ring' ? '/Images/amethyst-ring-1.jpeg' : selectedProduct.image
                         });
                         
                         // Show animation
                         setAddedToCart(true);
                         setTimeout(() => setAddedToCart(false), 2000);
                       }
                     }}
                     className={`w-full lg:w-auto lg:min-w-[200px] py-4 px-6 text-sm font-medium tracking-widest uppercase transition-all duration-300 ${
                       addedToCart 
                         ? 'bg-green-600 text-white transform scale-105' 
                         : 'bg-black text-white hover:bg-gray-800'
                     }`}
                   >
                     {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
                   </button>
                   <button className="w-full lg:w-auto lg:min-w-[200px] border border-gray-300 text-gray-900 py-4 px-6 text-sm font-medium tracking-widest uppercase hover:bg-gray-50 transition-colors">
                     Contact Your Advisor
                   </button>
                 </div>

                 {/* Additional Info */}
                 <div className="pt-6 border-t border-gray-200 space-y-3">
                   <div className="flex items-center gap-2 text-sm text-gray-600 justify-center lg:justify-start">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                     </svg>
                     Free shipping worldwide
                   </div>
                   <div className="flex items-center gap-2 text-sm text-gray-600 justify-center lg:justify-start">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                     Authenticity guaranteed
                   </div>
                   <div className="flex items-center gap-2 text-sm text-gray-600 justify-center lg:justify-start">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                     </svg>
                     Lifetime warranty
                   </div>
                 </div>
               </div>
             </div>

             {/* Mobile: Image First, Desktop: Product Images Right */}
             <div className="lg:w-1/2 lg:pl-8 order-1 lg:order-2">
               {/* Product Image Section */}
               <div className="relative bg-white">
                 {/* Main Image Display */}
                 <div className="aspect-square max-h-[600px] flex items-center justify-center relative bg-gray-50">
                <div 
                  className="w-full h-full flex items-center justify-center cursor-pointer group"
                  onClick={() => handleImageZoom(currentImageIndex)}
                >
                  <div className="w-full h-full transition-transform duration-300 group-hover:scale-105">
                    {selectedProduct.id === 'amethyst-ring' ? (
                      <img 
                        src={`/Images/amethyst-ring-${currentImageIndex + 1}.${currentImageIndex === 0 ? 'jpeg' : 'jpg'}`}
                        alt={`${selectedProduct.name} - Image ${currentImageIndex + 1}`}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-[8rem]">
                        {currentImageIndex === 0 ? (
                          selectedProduct.category === 'women' ? '💎' :
                          selectedProduct.category === 'men' ? '💍' : '🕎'
                        ) : currentImageIndex === 1 ? '✨' :
                          currentImageIndex === 2 ? '💫' :
                          currentImageIndex === 3 ? '🌟' :
                          currentImageIndex === 4 ? '💎' : '💍'}
                      </div>
                    )}
                  </div>
                </div>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  {currentImageIndex + 1} / {selectedProduct.id === 'amethyst-ring' ? 4 : 6}
                </div>

                {/* Zoom Hint - Tiffany Style */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                    Tap to zoom
                  </div>
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex gap-3 justify-center overflow-x-auto scrollbar-hide">
                  {(selectedProduct.id === 'amethyst-ring' ? [0, 1, 2, 3] : [0, 1, 2, 3, 4, 5]).map((index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-12 h-12 rounded border-2 transition-all duration-200 ${
                        currentImageIndex === index 
                          ? 'border-gray-900' 
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                       {selectedProduct.id === 'amethyst-ring' && index < 4 ? (
                         <img 
                           src={`/Images/amethyst-ring-${index + 1}.${index === 0 ? 'jpeg' : 'jpg'}`}
                           alt={`${selectedProduct.name} - Thumbnail ${index + 1}`}
                           className="w-full h-full object-cover rounded"
                         />
                       ) : (
                         <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded">
                           <div className="w-6 h-6 bg-gray-300 rounded"></div>
                         </div>
                       )}
                    </button>
                  ))}
                </div>
              </div>
             </div>
             </div>
           </div>

           {/* You May Also Like Section */}
           <div className="border-t border-gray-200 mt-16 pt-12">
             <div className="max-w-6xl mx-auto px-4">
               <h3 className="text-2xl font-light text-gray-900 tracking-wide text-center mb-8">
                 You May Also Like
               </h3>
               
               {/* Carousel Container */}
               <div className="relative">
                 {/* Carousel Items */}
                 <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4" style={{ scrollSnapType: 'x mandatory' }}>
                   {products.filter(product => product.id !== selectedProduct.id).slice(0, 6).map((product) => (
                     <div 
                       key={product.id} 
                       className="flex-shrink-0 w-64 cursor-pointer group"
                       onClick={() => {
                         setSelectedProduct(product);
                         setCurrentImageIndex(0);
                         setZoomedImageIndex(0);
                       }}
                       style={{ scrollSnapAlign: 'start' }}
                     >
                       {/* Product Image */}
                       <div className="relative aspect-square mb-4 overflow-hidden bg-white rounded-lg">
                         <div className="w-full h-full flex items-center justify-center bg-gray-50">
                           {product.id === 'amethyst-ring' ? (
                             <img 
                               src="/Images/amethyst-ring-1.jpeg" 
                               alt={product.name}
                               className="w-full h-full object-contain"
                             />
                           ) : (
                             <div className="text-6xl">
                               {product.category === 'women' ? '💎' :
                                product.category === 'men' ? '💍' : '🕎'}
                             </div>
                           )}
                         </div>
                         
                         {/* Hover Overlay */}
                         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                           <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                             <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                             </svg>
                           </div>
                         </div>
                       </div>

                       {/* Product Info */}
                       <div className="text-center space-y-2">
                         <h4 className="text-sm font-light text-gray-900 tracking-wide uppercase">
                           {product.name}
                         </h4>
                         <p className="text-xs text-gray-600 font-light">
                           {product.description.split('.')[0]}
                         </p>
                         <p className="text-sm font-light text-gray-900 tracking-wide">
                           {product.price}
                         </p>
                       </div>
                     </div>
                   ))}
                 </div>

                 {/* Navigation Arrows */}
                 <button 
                   className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-gray-200 hover:bg-white transition-colors"
                   onClick={() => {
                     const container = document.querySelector('.overflow-x-auto');
                     if (container) {
                       container.scrollBy({ left: -280, behavior: 'smooth' });
                     }
                   }}
                 >
                   <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                   </svg>
                 </button>

                 <button 
                   className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-gray-200 hover:bg-white transition-colors"
                   onClick={() => {
                     const container = document.querySelector('.overflow-x-auto');
                     if (container) {
                       container.scrollBy({ left: 280, behavior: 'smooth' });
                     }
                   }}
                 >
                   <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                   </svg>
                 </button>
               </div>
             </div>
           </div>
        </div>
      )}

      {/* Enhanced Image Zoom Modal - Tiffany Style */}
      {showImageZoom && (
        <div className="fixed inset-0 z-[60] bg-white flex items-center justify-center">
          {/* Header Controls */}
          <div className="absolute top-0 left-0 right-0 z-20 bg-white/90 backdrop-blur-sm border-b border-gray-200">
            <div className="flex items-center justify-between px-6 py-4">
              {/* Left - Back Button */}
              <button 
                onClick={handleCloseZoom}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm font-medium">Back</span>
              </button>

              {/* Center - Image Counter */}
              <div className="text-gray-900 text-sm font-medium">
                {zoomedImageIndex + 1} / 6
              </div>

              {/* Right - Cart Icon with Preview */}
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
          </div>

          {/* Main Image Display */}
          <div className="w-full h-full flex items-center justify-center relative">
             <div className="w-full h-full transition-all duration-500 ease-out">
               {selectedProduct?.id === 'amethyst-ring' && zoomedImageIndex < 4 ? (
                 <img 
                   src={`/Images/amethyst-ring-${zoomedImageIndex + 1}.${zoomedImageIndex === 0 ? 'jpeg' : 'jpg'}`}
                   alt={`${selectedProduct.name} - Zoomed Image ${zoomedImageIndex + 1}`}
                   className="w-full h-full object-contain"
                 />
               ) : (
                 <div className="text-[25rem]">
                   {zoomedImageIndex === 0 ? (
                     selectedProduct?.category === 'women' ? '💎' :
                     selectedProduct?.category === 'men' ? '💍' : '🕎'
                   ) : zoomedImageIndex === 1 ? '✨' :
                     zoomedImageIndex === 2 ? '💫' :
                     zoomedImageIndex === 3 ? '🌟' :
                     zoomedImageIndex === 4 ? '💎' : '💍'}
                 </div>
               )}
             </div>

            {/* Navigation Arrows */}
            <button 
              onClick={() => setZoomedImageIndex(Math.max(0, zoomedImageIndex - 1))}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 transition-colors bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-gray-200 disabled:opacity-50"
              disabled={zoomedImageIndex === 0}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button 
              onClick={() => setZoomedImageIndex(Math.min(5, zoomedImageIndex + 1))}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 transition-colors bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-gray-200 disabled:opacity-50"
              disabled={zoomedImageIndex === 5}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Bottom Thumbnail Strip */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200">
            <div className="flex justify-center gap-3 p-4">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <button
                  key={index}
                  onClick={() => setZoomedImageIndex(index)}
                  className={`flex-shrink-0 w-12 h-12 rounded-lg border-2 transition-all duration-200 ${
                    zoomedImageIndex === index 
                      ? 'border-gray-900' 
                      : 'border-gray-300 hover:border-gray-500'
                  }`}
                >
                   {selectedProduct?.id === 'amethyst-ring' && index < 4 ? (
                     <img 
                       src={`/Images/amethyst-ring-${index + 1}.${index === 0 ? 'jpeg' : 'jpg'}`}
                       alt={`${selectedProduct.name} - Zoom Thumbnail ${index + 1}`}
                       className="w-full h-full object-cover rounded"
                     />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded">
                       <div className="w-6 h-6 bg-gray-300 rounded"></div>
                     </div>
                   )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

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

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsPageContent />
    </Suspense>
  );
}

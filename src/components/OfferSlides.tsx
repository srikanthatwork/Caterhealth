import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Star, Shield, Zap, Heart, Gift, Clock } from 'lucide-react';

const OfferSlides = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      title: "Limited Time: 40% OFF",
      subtitle: "Premium Gut Health Bundle",
      description: "Get our best-selling Gut Balance Pro + Daily Probiotic combo",
      originalPrice: "₹89.98",
      salePrice: "₹53.99",
      savings: "₹35.99",
      badge: "FLASH SALE",
      badgeColor: "bg-red-600",
      ctaText: "Claim Offer",
      ctaLink: "/category/gut-health",
      bgGradient: "from-red-500 via-red-600 to-red-700",
      image: "https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: ["50B CFU Formula", "10 Targeted Strains", "30-Day Supply"],
      timer: "Ends in 23:45:12",
      icon: <Gift className="w-8 h-8" />
    },
    {
      id: 2,
      title: "New Customer Special",
      subtitle: "Start Your Health Journey",
      description: "First-time buyers get exclusive pricing on our starter pack",
      originalPrice: "₹49.99",
      salePrice: "₹29.99",
      savings: "₹20.00",
      badge: "NEW CUSTOMER",
      badgeColor: "bg-green-600",
      ctaText: "Get Started",
      ctaLink: "/products",
      bgGradient: "from-green-500 via-green-600 to-green-700",
      image: "https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: ["25B CFU Daily Formula", "Free Shipping", "Money-Back Guarantee"],
      timer: "Limited Time Offer",
      icon: <Star className="w-8 h-8" />
    },
    {
      id: 3,
      title: "Women's Health Special",
      subtitle: "Feminine Flora Collection",
      description: "Specially formulated probiotics for women's unique health needs",
      originalPrice: "₹94.98",
      salePrice: "₹67.99",
      savings: "₹26.99",
      badge: "WOMEN'S HEALTH",
      badgeColor: "bg-pink-600",
      ctaText: "Shop Women's",
      ctaLink: "/category/womens-health",
      bgGradient: "from-pink-500 via-pink-600 to-pink-700",
      image: "https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: ["Vaginal Health Support", "Urinary Tract Health", "Hormonal Balance"],
      timer: "This Week Only",
      icon: <Heart className="w-8 h-8" />
    },
    {
      id: 4,
      title: "Immune Boost Bundle",
      subtitle: "Strengthen Your Defenses",
      description: "Advanced immune support with targeted probiotic strains",
      originalPrice: "₹79.98",
      salePrice: "₹59.99",
      savings: "₹19.99",
      badge: "IMMUNE BOOST",
      badgeColor: "bg-blue-600",
      ctaText: "Boost Immunity",
      ctaLink: "/category/immune-support",
      bgGradient: "from-blue-500 via-blue-600 to-blue-700",
      image: "https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: ["Immune-Specific Strains", "Seasonal Protection", "Clinical Strength"],
      timer: "While Supplies Last",
      icon: <Shield className="w-8 h-8" />
    },
    {
      id: 5,
      title: "Subscribe & Save 30%",
      subtitle: "Never Run Out Again",
      description: "Automatic delivery with maximum savings on all products",
      originalPrice: "Regular Price",
      salePrice: "30% OFF",
      savings: "Every Order",
      badge: "SUBSCRIPTION",
      badgeColor: "bg-purple-600",
      ctaText: "Subscribe Now",
      ctaLink: "/products",
      bgGradient: "from-purple-500 via-purple-600 to-purple-700",
      image: "https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: ["Free Shipping Always", "Cancel Anytime", "Priority Support"],
      timer: "Ongoing Offer",
      icon: <Zap className="w-8 h-8" />
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const currentOffer = slides[currentSlide];

  return (
    <section className="relative overflow-hidden bg-gray-900">
      {/* Background with gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentOffer.bgGradient} transition-all duration-1000`}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
      </div>

      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[500px]">
          {/* Content Side */}
          <div className="text-white space-y-8">
            {/* Badge and Timer */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className={`inline-flex items-center space-x-2 ${currentOffer.badgeColor} px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg`}>
                {currentOffer.icon}
                <span>{currentOffer.badge}</span>
              </div>
              <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-semibold">{currentOffer.timer}</span>
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              <div>
                <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight">
                  {currentOffer.title}
                </h1>
                <h2 className="text-2xl md:text-3xl font-bold text-white/90 mb-4">
                  {currentOffer.subtitle}
                </h2>
                <p className="text-xl text-white/80 leading-relaxed max-w-lg">
                  {currentOffer.description}
                </p>
              </div>

              {/* Pricing */}
              <div className="flex items-end space-x-4">
                <div className="text-6xl font-black text-white">
                  {currentOffer.salePrice}
                </div>
                <div className="pb-2">
                  <div className="text-xl text-white/60 line-through">
                    {currentOffer.originalPrice}
                  </div>
                  <div className="text-lg font-bold text-green-300">
                    Save {currentOffer.savings}
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                {currentOffer.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-white/90 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to={currentOffer.ctaLink}
                  className="bg-white text-gray-900 hover:bg-gray-100 font-black py-4 px-8 rounded-xl transition-all duration-300 inline-flex items-center justify-center group shadow-2xl hover:shadow-3xl hover:scale-105"
                >
                  <span className="text-lg">{currentOffer.ctaText}</span>
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/blog"
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-4 px-8 rounded-xl transition-all duration-300 inline-flex items-center justify-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src={currentOffer.image}
                alt={currentOffer.subtitle}
                className="w-full max-w-md mx-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 bg-white/20 backdrop-blur-sm rounded-2xl p-4 animate-bounce">
                <Star className="w-8 h-8 text-yellow-300 fill-current" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white/20 backdrop-blur-sm rounded-2xl p-4 animate-pulse">
                <Shield className="w-8 h-8 text-green-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mt-12">
          {/* Slide Indicators */}
          <div className="flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white scale-125' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          {/* Arrow Controls */}
          <div className="flex space-x-4">
            <button
              onClick={prevSlide}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Auto-play indicator */}
        <div className="flex items-center justify-center mt-6">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="text-white/60 hover:text-white text-sm font-medium transition-colors"
          >
            {isAutoPlaying ? 'Pause Auto-play' : 'Resume Auto-play'}
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div 
          className="h-full bg-white transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </section>
  );
};

export default OfferSlides;
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Leaf, Heart, Star, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import OfferSlides from '../components/OfferSlides';

const HomePage = () => {
  const { dispatch } = useCart();

  const categories = [
    {
      name: 'Gut Health',
      description: 'Balance your microbiome with 50B CFU advanced strains',
      icon: <Leaf className="w-8 h-8" />,
      href: '/category/gut-health',
      color: 'bg-green-100 text-green-600'
    },
    {
      name: 'Immune Support',
      description: 'Strengthen defenses with targeted probiotic blends',
      icon: <Shield className="w-8 h-8" />,
      href: '/category/immune-support',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      name: 'Women\'s Health',
      description: 'Formulated for feminine flora & hormonal balance',
      icon: <Heart className="w-8 h-8" />,
      href: '/category/womens-health',
      color: 'bg-pink-100 text-pink-600'
    }
  ];

  const bestSellers = [
    {
      id: 'gut-balance-pro',
      name: 'Gut Balance Pro',
      price: 49.99,
      rating: 4.8,
      reviews: 1284,
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'gut-health',
      badge: 'Best Seller'
    },
    {
      id: 'immune-support',
      name: 'Immune Support',
      price: 44.99,
      rating: 4.7,
      reviews: 892,
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'immune-support',
      badge: 'New'
    },
    {
      id: 'womens-flora',
      name: 'Women\'s Flora',
      price: 47.99,
      rating: 4.9,
      reviews: 756,
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'womens-health',
      badge: 'Top Rated'
    }
  ];

  const addToCart = (product: any) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div className="min-h-screen">
      {/* Offer Slides Section */}
      <OfferSlides />

      {/* Trust Badges */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-red-100 p-3 rounded-full mb-3">
                <Check className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Doctor-Approved</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-red-100 p-3 rounded-full mb-3">
                <Leaf className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900">100% Vegan</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-red-100 p-3 rounded-full mb-3">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900">
                Third-Party Tested
              </h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-red-100 p-3 rounded-full mb-3">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900">
                Free Shipping Over $49
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600">
              Targeted solutions for your specific health needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.href}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div
                  className={`w-16 h-16 rounded-lg ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex items-center text-red-600 font-semibold">
                  Shop Now <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Best Sellers
            </h2>
            <p className="text-xl text-gray-600">
              Our most popular probiotics loved by thousands
            </p>
          </div>
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bestSellers.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.5rem",
               
                }}
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-coral-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {product.badge}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                  <div
                    className="flex items-center justify-between "
                    style={{
                      // border: "1px solid #e5e7eb",
                      // borderRadius: "0.5rem",
                      // padding: "1rem",
                    }}
                  >
                    <span className="text-2xl font-bold text-red-600">
                      ₹{product.price}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
            {bestSellers.map((product) => (
              <div
                key={product.id}
                className="w-[240px] mx-auto bg-white rounded-xl border border-gray-200 
                 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* Image & Badge */}
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[200px] object-cover"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-yellow-400 text-white text-sm font-semibold px-2.5 py-1 rounded-full">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 leading-snug mb-1">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Price & Button */}
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-red-600">
                      ₹{product.price}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold text-sm py-2 px-4 rounded-lg"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Health Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join over 100,000 satisfied customers who trust Cater Health for
            their probiotic needs
          </p>
          <Link
            to="/category/gut-health"
            className="bg-white text-red-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors inline-flex items-center"
          >
            Shop Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
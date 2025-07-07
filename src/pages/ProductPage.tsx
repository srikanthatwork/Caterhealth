import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Plus, Minus, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const product = {
    id: 'gut-balance-pro',
    name: 'Gut Balance Pro – 50B CFU Advanced Formula',
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.8,
    reviews: 1284,
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'gut-health',
    inStock: true,
    description: 'Our most advanced probiotic formula with 50 billion CFUs and 10 targeted strains specifically chosen for comprehensive gut repair and maintenance.',
    benefits: [
      'Reduces bloating within 14 days',
      '10 targeted strains for gut lining repair',
      'Supports healthy digestion and nutrient absorption',
      'Boosts immune system function',
      'Improves mental clarity and mood'
    ],
    ingredients: [
      'Lactobacillus acidophilus LA-14® (10B CFU)',
      'Bifidobacterium lactis BL-04® (10B CFU)',
      'Lactobacillus plantarum LP-115® (8B CFU)',
      'Lactobacillus casei LC-11® (6B CFU)',
      'And 6 more targeted strains'
    ],
    howToUse: 'Take 1 capsule daily with food, preferably in the morning. Store in a cool, dry place.',
    reviews: [
      {
        id: 1,
        name: 'Sarah M.',
        rating: 5,
        comment: 'This has completely transformed my digestive health. No more bloating!',
        date: '2 weeks ago'
      },
      {
        id: 2,
        name: 'Michael R.',
        rating: 5,
        comment: 'Best probiotic I\'ve ever used. Highly recommend for anyone with gut issues.',
        date: '1 month ago'
      },
      {
        id: 3,
        name: 'Jennifer L.',
        rating: 4,
        comment: 'Great product, noticed improvements in just a few days.',
        date: '3 weeks ago'
      }
    ]
  };

  const addToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
  };

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'ingredients', label: 'Ingredients' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'usage', label: 'How to Use' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm breadcrumbs">
            <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to={`/category/${product.category}`} className="text-gray-500 hover:text-gray-700">
              Gut Health
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
              )}
              <span className="bg-coral-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Save ₹{(product.originalPrice! - product.price).toFixed(2)}
              </span>
            </div>

            <p className="text-gray-600 text-lg">{product.description}</p>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Key Benefits:</h3>
              <ul className="space-y-2">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={addToCart}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 text-green-800">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="font-medium">In Stock - Ready to Ship</span>
              </div>
              <p className="text-sm text-red-700 mt-1">
                Free shipping on orders over $49 • 30-day money-back guarantee
              </p>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">{product.description}</p>
                <p className="text-gray-700">
                  Our Gut Balance Pro formula contains clinically studied probiotic strains that work synergistically to restore and maintain optimal gut health. Each capsule delivers 50 billion CFUs of beneficial bacteria to support digestive wellness and overall health.
                </p>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Ingredients:</h3>
                <ul className="space-y-2">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <div key={review.id} className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900">{review.name}</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'usage' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Use:</h3>
                <p className="text-gray-700 mb-4">{product.howToUse}</p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Pro Tips:</h4>
                  <ul className="space-y-1 text-blue-800">
                    <li>• Take consistently at the same time each day for best results</li>
                    <li>• Avoid taking with hot beverages or alcohol</li>
                    <li>• Results typically seen within 2-4 weeks of consistent use</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
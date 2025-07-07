import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Filter } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CategoryPage = () => {
  const { category } = useParams();
  const { dispatch } = useCart();
  const [sortBy, setSortBy] = useState('best-selling');

  const categoryData = {
    'gut-health': {
      title: 'Advanced Gut Health Solutions',
      description: 'Target bloating, IBS, and gut flora imbalance with clinically studied strains',
      products: [
        {
          id: 'gut-balance-pro',
          name: 'Gut Balance Pro',
          price: 49.99,
          originalPrice: 59.99,
          rating: 4.8,
          reviews: 1284,
          image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
          category: 'gut-health',
          description: '50B CFU – For comprehensive gut repair',
          badge: 'Best Seller'
        },
        {
          id: 'daily-probiotic',
          name: 'Daily Probiotic',
          price: 39.99,
          rating: 4.6,
          reviews: 892,
          image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
          category: 'gut-health',
          description: '25B CFU – Everyday digestive maintenance',
          badge: 'Popular'
        },
        {
          id: 'advanced-digestive',
          name: 'Advanced Digestive',
          price: 54.99,
          rating: 4.7,
          reviews: 567,
          image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
          category: 'gut-health',
          description: '75B CFU – Maximum strength formula',
          badge: 'Premium'
        }
      ]
    },
    'immune-support': {
      title: 'Immune System Support',
      description: 'Strengthen your natural defenses with targeted probiotic blends',
      products: [
        {
          id: 'immune-support',
          name: 'Immune Support',
          price: 44.99,
          rating: 4.7,
          reviews: 892,
          image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
          category: 'immune-support',
          description: 'Boost immunity with specialized strains',
          badge: 'New'
        },
        {
          id: 'defense-formula',
          name: 'Defense Formula',
          price: 52.99,
          rating: 4.8,
          reviews: 654,
          image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
          category: 'immune-support',
          description: 'Advanced immune system protection',
          badge: 'Top Rated'
        }
      ]
    },
    'womens-health': {
      title: 'Probiotics Designed for Women',
      description: 'Contains L. rhamnosus GR-1® for feminine balance and urinary tract health',
      products: [
        {
          id: 'womens-flora',
          name: 'Women\'s Flora',
          price: 47.99,
          rating: 4.9,
          reviews: 756,
          image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
          category: 'womens-health',
          description: 'Supports vaginal & urinary tract health',
          badge: 'Top Rated'
        },
        {
          id: 'feminine-balance',
          name: 'Feminine Balance',
          price: 42.99,
          rating: 4.6,
          reviews: 434,
          image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
          category: 'womens-health',
          description: 'Hormonal balance and wellness support',
          badge: 'Popular'
        }
      ]
    }
  };

  const currentCategory = categoryData[category as keyof typeof categoryData];

  if (!currentCategory) {
    return <div>Category not found</div>;
  }

  const addToCart = (product: any) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="text-sm breadcrumbs mb-4">
            <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{currentCategory.title}</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentCategory.title}</h1>
              <p className="text-lg text-gray-600">{currentCategory.description}</p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="best-selling">Best Selling</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentCategory.products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
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
                {product.originalPrice && (
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-2 py-1 rounded text-sm font-semibold">
                    Save ₹{(product.originalPrice - product.price).toFixed(2)}
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-3">{product.description}</p>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
                
                <Link
                  to={`/product/${product.id}`}
                  className="block w-full text-center mt-3 text-red-600 hover:text-red-700 font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
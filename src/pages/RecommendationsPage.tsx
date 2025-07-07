import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, ThumbsUp, ThumbsDown, Lightbulb, TrendingUp, Users, Target } from 'lucide-react';
import { recommendationsAPI, Recommendation } from '../utils/api';
import { useCart } from '../context/CartContext';

const RecommendationsPage = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedbackGiven, setFeedbackGiven] = useState<Set<string>>(new Set());
  const { dispatch } = useCart();

  const categoryIcons = {
    'based_on_purchase': <ShoppingCart className="w-5 h-5" />,
    'health_goals': <Target className="w-5 h-5" />,
    'trending': <TrendingUp className="w-5 h-5" />,
    'similar_users': <Users className="w-5 h-5" />,
  };

  const categoryLabels = {
    'based_on_purchase': 'Based on Your Purchases',
    'health_goals': 'For Your Health Goals',
    'trending': 'Trending Now',
    'similar_users': 'Customers Like You Also Bought',
  };

  const categoryColors = {
    'based_on_purchase': 'bg-blue-100 text-blue-800',
    'health_goals': 'bg-green-100 text-green-800',
    'trending': 'bg-orange-100 text-orange-800',
    'similar_users': 'bg-purple-100 text-purple-800',
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      setIsLoading(true);
      const recs = await recommendationsAPI.getRecommendations(20);
      setRecommendations(recs);
    } catch (err: any) {
      setError(err.message || 'Failed to load recommendations');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (product: any) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const handleFeedback = async (recommendationId: string, feedback: 'helpful' | 'not_helpful') => {
    try {
      await recommendationsAPI.provideFeedback(recommendationId, feedback);
      setFeedbackGiven(prev => new Set(prev).add(recommendationId));
    } catch (err: any) {
      console.error('Failed to provide feedback:', err);
    }
  };

  const markAsViewed = async (recommendationId: string) => {
    try {
      await recommendationsAPI.markAsViewed(recommendationId);
    } catch (err: any) {
      console.error('Failed to mark as viewed:', err);
    }
  };

  const groupedRecommendations = recommendations.reduce((acc, rec) => {
    if (!acc[rec.category]) {
      acc[rec.category] = [];
    }
    acc[rec.category].push(rec);
    return acc;
  }, {} as Record<string, Recommendation[]>);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading personalized recommendations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <Lightbulb className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Personalized <span className="text-red-600">Recommendations</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover products tailored just for you based on your health goals, purchase history, and preferences
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {recommendations.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Lightbulb className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Recommendations Yet</h3>
            <p className="text-gray-600 mb-6">
              Start shopping and set your health goals to get personalized product recommendations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                Browse Products
              </Link>
              <Link
                to="/account"
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Update Health Goals
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedRecommendations).map(([category, recs]) => (
              <div key={category} className="bg-white rounded-xl shadow-sm p-8">
                {/* Category Header */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`p-2 rounded-lg ${categoryColors[category as keyof typeof categoryColors]}`}>
                    {categoryIcons[category as keyof typeof categoryIcons]}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {categoryLabels[category as keyof typeof categoryLabels]}
                    </h2>
                    <p className="text-gray-600">{recs.length} recommendation{recs.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {recs.map((rec) => (
                    <div key={rec.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow group">
                      {/* Product Image */}
                      <div className="relative">
                        <Link 
                          to={`/product/${rec.product.id}`}
                          onClick={() => markAsViewed(rec.id)}
                        >
                          <img
                            src={rec.product.image}
                            alt={rec.product.name}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </Link>
                        
                        {/* Confidence Badge */}
                        <div className="absolute top-3 left-3">
                          <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            {Math.round(rec.confidence * 100)}% Match
                          </span>
                        </div>

                        {/* Product Badge */}
                        {rec.product.badge && (
                          <div className="absolute top-3 right-3">
                            <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                              {rec.product.badge}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <Link 
                          to={`/product/${rec.product.id}`}
                          onClick={() => markAsViewed(rec.id)}
                        >
                          <h3 className="font-semibold text-gray-900 mb-2 hover:text-red-600 transition-colors line-clamp-2">
                            {rec.product.name}
                          </h3>
                        </Link>

                        {/* Recommendation Reason */}
                        <div className="bg-gray-50 p-3 rounded-lg mb-3">
                          <p className="text-sm text-gray-700 font-medium">Why we recommend this:</p>
                          <p className="text-sm text-gray-600 mt-1">{rec.reason}</p>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(rec.product.rating) 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-2">
                            {rec.product.rating} ({rec.product.reviews})
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center space-x-2 mb-4">
                          <span className="text-xl font-bold text-gray-900">
                            ₹{rec.product.price}
                          </span>
                          {rec.product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ₹{rec.product.originalPrice}
                            </span>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="space-y-2">
                          <button
                            onClick={() => handleAddToCart(rec.product)}
                            disabled={!rec.product.inStock}
                            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            <span>{rec.product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                          </button>

                          <div className="flex space-x-2">
                            <Link
                              to={`/product/${rec.product.id}`}
                              onClick={() => markAsViewed(rec.id)}
                              className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-center"
                            >
                              View Details
                            </Link>
                            <button className="border border-gray-300 text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                              <Heart className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Feedback */}
                        {!feedbackGiven.has(rec.id) && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <p className="text-xs text-gray-600 mb-2">Was this recommendation helpful?</p>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleFeedback(rec.id, 'helpful')}
                                className="flex items-center space-x-1 text-xs text-green-600 hover:text-green-700 transition-colors"
                              >
                                <ThumbsUp className="w-3 h-3" />
                                <span>Yes</span>
                              </button>
                              <button
                                onClick={() => handleFeedback(rec.id, 'not_helpful')}
                                className="flex items-center space-x-1 text-xs text-red-600 hover:text-red-700 transition-colors"
                              >
                                <ThumbsDown className="w-3 h-3" />
                                <span>No</span>
                              </button>
                            </div>
                          </div>
                        )}

                        {feedbackGiven.has(rec.id) && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <p className="text-xs text-gray-500">Thank you for your feedback!</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-red-600 rounded-xl p-8 text-center text-white mt-12">
          <h2 className="text-2xl font-bold mb-4">Want Better Recommendations?</h2>
          <p className="text-lg mb-6 opacity-90">
            Update your health goals and preferences to get more personalized suggestions
          </p>
          <Link
            to="/account"
            className="bg-white text-red-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            Update Preferences
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPage;
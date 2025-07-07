import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, X, Star, Package, ArrowRight, Trash2 } from 'lucide-react';
import { wishlistAPI, WishlistItem } from '../utils/api';
import { useCart } from '../context/CartContext';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [removingItems, setRemovingItems] = useState<Set<string>>(new Set());
  const [movingToCart, setMovingToCart] = useState<Set<string>>(new Set());
  const { dispatch } = useCart();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setIsLoading(true);
      const items = await wishlistAPI.getWishlist();
      setWishlistItems(items);
    } catch (err: any) {
      setError(err.message || 'Failed to load wishlist');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      setRemovingItems(prev => new Set(prev).add(productId));
      await wishlistAPI.removeFromWishlist(productId);
      setWishlistItems(prev => prev.filter(item => item.productId !== productId));
    } catch (err: any) {
      alert(err.message || 'Failed to remove from wishlist');
    } finally {
      setRemovingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const handleMoveToCart = async (item: WishlistItem) => {
    try {
      setMovingToCart(prev => new Set(prev).add(item.productId));
      
      // Add to cart context
      dispatch({ type: 'ADD_TO_CART', payload: item.product });
      
      // Move to cart via API and remove from wishlist
      await wishlistAPI.moveToCart(item.productId, 1);
      setWishlistItems(prev => prev.filter(wishItem => wishItem.productId !== item.productId));
      
    } catch (err: any) {
      alert(err.message || 'Failed to move to cart');
    } finally {
      setMovingToCart(prev => {
        const newSet = new Set(prev);
        newSet.delete(item.productId);
        return newSet;
      });
    }
  };

  const handleAddToCart = (product: any) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const clearWishlist = async () => {
    if (confirm('Are you sure you want to clear your entire wishlist?')) {
      try {
        // Remove all items one by one (you might want to implement a bulk delete API)
        await Promise.all(wishlistItems.map(item => wishlistAPI.removeFromWishlist(item.productId)));
        setWishlistItems([]);
      } catch (err: any) {
        alert(err.message || 'Failed to clear wishlist');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
            <p className="text-gray-600">
              {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved for later
            </p>
          </div>
          
          {wishlistItems.length > 0 && (
            <button
              onClick={clearWishlist}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Wishlist Items */}
        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Wishlist is Empty</h3>
            <p className="text-gray-600 mb-6">
              Save items you love to your wishlist and shop them later
            </p>
            <Link
              to="/products"
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors inline-flex items-center space-x-2"
            >
              <Package className="w-5 h-5" />
              <span>Start Shopping</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
                {/* Product Image */}
                <div className="relative">
                  <Link to={`/product/${item.product.id}`}>
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveFromWishlist(item.productId)}
                    disabled={removingItems.has(item.productId)}
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-colors disabled:opacity-50"
                  >
                    {removingItems.has(item.productId) ? (
                      <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <X className="w-4 h-4 text-gray-600 hover:text-red-600" />
                    )}
                  </button>

                  {/* Badge */}
                  {item.product.badge && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        {item.product.badge}
                      </span>
                    </div>
                  )}

                  {/* Discount */}
                  {item.product.originalPrice && (
                    <div className="absolute bottom-3 left-3 bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
                      Save ₹{(item.product.originalPrice - item.product.price).toFixed(2)}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <Link to={`/product/${item.product.id}`}>
                    <h3 className="font-semibold text-gray-900 mb-2 hover:text-red-600 transition-colors line-clamp-2">
                      {item.product.name}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {item.product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(item.product.rating) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {item.product.rating} ({item.product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-xl font-bold text-gray-900">
                      ₹{item.product.price}
                    </span>
                    {item.product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{item.product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Stock Status */}
                  <div className="mb-4">
                    {item.product.inStock ? (
                      <span className="text-green-600 text-sm font-medium">In Stock</span>
                    ) : (
                      <span className="text-red-600 text-sm font-medium">Out of Stock</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <button
                      onClick={() => handleMoveToCart(item)}
                      disabled={!item.product.inStock || movingToCart.has(item.productId)}
                      className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {movingToCart.has(item.productId) ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Moving...</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          <span>Move to Cart</span>
                        </>
                      )}
                    </button>

                    <Link
                      to={`/product/${item.product.id}`}
                      className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Added Date */}
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      Added {new Date(item.addedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recommendations */}
        {wishlistItems.length > 0 && (
          <div className="mt-16">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">You Might Also Like</h2>
              <p className="text-gray-600 mb-6">
                Based on your wishlist, here are some products we think you'll love
              </p>
              <Link
                to="/recommendations"
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors inline-flex items-center space-x-2"
              >
                <span>View Recommendations</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
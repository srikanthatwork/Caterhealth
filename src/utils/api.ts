// E-commerce API utility functions for backend integration

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  badge?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  total: number;
}

export interface Address {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
}

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  addedAt: string;
}

export interface TrackingEvent {
  id: string;
  status: string;
  description: string;
  location: string;
  timestamp: string;
}

export interface OrderTracking {
  orderId: string;
  trackingNumber: string;
  currentStatus: string;
  estimatedDelivery: string;
  events: TrackingEvent[];
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  healthGoals?: string[];
  defaultShippingAddress?: Address;
  defaultBillingAddress?: Address;
  preferences: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    marketingEmails: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Recommendation {
  id: string;
  product: Product;
  reason: string;
  confidence: number;
  category: 'based_on_purchase' | 'health_goals' | 'trending' | 'similar_users';
}

// Base API URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

// Order Management APIs
export const orderAPI = {
  // Get user orders
  getOrders: async (page: number = 1, limit: number = 10): Promise<{ orders: Order[], total: number, pages: number }> => {
    const response = await fetch(`${API_BASE_URL}/orders?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }

    return response.json();
  },

  // Get single order
  getOrder: async (orderId: string): Promise<Order> => {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }

    return response.json();
  },

  // Create new order
  createOrder: async (orderData: {
    items: { productId: string; quantity: number }[];
    shippingAddress: Address;
    billingAddress: Address;
    paymentMethod: string;
    paymentToken?: string;
  }): Promise<Order> => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create order');
    }

    return response.json();
  },

  // Cancel order
  cancelOrder: async (orderId: string, reason?: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/cancel`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ reason }),
    });

    if (!response.ok) {
      throw new Error('Failed to cancel order');
    }

    return response.json();
  },

  // Track order
  trackOrder: async (orderId: string): Promise<OrderTracking> => {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/tracking`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch tracking information');
    }

    return response.json();
  },

  // Reorder
  reorder: async (orderId: string): Promise<Order> => {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/reorder`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to reorder');
    }

    return response.json();
  },
};

// Wishlist APIs
export const wishlistAPI = {
  // Get wishlist items
  getWishlist: async (): Promise<WishlistItem[]> => {
    const response = await fetch(`${API_BASE_URL}/wishlist`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch wishlist');
    }

    return response.json();
  },

  // Add to wishlist
  addToWishlist: async (productId: string): Promise<WishlistItem> => {
    const response = await fetch(`${API_BASE_URL}/wishlist`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ productId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to add to wishlist');
    }

    return response.json();
  },

  // Remove from wishlist
  removeFromWishlist: async (productId: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/wishlist/${productId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to remove from wishlist');
    }

    return response.json();
  },

  // Move to cart
  moveToCart: async (productId: string, quantity: number = 1): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/wishlist/${productId}/move-to-cart`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ quantity }),
    });

    if (!response.ok) {
      throw new Error('Failed to move to cart');
    }

    return response.json();
  },
};

// User Profile APIs
export const profileAPI = {
  // Get user profile
  getProfile: async (): Promise<UserProfile> => {
    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    return response.json();
  },

  // Update profile
  updateProfile: async (profileData: Partial<UserProfile>): Promise<UserProfile> => {
    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    return response.json();
  },

  // Update password
  updatePassword: async (currentPassword: string, newPassword: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/profile/password`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update password');
    }

    return response.json();
  },

  // Update preferences
  updatePreferences: async (preferences: UserProfile['preferences']): Promise<UserProfile> => {
    const response = await fetch(`${API_BASE_URL}/profile/preferences`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ preferences }),
    });

    if (!response.ok) {
      throw new Error('Failed to update preferences');
    }

    return response.json();
  },

  // Delete account
  deleteAccount: async (password: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete account');
    }

    return response.json();
  },
};

// Recommendations API
export const recommendationsAPI = {
  // Get personalized recommendations
  getRecommendations: async (limit: number = 10): Promise<Recommendation[]> => {
    const response = await fetch(`${API_BASE_URL}/recommendations?limit=${limit}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch recommendations');
    }

    return response.json();
  },

  // Mark recommendation as viewed
  markAsViewed: async (recommendationId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/recommendations/${recommendationId}/viewed`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to mark recommendation as viewed');
    }
  },

  // Provide feedback on recommendation
  provideFeedback: async (recommendationId: string, feedback: 'helpful' | 'not_helpful'): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/recommendations/${recommendationId}/feedback`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ feedback }),
    });

    if (!response.ok) {
      throw new Error('Failed to provide feedback');
    }
  },
};

// Product APIs
export const productAPI = {
  // Get products
  getProducts: async (params?: {
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
  }): Promise<{ products: Product[], total: number, pages: number }> => {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);

    const response = await fetch(`${API_BASE_URL}/products?${queryParams}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return response.json();
  },

  // Get single product
  getProduct: async (productId: string): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }

    return response.json();
  },
};

// Cart APIs (if you want to sync cart with backend)
export const cartAPI = {
  // Get cart
  getCart: async (): Promise<{ items: OrderItem[], total: number }> => {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch cart');
    }

    return response.json();
  },

  // Add to cart
  addToCart: async (productId: string, quantity: number): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ productId, quantity }),
    });

    if (!response.ok) {
      throw new Error('Failed to add to cart');
    }

    return response.json();
  },

  // Update cart item
  updateCartItem: async (productId: string, quantity: number): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/cart/${productId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ quantity }),
    });

    if (!response.ok) {
      throw new Error('Failed to update cart item');
    }

    return response.json();
  },

  // Remove from cart
  removeFromCart: async (productId: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/cart/${productId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to remove from cart');
    }

    return response.json();
  },

  // Clear cart
  clearCart: async (): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to clear cart');
    }

    return response.json();
  },
};
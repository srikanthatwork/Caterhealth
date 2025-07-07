// Authentication utility functions for API integration

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  healthGoals?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember_me?: boolean;
}

export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  password: string;
  date_of_birth?: string;
  gender?: string;
  health_goals?: string[];
  agree_to_marketing?: boolean;
}

// Base API URL - Replace with your actual backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// API utility functions
export const authAPI = {
  // Login user
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    return response.json();
  },

  // Register user
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    return response.json();
  },

  // Logout user
  logout: async (): Promise<void> => {
    const token = getAuthToken();
    if (token) {
      try {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Logout API call failed:', error);
      }
    }
    
    // Clear local storage regardless of API call success
    clearAuthData();
  },

  // Refresh token
  refreshToken: async (): Promise<AuthResponse> => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    return response.json();
  },

  // Get user profile
  getProfile: async (): Promise<User> => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    return response.json();
  },

  // Update user profile
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    return response.json();
  },

  // Forgot password
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send reset email');
    }

    return response.json();
  },

  // Reset password
  resetPassword: async (token: string, password: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to reset password');
    }

    return response.json();
  },
};

// Local storage utilities
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
};

export const setAuthToken = (token: string, remember: boolean = false): void => {
  if (remember) {
    localStorage.setItem('authToken', token);
  } else {
    sessionStorage.setItem('authToken', token);
  }
};

export const getUser = (): User | null => {
  const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const setUser = (user: User, remember: boolean = false): void => {
  const userStr = JSON.stringify(user);
  if (remember) {
    localStorage.setItem('user', userStr);
  } else {
    sessionStorage.setItem('user', userStr);
  }
};

export const clearAuthData = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  sessionStorage.removeItem('authToken');
  sessionStorage.removeItem('user');
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

// HTTP interceptor for adding auth headers
export const createAuthenticatedRequest = (url: string, options: RequestInit = {}): RequestInit => {
  const token = getAuthToken();
  
  return {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
  };
};

// Auto-refresh token utility
export const setupTokenRefresh = (): void => {
  const token = getAuthToken();
  if (!token) return;

  // Decode JWT to get expiration time (basic implementation)
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    const timeUntilExpiry = expirationTime - currentTime;
    
    // Refresh token 5 minutes before expiry
    const refreshTime = timeUntilExpiry - (5 * 60 * 1000);
    
    if (refreshTime > 0) {
      setTimeout(async () => {
        try {
          const response = await authAPI.refreshToken();
          setAuthToken(response.token, !!localStorage.getItem('authToken'));
          setUser(response.user, !!localStorage.getItem('user'));
          setupTokenRefresh(); // Setup next refresh
        } catch (error) {
          console.error('Token refresh failed:', error);
          clearAuthData();
          window.location.href = '/login';
        }
      }, refreshTime);
    }
  } catch (error) {
    console.error('Invalid token format:', error);
    clearAuthData();
  }
};
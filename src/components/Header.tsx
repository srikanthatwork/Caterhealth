import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Search, Download, Wallet, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import logo from '../Public/images/Caterhealth-new-logo.png'; // Adjust the path as necessary

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { state } = useCart();
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { 
      name: 'Products', 
      href: '/products',
      hasDropdown: true,
      dropdownItems: [
        { name: 'All Products', href: '/products' },
        { name: 'Gut Health', href: '/category/gut-health' },
        { name: 'Immune Support', href: '/category/immune-support' },
        { name: 'Women\'s Health', href: '/category/womens-health' }
      ]
    },
    { name: 'Honest Reports', href: '/reports' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="bg-white shadow-xl sticky top-0 z-50 border-b border-gray-100">
      {/* Top Promotional Bar */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2.5">
                <div className="bg-white/20 p-1.5 rounded-full">
                  <Wallet className="w-4 h-4" />
                </div>
                <span className="font-semibold tracking-wide">
                  Use CH Wallet and save up to 30%
                </span>
              </div>
              <div className="hidden md:flex items-center space-x-2 text-xs opacity-90">
                <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                <span>Free shipping on orders over ₹49</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 flex items-center space-x-2 border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl">
                <Download className="w-4 h-4" />
                <span>Download App</span>
              </button> */}
              {/* <div className="h-4 w-px bg-white/30"></div> */}
              {/* <button className="text-white hover:text-red-200 transition-colors text-sm font-semibold hover:underline underline-offset-2">
                <Link to="/login">Login</Link>
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-4 group">
              <div className="relative">
                <img
                  src={logo}
                  alt="Cater Health Logo"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div className="flex flex-col text-left hidden sm:flex">
                <span className="text-xl sm:text-lg font-black text-gray-900 leading-tight tracking-tight">
                  Cater Health
                </span>
                <span className="text-[10px] sm:text-xs text-red-600 font-bold uppercase tracking-widest">
                  Science-Backed Probiotics
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2 ml-3">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  {item.hasDropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setIsProductsDropdownOpen(true)}
                      onMouseLeave={() => setIsProductsDropdownOpen(false)}
                    >
                      <button
                        className={`flex items-center space-x-2 px-6 py-4 text-sm font-bold transition-all duration-300 rounded-xl border-2 border-transparent hover:border-red-200 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-700 hover:shadow-lg hover:scale-105 group ${
                          isActive(item.href) || isProductsDropdownOpen
                            ? "text-red-700 bg-gradient-to-r from-red-50 to-red-100 shadow-lg border-red-200 scale-105"
                            : "text-gray-700 hover:shadow-md"
                        }`}
                      >
                        <span className="relative">
                          {item.name}
                          <span className="absolute -top-1 -right-3 w-2 h-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 transition-all duration-300 ${
                            isProductsDropdownOpen
                              ? "rotate-180 text-red-600"
                              : "group-hover:rotate-180"
                          }`}
                        />
                      </button>

                      {/* Dropdown Menu */}
                      {isProductsDropdownOpen && (
                        <div className="absolute top-full left-0 mt-3 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-red-100 py-4 z-50 transform transition-all duration-300 animate-in slide-in-from-top-2">
                          {/* Dropdown Header */}
                          <div className="px-6 py-3 border-b border-gray-100">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                              Choose Your Solution
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">
                              Science-backed probiotics for every need
                            </p>
                          </div>

                          {/* Dropdown Items */}
                          {item.dropdownItems?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.href}
                              className="group/item flex items-center justify-between px-6 py-4 text-sm font-semibold text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-700 transition-all duration-200 mx-3 my-1 rounded-xl border border-transparent hover:border-red-100 hover:shadow-md"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-red-500 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-200"></div>
                                <span>{dropdownItem.name}</span>
                              </div>
                              <svg
                                className="w-4 h-4 text-gray-400 group-hover/item:text-red-500 transform group-hover/item:translate-x-1 transition-all duration-200"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </Link>
                          ))}

                          {/* Dropdown Footer */}
                          <div className="px-6 py-3 border-t border-gray-100 mt-2">
                            <Link
                              to="/products"
                              className="flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 hover:shadow-lg hover:scale-105"
                            >
                              <span>View All Products</span>
                              <svg
                                className="w-4 h-4 ml-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={`px-5 py-3.5 text-sm font-bold transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-700 hover:shadow-md ${
                        isActive(item.href)
                          ? "text-red-700 bg-gradient-to-r from-red-50 to-red-100 shadow-md"
                          : "text-gray-700"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearch} className="w-full relative">
                <div className="relative group">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder='Search for "Stage 2"'
                    className="w-full pl-14 pr-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-red-500/20 focus:border-red-500 transition-all duration-300 bg-gray-50/50 focus:bg-white text-gray-900 placeholder-gray-500 font-medium shadow-sm hover:shadow-md"
                  />
                  <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                    <Search className="w-5 h-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                  </div>
                </div>
              </form>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Mobile Search Toggle */}
              <button
                className="md:hidden p-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 hover:shadow-md"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="w-6 h-6" />
              </button>

              <button className="text-black hover:text-red-200 transition-colors text-sm font-semibold hover:underline underline-offset-2">
                <Link to="/login">Login</Link>
              </button>

              {/* Profile */}
              <div
                className="relative"
                onMouseEnter={() => setIsProfileDropdownOpen(true)}
                onMouseLeave={() => setIsProfileDropdownOpen(false)}
              >
                <button className="p-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 hover:shadow-md">
                  <User className="w-6 h-6" />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 py-3 z-50">
                    <div className="px-5 py-4 border-b border-gray-100">
                      <p className="text-sm font-bold text-gray-900">
                        Your Account
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Manage your profile and preferences
                      </p>
                    </div>

                    <div className="py-2">
                      <Link
                        to="/account"
                        className="flex items-center px-5 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-700 transition-all duration-200 mx-2 rounded-xl"
                      >
                        <User className="w-4 h-4 mr-3" />
                        Your Account
                      </Link>

                      <Link
                        to="/orders"
                        className="flex items-center px-5 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-700 transition-all duration-200 mx-2 rounded-xl"
                      >
                        <ShoppingCart className="w-4 h-4 mr-3" />
                        Your Orders
                      </Link>

                      <Link
                        to="/wishlist"
                        className="flex items-center px-5 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-700 transition-all duration-200 mx-2 rounded-xl"
                      >
                        <svg
                          className="w-4 h-4 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        Your Wish List
                      </Link>

                      <Link
                        to="/recommendations"
                        className="flex items-center px-5 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-700 transition-all duration-200 mx-2 rounded-xl"
                      >
                        <svg
                          className="w-4 h-4 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                          />
                        </svg>
                        Your Recommendations
                      </Link>
                    </div>

                    <div className="border-t border-gray-100 py-2">
                      <button className="flex items-center w-full px-5 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-700 transition-all duration-200 mx-2 rounded-xl">
                        <svg
                          className="w-4 h-4 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart */}

              <Link
                to="/cart"
                className="relative p-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 group hover:shadow-md"
              >
                <ShoppingCart className="w-6 h-6" />
                {state.items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg group-hover:scale-110 transition-transform duration-300 border-2 border-white">
                    {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <button
                className="lg:hidden p-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 hover:shadow-md"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="md:hidden py-4 border-t border-gray-100 bg-gray-50/50">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Search for "Stage 2"'
                  className="w-full pl-14 pr-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-red-500/20 focus:border-red-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 font-medium"
                />
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </form>
            </div>
          )}

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-100 bg-gray-50/50">
              <nav className="flex flex-col space-y-2">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      to={item.href}
                      className={`block px-5 py-4 text-base font-bold transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-700 ${
                        isActive(item.href)
                          ? "text-red-700 bg-gradient-to-r from-red-50 to-red-100"
                          : "text-gray-700"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.hasDropdown && (
                      <div className="ml-6 mt-2 space-y-1">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            to={dropdownItem.href}
                            className="block px-4 py-3 text-sm font-semibold text-gray-600 hover:text-red-600 transition-colors duration-200 rounded-lg hover:bg-red-50"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
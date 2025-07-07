import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Clock, Tag } from 'lucide-react';

const BlogPage = () => {
  const featuredArticle = {
    id: 1,
    title: 'The Complete Guide to Gut Health: How Probiotics Transform Your Wellbeing',
    excerpt: 'Discover the science behind gut health and learn how the right probiotic strains can improve digestion, boost immunity, and enhance mental clarity.',
    author: 'Dr. Sarah Chen',
    date: 'March 15, 2025',
    readTime: '8 min read',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Gut Health',
    featured: true
  };

  const articles = [
    {
      id: 2,
      title: '5 Signs Your Gut Bacteria Are Out of Balance',
      excerpt: 'Learn to recognize the warning signs of gut dysbiosis and discover natural ways to restore your microbiome.',
      author: 'Dr. Michael Torres',
      date: 'March 12, 2025',
      readTime: '5 min read',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Health Tips'
    },
    {
      id: 3,
      title: 'Why Women Need Different Probiotics: The Science Explained',
      excerpt: 'Understanding the unique probiotic needs of women and how targeted strains support feminine health.',
      author: 'Dr. Jennifer Walsh',
      date: 'March 10, 2025',
      readTime: '6 min read',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Women\'s Health'
    },
    {
      id: 4,
      title: 'Boost Your Immune System: The Probiotic Connection',
      excerpt: 'How specific probiotic strains strengthen your immune defenses and protect against seasonal illnesses.',
      author: 'Dr. Robert Kim',
      date: 'March 8, 2025',
      readTime: '7 min read',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Immune Support'
    },
    {
      id: 5,
      title: 'Probiotics and Mental Health: The Gut-Brain Axis',
      excerpt: 'Explore the fascinating connection between gut health and mental wellbeing.',
      author: 'Dr. Lisa Patel',
      date: 'March 5, 2025',
      readTime: '9 min read',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Mental Health'
    },
    {
      id: 6,
      title: 'When to Take Probiotics: Timing for Maximum Benefits',
      excerpt: 'Optimize your probiotic routine with expert timing recommendations and dosage guidelines.',
      author: 'Dr. Sarah Chen',
      date: 'March 3, 2025',
      readTime: '4 min read',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Usage Tips'
    },
    {
      id: 7,
      title: 'The Truth About CFU Count: More Isn\'t Always Better',
      excerpt: 'Understanding colony-forming units and why strain diversity matters more than just numbers.',
      author: 'Dr. Michael Torres',
      date: 'February 28, 2025',
      readTime: '6 min read',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Science'
    }
  ];

  const categories = [
    'All Categories',
    'Gut Health',
    'Women\'s Health',
    'Immune Support',
    'Mental Health',
    'Usage Tips',
    'Science',
    'Health Tips'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Health & Wellness <span className="text-red-600">Blog</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert insights, research-backed articles, and practical tips for optimizing your gut health and overall wellbeing
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Article */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-64 lg:h-auto">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                  <span className="bg-coral-100 text-coral-700 px-3 py-1 rounded-full text-sm font-medium">
                    {featuredArticle.category}
                  </span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {featuredArticle.title}
                </h2>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{featuredArticle.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{featuredArticle.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{featuredArticle.readTime}</span>
                    </div>
                  </div>
                  <Link
                    to={`/blog/${featuredArticle.id}`}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors inline-flex items-center"
                  >
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 text-sm font-medium rounded-full border border-gray-300 hover:border-green-500 hover:text-green-600 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-coral-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <Link
                  to={`/blog/${article.id}`}
                  className="px-4 py-2 text-sm font-medium rounded-full border border-gray-300 hover:border-red-500 hover:text-red-600 transition-colors"
                >
                  Read Article
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 bg-red-600 rounded-2xl p-8 lg:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Stay Updated with Health Tips</h2>
          <p className="text-xl mb-8 opacity-90">
            Get the latest research, expert advice, and exclusive wellness content delivered to your inbox
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-600"
            />
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
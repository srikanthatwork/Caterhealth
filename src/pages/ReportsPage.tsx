import React, { useState } from 'react';
import { Download, Calendar, User, Eye, FileText, TrendingUp, BarChart3, Users } from 'lucide-react';

const ReportsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const reports = [
    {
      id: 1,
      title: 'The State of Gut Health in 2025: A Comprehensive Analysis',
      category: 'Research',
      author: 'Dr. Sarah Chen',
      date: 'March 15, 2025',
      views: 12847,
      downloads: 3421,
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=600',
      excerpt: 'Our latest research reveals critical insights into modern gut health challenges and the role of targeted probiotic interventions.',
      featured: true,
      tags: ['Gut Health', 'Research', 'Clinical Study']
    },
    {
      id: 2,
      title: 'Women\'s Probiotic Needs: Clinical Evidence & Recommendations',
      category: 'Clinical',
      author: 'Dr. Jennifer Walsh',
      date: 'March 10, 2025',
      views: 8934,
      downloads: 2156,
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=600',
      excerpt: 'A detailed analysis of gender-specific probiotic requirements and their impact on feminine health outcomes.',
      featured: false,
      tags: ['Women\'s Health', 'Clinical Study', 'Probiotics']
    },
    {
      id: 3,
      title: 'Immune System Support: Probiotic Strain Efficacy Report',
      category: 'Research',
      author: 'Dr. Robert Kim',
      date: 'March 5, 2025',
      views: 7623,
      downloads: 1834,
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=600',
      excerpt: 'Comprehensive evaluation of specific probiotic strains and their measurable effects on immune function.',
      featured: false,
      tags: ['Immune Support', 'Strain Analysis', 'Clinical Data']
    },
    {
      id: 4,
      title: 'CFU Count vs. Strain Diversity: What Really Matters?',
      category: 'Analysis',
      author: 'Dr. Michael Torres',
      date: 'February 28, 2025',
      views: 9156,
      downloads: 2743,
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=600',
      excerpt: 'An honest examination of marketing claims versus scientific evidence in probiotic formulations.',
      featured: false,
      tags: ['Analysis', 'CFU', 'Scientific Evidence']
    },
    {
      id: 5,
      title: 'Digestive Health Trends: 2024 Consumer Survey Results',
      category: 'Survey',
      author: 'Research Team',
      date: 'February 20, 2025',
      views: 6789,
      downloads: 1567,
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=600',
      excerpt: 'Insights from 10,000+ consumers about their digestive health challenges and probiotic usage patterns.',
      featured: false,
      tags: ['Consumer Survey', 'Trends', 'Market Research']
    },
    {
      id: 6,
      title: 'Probiotic Safety & Side Effects: Transparent Analysis',
      category: 'Safety',
      author: 'Dr. Lisa Patel',
      date: 'February 15, 2025',
      views: 5432,
      downloads: 1289,
      image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=600',
      excerpt: 'An honest assessment of potential side effects and safety considerations for probiotic supplementation.',
      featured: false,
      tags: ['Safety', 'Side Effects', 'Transparency']
    }
  ];

  const categories = [
    { value: 'all', label: 'All Reports', count: reports.length },
    { value: 'Research', label: 'Research', count: reports.filter(r => r.category === 'Research').length },
    { value: 'Clinical', label: 'Clinical Studies', count: reports.filter(r => r.category === 'Clinical').length },
    { value: 'Analysis', label: 'Analysis', count: reports.filter(r => r.category === 'Analysis').length },
    { value: 'Survey', label: 'Surveys', count: reports.filter(r => r.category === 'Survey').length },
    { value: 'Safety', label: 'Safety Reports', count: reports.filter(r => r.category === 'Safety').length }
  ];

  const filteredReports = selectedCategory === 'all' 
    ? reports 
    : reports.filter(report => report.category === selectedCategory);

  const featuredReport = reports.find(report => report.featured);
  const regularReports = reports.filter(report => !report.featured);

  const stats = [
    { icon: <FileText className="w-6 h-6" />, label: 'Total Reports', value: '24+' },
    { icon: <Users className="w-6 h-6" />, label: 'Research Participants', value: '50,000+' },
    { icon: <TrendingUp className="w-6 h-6" />, label: 'Studies Conducted', value: '15+' },
    { icon: <BarChart3 className="w-6 h-6" />, label: 'Data Points', value: '1M+' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Honest <span className="text-red-600">Reports</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Transparent, science-based research and analysis. We believe in sharing honest data 
              about probiotic efficacy, safety, and real-world outcomes.
            </p>
            <div className="flex justify-center">
              <div className="bg-white rounded-lg p-1 shadow-sm">
                <span className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                  All reports are peer-reviewed and independently verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-red-600">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Report */}
        {featuredReport && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Report</h2>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="h-64 lg:h-auto">
                  <img
                    src={featuredReport.image}
                    alt={featuredReport.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </span>
                    <span className="bg-coral-100 text-coral-700 px-3 py-1 rounded-full text-sm font-medium">
                      {featuredReport.category}
                    </span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    {featuredReport.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    {featuredReport.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{featuredReport.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{featuredReport.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{featuredReport.views.toLocaleString()} views</span>
                      </div>
                    </div>
                    <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors inline-flex items-center">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-red-600 text-white border-red-600'
                    : 'border-gray-300 hover:border-red-500 hover:text-red-600'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredReports.filter(report => !report.featured).map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={report.image}
                  alt={report.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-coral-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {report.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                  {report.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {report.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {report.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{report.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Download className="w-4 h-4" />
                    <span>{report.downloads.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {report.date}
                  </div>
                  <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors inline-flex items-center text-sm">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 bg-red-600 rounded-2xl p-8 lg:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Stay Updated with Latest Research</h2>
          <p className="text-xl mb-8 opacity-90">
            Get notified when we publish new honest reports and research findings
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

export default ReportsPage;
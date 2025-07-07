import React from 'react';
import { Shield, Award, Users, Microscope, Heart, Globe } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { number: '100,000+', label: 'Happy Customers' },
    { number: '50B', label: 'CFU per Capsule' },
    { number: '10+', label: 'Targeted Strains' },
    { number: '98%', label: 'Customer Satisfaction' }
  ];

  const values = [
    {
      icon: <Microscope className="w-8 h-8" />,
      title: 'Science-First Approach',
      description: 'Every formula is backed by clinical research and developed with leading microbiologists.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Quality Assurance',
      description: 'Third-party tested for purity, potency, and safety. No fillers, no artificial additives.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Customer-Centric',
      description: 'Your health journey is our priority. We provide personalized support every step of the way.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Sustainable Practices',
      description: 'Eco-friendly packaging and ethical sourcing practices for a healthier planet.'
    }
  ];

  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief Scientific Officer',
      credentials: 'Ph.D. Microbiology, Harvard',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: '15+ years researching gut microbiome and probiotic therapeutics'
    },
    {
      name: 'Dr. Michael Torres',
      role: 'Head of Product Development',
      credentials: 'Ph.D. Biochemistry, Stanford',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Former researcher at leading pharmaceutical companies'
    },
    {
      name: 'Lisa Rodriguez',
      role: 'Chief Operating Officer',
      credentials: 'MBA, Wharton School',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: '10+ years scaling health and wellness companies'
    }
  ];

  const certifications = [
    'FDA Registered Facility',
    'GMP Certified',
    'Third-Party Tested',
    'NSF International',
    'Organic Certified',
    'Vegan Society'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Revolutionizing Gut Health
              <span className="text-red-600"> Through Science</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Founded by leading microbiologists and health experts, Cater Health combines cutting-edge research 
              with proven probiotic strains to deliver transformative health solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-red-600">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Story */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At Cater Health, we believe that optimal health begins in the gut. Our mission is to make 
                science-backed probiotic solutions accessible to everyone, helping people transform their 
                health from the inside out.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Founded in 2020 by a team of microbiologists and wellness experts, we've dedicated ourselves 
                to developing the most effective probiotic formulas using clinically proven strains and 
                cutting-edge research.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700">Research-driven formulations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700">Targeted health solutions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700">Sustainable and ethical practices</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Research lab"
                className="rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 bg-red-600 bg-opacity-20 rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Expert Team</h2>
            <p className="text-xl text-gray-600">Leading scientists and health experts driving innovation</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-red-600 font-medium mb-2">{member.role}</p>
                <p className="text-sm text-gray-500 mb-3">{member.credentials}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quality & Certifications</h2>
            <p className="text-xl text-gray-600">Trusted standards and rigorous testing ensure the highest quality</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-red-600" />
                </div>
                <p className="text-sm font-medium text-gray-900">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Health?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of customers who have improved their wellbeing with our science-backed probiotics
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
              Shop Now
            </button>
            <button className="bg-white text-red-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors">
              Contact Our Experts
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
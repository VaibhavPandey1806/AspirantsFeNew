import React from 'react';
import { GraduationCap, Book, Users, Award } from 'lucide-react';
import FeatureCard from './FeatureCard';

export default function HomePage() {
  const features = [
    {
      icon: <GraduationCap size={32} />,
      title: "Expert-Curated Questions",
      description: "Access thousands of high-quality questions prepared by industry experts"
    },
    {
      icon: <Book size={32} />,
      title: "Comprehensive Topics",
      description: "Cover all important subjects and topics for your preparation"
    },
    {
      icon: <Users size={32} />,
      title: "Community Driven",
      description: "Join a community of aspirants and share knowledge"
    },
    {
      icon: <Award size={32} />,
      title: "Track Progress",
      description: "Monitor your performance with detailed analytics"
    }
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-4 rounded-3xl mx-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Prepare Smarter, Achieve Better
          </h1>
          <p className="text-xl mb-8 text-indigo-100">
            Join thousands of aspirants in their journey to success with our comprehensive question bank and practice platform
          </p>
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
            alt="Students studying"
            className="rounded-lg shadow-xl max-w-3xl mx-auto"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Why Choose Aspirants Club?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-16 px-4 rounded-2xl mx-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="text-4xl font-bold text-indigo-600 mb-2">10,000+</div>
            <div className="text-gray-600">Questions</div>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="text-4xl font-bold text-indigo-600 mb-2">50+</div>
            <div className="text-gray-600">Topics</div>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="text-4xl font-bold text-indigo-600 mb-2">5,000+</div>
            <div className="text-gray-600">Active Users</div>
          </div>
        </div>
      </section>
    </div>
  );
}
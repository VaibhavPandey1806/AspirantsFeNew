import React from 'react';

export default function Hero() {
  return (
    <div className="relative bg-blue-900 py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Your MBA Preparation
            <span className="block text-yellow-400">Starts Here</span>
          </h1>
          
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Join the largest community of MBA aspirants. Practice questions, track progress, 
            and learn from peers - all in one place.
          </p>
        </div>
      </div>
    </div>
  );
}
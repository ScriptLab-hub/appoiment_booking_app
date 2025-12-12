import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { Footer } from '../components/common/Footer';

const { Link } = ReactRouterDOM;

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <div className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto bg-primary-600 rounded-3xl p-8 md:p-16 text-center text-white shadow-2xl shadow-primary-900/20 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to look your best?</h2>
            <p className="text-primary-100 text-lg mb-8 max-w-xl mx-auto">Book your appointment in less than 2 minutes.</p>
            <Link to="/book" className="inline-block bg-white text-primary-600 font-bold py-4 px-10 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all">
              Start Booking
            </Link>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Icon } from '../components/common/Icon';
import { Footer } from '../components/common/Footer';

const { Link } = ReactRouterDOM;

const REVIEWS = [
  {
    id: 1,
    name: "Ahmed Raza",
    location: "DHA Phase 5",
    text: "Finally a booking app that works perfectly in Karachi. No more waiting hours at the salon. I booked the 'Clifton Cut' and Bilal was ready when I walked in.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 2,
    name: "Fatima Ali",
    location: "Gulshan-e-Iqbal",
    text: "Got the Dust Detox facial before my cousin's wedding. The glow was real! The studio is super clean and feels very premium.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 3,
    name: "Omer Sheikh",
    location: "PECHS",
    text: "Professional barbers who actually listen. The hot towel shave is a must-try. Prices are very reasonable for the quality they provide.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 4,
    name: "Zainab Khan",
    location: "Clifton Block 4",
    text: "I love that I can choose my stylist. Zara is amazing with skincare recommendations. Highly recommended for anyone busy.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150"
  }
];

export const StoriesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-slate-900 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Karachi Diaries</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">See what our community is saying about their LuxeBook experience.</p>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-10 mb-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">5,000+</div>
            <div className="text-slate-600 font-medium">Appointments Booked</div>
          </div>
          <div className="md:border-l md:border-r border-slate-100">
            <div className="text-4xl font-bold text-primary-600 mb-2">4.9/5</div>
            <div className="text-slate-600 font-medium">Average Rating</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary-600 mb-2">DHA & Clifton</div>
            <div className="text-slate-600 font-medium">Prime Coverage</div>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <img src={review.image} alt={review.name} className="w-14 h-14 rounded-full object-cover border-2 border-primary-100" />
                <div>
                  <h4 className="font-bold text-slate-900">{review.name}</h4>
                  <p className="text-xs text-primary-600 font-semibold">{review.location}</p>
                </div>
                <div className="ml-auto flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="star" size={16} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-slate-200" : ""} />
                  ))}
                </div>
              </div>
              <p className="text-slate-600 italic leading-relaxed">"{review.text}"</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Join thousands of happy customers in Karachi</h2>
          <Link 
            to="/book" 
            className="inline-flex items-center justify-center px-10 py-4 text-base font-bold rounded-2xl text-white bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-500/30 transition-all hover:-translate-y-1"
          >
            Book Your Experience
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};
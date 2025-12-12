import React from 'react';
import { Icon } from '../common/Icon';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by Thousands</h2>
            <p className="text-slate-400">Join the community of satisfied customers.</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <button className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors">
              <Icon name="arrow-left" size={20} />
            </button>
            <button className="p-3 rounded-full bg-primary-600 hover:bg-primary-500 transition-colors">
              <Icon name="arrow-right" size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-slate-800 p-8 rounded-3xl relative">
              <div className="absolute top-8 right-8 text-slate-700">
                <Icon name="quote" size={40} />
              </div>
              <div className="flex gap-1 text-yellow-400 mb-6">
                {[1, 2, 3, 4, 5].map((s) => <Icon key={s} name="star" size={16} fill="currentColor" />)}
              </div>
              <p className="text-slate-300 mb-6 relative z-10">
                "Absolutely the best booking experience I've ever had. The staff was professional and the app made everything so easy."
              </p>
              <div className="flex items-center gap-4">
                <img src={`https://picsum.photos/id/${10 + i}/50/50`} alt="User" className="w-12 h-12 rounded-full border-2 border-slate-700" />
                <div>
                  <h4 className="font-bold">Michael Chen</h4>
                  <p className="text-xs text-slate-500">Regular Customer</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
import React from 'react';
import { Icon } from '../common/Icon';

const features = [
  {
    icon: 'clock',
    title: 'Real-Time Availability',
    description: 'See live openings and book slots instantly without the back-and-forth calls.'
  },
  {
    icon: 'star',
    title: 'Top-Rated Professionals',
    description: 'All our staff are vetted experts with verified reviews from customers like you.'
  },
  {
    icon: 'smartphone',
    title: 'Seamless Mobile Experience',
    description: 'Manage appointments, get reminders, and pay directly from your phone.'
  }
];

export const FeaturesSection: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose LuxeBook?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We've reimagined the booking experience to be as premium as the service itself.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group p-8 rounded-3xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 text-primary-600 group-hover:scale-110 transition-transform">
                <Icon name={feature.icon} size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
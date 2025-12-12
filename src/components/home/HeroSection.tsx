import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Icon } from '../common/Icon';

const { Link } = ReactRouterDOM;

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-slate-50 pt-16 pb-32 lg:pt-32 lg:pb-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:w-2/3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold mb-6 border border-primary-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            Accepting Appointments in DHA & Clifton
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            Karachi's Premier <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">
              Grooming Experience.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl leading-relaxed">
            Elevate your style with the city's top-rated professionals. 
            From Shahbaz Commercial to E-Street, skip the queue and book your slot instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/book" 
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-2xl text-white bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-500/30 transition-all hover:-translate-y-1"
            >
              Book Appointment <Icon name="arrow-right" size={20} className="ml-2" />
            </Link>
            <Link 
              to="/services"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-2xl text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all"
            >
              View Menu
            </Link>
          </div>
        </div>
      </div>
      
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-gradient-to-br from-primary-100/40 to-indigo-100/40 rounded-full blur-3xl -z-0"></div>
    </section>
  );
};
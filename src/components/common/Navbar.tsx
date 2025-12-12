import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Icon } from './Icon';

const { Link, useLocation } = ReactRouterDOM;

export const Navbar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary-600 text-white p-1.5 rounded-lg">
              <Icon name="scissors" size={20} />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-500">
              LuxeBook
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-primary-600' : 'text-slate-600 hover:text-primary-600'}`}
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className={`text-sm font-medium transition-colors ${isActive('/services') ? 'text-primary-600' : 'text-slate-600 hover:text-primary-600'}`}
            >
              Services
            </Link>
            <Link 
              to="/stories" 
              className={`text-sm font-medium transition-colors ${isActive('/stories') ? 'text-primary-600' : 'text-slate-600 hover:text-primary-600'}`}
            >
              Stories
            </Link>
            <Link 
              to="/book" 
              className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-primary-600 hover:bg-primary-700 shadow-sm hover:shadow transition-all"
            >
              Book Now
            </Link>
          </div>

          <button className="md:hidden p-2 text-slate-500 hover:text-slate-700">
            <Icon name="menu" size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};
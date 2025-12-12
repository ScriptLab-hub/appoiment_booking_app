import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Icon } from './Icon';

const { Link, useLocation } = ReactRouterDOM;

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 pb-[env(safe-area-inset-bottom)] z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center">
        <Link 
          to="/" 
          className={`flex flex-col items-center gap-1 ${isActive('/') ? 'text-primary-600' : 'text-slate-400'}`}
        >
          <Icon name="home" size={24} />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        
        <Link 
          to="/book" 
          className="flex flex-col items-center justify-center -mt-8"
        >
          <div className="bg-primary-600 text-white p-4 rounded-full shadow-lg shadow-primary-500/30">
            <Icon name="calendar-plus" size={28} />
          </div>
        </Link>
        
        <button 
          className="flex flex-col items-center gap-1 text-slate-400"
          onClick={() => alert('Profile feature coming soon!')}
        >
          <Icon name="user" size={24} />
          <span className="text-[10px] font-medium">Profile</span>
        </button>
      </div>
    </div>
  );
};
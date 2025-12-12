import React from 'react';
import { Icon } from './Icon';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-12 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary-500 text-white p-1.5 rounded-lg">
                <Icon name="scissors" size={20} />
              </div>
              <span className="text-xl font-bold">LuxeBook</span>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Premium grooming experiences curated for the modern gentleman in Karachi.
            </p>
            <div className="flex items-start gap-2 text-slate-400 text-sm">
              <Icon name="map-pin" size={16} className="mt-1 shrink-0" />
              <span>Building 12-C, Lane 4, Shahbaz Commercial, DHA Phase 6, Karachi.</span>
            </div>
             <div className="flex items-center gap-2 text-slate-400 text-sm mt-2">
              <Icon name="phone" size={16} className="shrink-0" />
              <span>+92 300 1234567</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Social</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white"><Icon name="instagram" size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-white"><Icon name="twitter" size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-white"><Icon name="facebook" size={20} /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} LuxeBook Pakistan. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
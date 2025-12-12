import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { api } from '../lib/api';
import { Service } from '../types';
import { Icon } from '../components/common/Icon';
import { Footer } from '../components/common/Footer';

const { Link } = ReactRouterDOM;

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await api.getServices();
        setServices(data);
      } catch (error) {
        console.error("Failed to load services");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const categories = ['All', ...Array.from(new Set(services.map(s => s.category)))];
  const filteredServices = filter === 'All' ? services : services.filter(s => s.category === filter);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-slate-900 text-white py-20 px-4 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Service Menu</h1>
          <p className="text-slate-400 text-lg">World-class grooming services, tailored for the Karachi lifestyle.</p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                filter === cat 
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
           <div className="flex justify-center py-20"><Icon name="loader-2" size={40} className="animate-spin text-primary-600"/></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map(service => (
              <div key={service.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800">
                    {service.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-slate-900">{service.name}</h3>
                    <span className="text-primary-600 font-bold bg-primary-50 px-2 py-1 rounded-lg">Rs. {service.price.toLocaleString()}</span>
                  </div>
                  <p className="text-slate-500 text-sm mb-6 h-10 line-clamp-2">{service.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center text-slate-400 text-sm">
                      <Icon name="clock" size={16} className="mr-1" />
                      {service.duration} mins
                    </div>
                    <Link 
                      to="/book" 
                      className="flex items-center gap-2 text-sm font-bold text-primary-600 hover:text-primary-700"
                    >
                      Book Now <Icon name="arrow-right" size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import { Service, Staff, TimeSlot, BookingDetails } from '../../types';
import { Icon } from '../common/Icon';
import { useToast } from '../../context/ToastContext';
import * as ReactRouterDOM from 'react-router-dom';

const { useNavigate } = ReactRouterDOM;

const STEPS = ['Service', 'Staff', 'Date & Time', 'Details'];

export const BookingWizard: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Data State
  const [services, setServices] = useState<Service[]>([]);
  const [staffMembers, setStaffMembers] = useState<Staff[]>([]);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  
  // Selection State
  const [booking, setBooking] = useState<BookingDetails>({
    serviceId: null,
    staffId: null,
    date: null,
    time: null,
    customerName: '',
    customerEmail: '',
    customerPhone: '',
  });

  // Success State
  const [confirmedTicket, setConfirmedTicket] = useState<string | null>(null);

  // Load Services on Mount
  useEffect(() => {
    const loadServices = async () => {
      setLoading(true);
      try {
        const data = await api.getServices();
        setServices(data);
      } catch (err) {
        addToast('Error', 'Failed to load services', 'error');
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, [addToast]);

  // Load Staff when Service Selected
  useEffect(() => {
    if (currentStep === 2 && booking.serviceId) {
      const loadStaff = async () => {
        setLoading(true);
        try {
          const data = await api.getStaff(booking.serviceId!);
          setStaffMembers(data);
        } catch (err) {
          addToast('Error', 'Failed to load staff', 'error');
        } finally {
          setLoading(false);
        }
      };
      loadStaff();
    }
  }, [currentStep, booking.serviceId, addToast]);

  // Load Slots when Staff & Date Selected
  useEffect(() => {
    if (currentStep === 3 && booking.staffId && booking.date) {
      const loadSlots = async () => {
        setLoading(true);
        try {
          const data = await api.getSlots(booking.date!, booking.staffId!);
          setSlots(data);
        } catch (err) {
          addToast('Error', 'Failed to load slots', 'error');
        } finally {
          setLoading(false);
        }
      };
      loadSlots();
    }
  }, [currentStep, booking.staffId, booking.date, addToast]);

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(c => c + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(c => c - 1);
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const result = await api.bookAppointment(booking);
      if (result.success) {
        setConfirmedTicket(result.ticketId);
        addToast('Success', 'Booking Confirmed!', 'success');
        // We stay on this page to show the Ticket UI
      }
    } catch (err) {
      addToast('Error', 'Booking failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const resetBooking = () => {
    setConfirmedTicket(null);
    setBooking({
      serviceId: null,
      staffId: null,
      date: null,
      time: null,
      customerName: '',
      customerEmail: '',
      customerPhone: '',
    });
    setCurrentStep(1);
    navigate('/');
  };

  const selectedService = services.find(s => s.id === booking.serviceId);
  const selectedStaff = staffMembers.find(s => s.id === booking.staffId);

  // Render Ticket UI if confirmed
  if (confirmedTicket) {
    return (
      <div className="max-w-md mx-auto px-4 py-8 md:py-12 animate-fade-in print:p-0 print:w-full print:max-w-none">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8 relative print:shadow-none print:border print:border-slate-300">
          {/* Ticket Header */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-8 text-white text-center relative overflow-hidden print:bg-none print:text-black print:border-b print:border-slate-200">
             {/* Decorative pattern - hidden in print */}
             <div className="absolute top-0 left-0 w-full h-full opacity-10 print:hidden" style={{ backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2.5px)', backgroundSize: '20px 20px' }}></div>
             
             <div className="relative z-10">
               <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm shadow-inner ring-1 ring-white/30 print:hidden">
                 <Icon name="check" size={32} className="text-white" />
               </div>
               <h2 className="text-2xl font-bold mb-1 tracking-tight">Booking Confirmed</h2>
               <p className="text-primary-100 text-sm font-medium print:text-slate-600">See you in DHA Phase 6!</p>
             </div>
          </div>

          {/* Ticket Body */}
          <div className="p-8 pb-10">
            <div className="text-center mb-8">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-2">TICKET ID</p>
              <p className="text-2xl font-mono font-bold text-slate-900 tracking-widest">{confirmedTicket}</p>
            </div>

            <div className="space-y-6">
              {/* Service Info */}
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 print:bg-white print:border-slate-300">
                <img src={selectedService?.image} className="w-16 h-16 rounded-xl object-cover shadow-sm print:hidden" alt="Service" />
                <div>
                  <h3 className="font-bold text-slate-900 leading-tight mb-1">{selectedService?.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1"><Icon name="clock" size={12} /> {selectedService?.duration}m</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span className="text-primary-600 font-bold">Rs. {selectedService?.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border border-slate-100 rounded-xl bg-white text-center print:border-slate-300">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">DATE</p>
                  <p className="font-bold text-slate-900">{booking.date}</p>
                </div>
                <div className="p-3 border border-slate-100 rounded-xl bg-white text-center print:border-slate-300">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">TIME</p>
                  <p className="font-bold text-slate-900 text-primary-600 print:text-black">{booking.time}</p>
                </div>
              </div>

              {/* Staff & Location */}
              <div className="flex items-center gap-3 p-3 border-t border-b border-slate-100 py-4">
                <img src={selectedStaff?.image} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm print:hidden" alt="Staff" />
                <div className="flex-1">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">STYLIST</p>
                  <p className="font-bold text-slate-900 text-sm">{selectedStaff?.name}</p>
                </div>
                <div className="text-right">
                   <p className="text-[10px] text-slate-400 font-bold uppercase">LOCATION</p>
                   <p className="font-bold text-slate-900 text-sm">DHA Phase 6</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Tear-off Section */}
          <div className="relative bg-slate-50 p-6 border-t-2 border-dashed border-slate-300 print:bg-white">
             {/* Visual Cutouts - hidden in print */}
             <div className="absolute -top-3 -left-3 w-6 h-6 bg-slate-50 rounded-full z-10 print:hidden"></div> 
             <div className="absolute -top-3 -right-3 w-6 h-6 bg-slate-50 rounded-full z-10 print:hidden"></div>

             <div className="flex justify-between items-center">
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">GUEST</p>
                  <p className="font-bold text-slate-900 truncate max-w-[150px]">{booking.customerName}</p>
                </div>
                <div className="text-right opacity-80">
                  <Icon name="qr-code" size={48} className="text-slate-900" />
                </div>
             </div>
          </div>
        </div>

        {/* Actions - Hidden when printing */}
        <div className="flex flex-col gap-3 print:hidden">
          <button onClick={() => window.print()} className="w-full py-4 bg-white text-slate-700 font-bold rounded-2xl shadow-sm border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2 group">
            <Icon name="download" size={20} className="group-hover:scale-110 transition-transform"/> Download Ticket
          </button>
          <button onClick={resetBooking} className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Standard Wizard Steps
  const renderStep = () => {
    switch (currentStep) {
      case 1: // Service Selection
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map(service => (
              <button
                key={service.id}
                onClick={() => {
                  setBooking(prev => ({ ...prev, serviceId: service.id }));
                  handleNext();
                }}
                className={`group text-left p-4 rounded-2xl border transition-all duration-200 flex items-center gap-4 hover:shadow-lg ${
                  booking.serviceId === service.id 
                    ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-500' 
                    : 'border-slate-200 bg-white hover:border-primary-200'
                }`}
              >
                <img src={service.image} alt={service.name} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900">{service.name}</h3>
                  <p className="text-sm text-slate-500 mb-2 line-clamp-2">{service.description}</p>
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-700">
                    <span className="flex items-center gap-1"><Icon name="clock" size={14} /> {service.duration}m</span>
                    <span className="flex items-center gap-1"><Icon name="dollar-sign" size={14} /> Rs. {service.price.toLocaleString()}</span>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${booking.serviceId === service.id ? 'border-primary-600 bg-primary-600 text-white' : 'border-slate-300'}`}>
                   {booking.serviceId === service.id && <Icon name="check" size={14} />}
                </div>
              </button>
            ))}
          </div>
        );

      case 2: // Staff Selection
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {staffMembers.map(staff => (
              <button
                key={staff.id}
                onClick={() => {
                  setBooking(prev => ({ ...prev, staffId: staff.id }));
                  handleNext();
                }}
                className={`group p-4 rounded-2xl border transition-all text-center flex flex-col items-center gap-3 hover:shadow-lg ${
                  booking.staffId === staff.id 
                    ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-500' 
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="relative">
                  <img src={staff.image} alt={staff.name} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-2 py-0.5 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
                    <Icon name="star" size={10} className="text-yellow-400 fill-current" /> {staff.rating}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{staff.name}</h3>
                  <p className="text-xs text-slate-500">{staff.role}</p>
                </div>
              </button>
            ))}
          </div>
        );

      case 3: // Date & Time
        const today = new Date().toISOString().split('T')[0];
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Select Date</label>
              <input 
                type="date" 
                min={today}
                value={booking.date || ''}
                onChange={(e) => setBooking(prev => ({ ...prev, date: e.target.value, time: null }))}
                className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white"
              />
            </div>
            
            {booking.date && (
              <div className="animate-fade-in">
                <label className="block text-sm font-medium text-slate-700 mb-2">Available Slots</label>
                {loading ? (
                   <div className="py-8 text-center text-slate-400"><Icon name="loader-2" size={24} className="animate-spin mx-auto"/></div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {slots.map((slot, idx) => (
                      <button
                        key={idx}
                        disabled={!slot.available}
                        onClick={() => setBooking(prev => ({ ...prev, time: slot.time }))}
                        className={`py-3 px-2 rounded-xl text-sm font-medium transition-all ${
                          !slot.available 
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed decoration-slate-400' 
                            : booking.time === slot.time
                              ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30 transform scale-105'
                              : 'bg-white border border-slate-200 text-slate-700 hover:border-primary-300 hover:shadow-sm'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case 4: // Details
        return (
          <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Booking Summary</h3>
              <div className="flex items-center gap-4 mb-4">
                <img src={selectedService?.image} className="w-16 h-16 rounded-lg object-cover shadow-sm" />
                <div>
                   <p className="font-bold text-slate-900">{selectedService?.name}</p>
                   <p className="text-sm text-slate-500">with {selectedStaff?.name}</p>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm py-2 border-t border-slate-200 border-dashed">
                <span className="text-slate-600">Date & Time</span>
                <span className="font-semibold text-slate-900">{booking.date} at {booking.time}</span>
              </div>
              <div className="flex justify-between items-center text-sm py-2 border-t border-slate-200 border-dashed">
                <span className="text-slate-600">Total Price</span>
                <span className="font-bold text-primary-600 text-lg">Rs. {selectedService?.price.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 ml-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Ali Khan"
                  value={booking.customerName}
                  onChange={(e) => setBooking(prev => ({ ...prev, customerName: e.target.value }))}
                  className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none bg-white transition-all focus:border-transparent"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 ml-1">Email Address</label>
                <input
                  type="email"
                  placeholder="ali@example.com"
                  value={booking.customerEmail}
                  onChange={(e) => setBooking(prev => ({ ...prev, customerEmail: e.target.value }))}
                  className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none bg-white transition-all focus:border-transparent"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 ml-1">Phone Number (Optional)</label>
                <input
                  type="tel"
                  placeholder="0300 1234567"
                  value={booking.customerPhone}
                  onChange={(e) => setBooking(prev => ({ ...prev, customerPhone: e.target.value }))}
                  className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none bg-white transition-all focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 pb-32 md:pb-8">
      {/* Progress Bar - Hidden on print */}
      <div className="mb-8 print:hidden">
        <div className="flex justify-between mb-2 px-1">
          {STEPS.map((stepName, index) => (
            <span 
              key={index} 
              className={`text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${index + 1 <= currentStep ? 'text-primary-600' : 'text-slate-300'}`}
            >
              {stepName}
            </span>
          ))}
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]"
            style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden print:shadow-none print:border-none">
        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 print:hidden">{STEPS[currentStep - 1]}</h2>
          
          <div className="min-h-[400px] print:min-h-0">
            {renderStep()}
          </div>
        </div>

        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-between items-center print:hidden">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-xl text-sm font-semibold transition-colors ${
              currentStep === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-white hover:shadow-sm'
            }`}
          >
            Back
          </button>
          
          {currentStep === 4 ? (
            <button
              onClick={handleConfirm}
              disabled={loading || !booking.customerName || !booking.customerEmail}
              className="flex items-center gap-2 px-8 py-3 bg-primary-600 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/30 hover:bg-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
            >
              {loading ? <Icon name="loader-2" size={18} className="animate-spin" /> : <Icon name="check-circle" size={18} />}
              Confirm Booking
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !booking.serviceId) ||
                (currentStep === 2 && !booking.staffId) ||
                (currentStep === 3 && (!booking.date || !booking.time))
              }
              className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 shadow-md"
            >
              Next Step <Icon name="arrow-right" size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
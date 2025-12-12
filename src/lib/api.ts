import { Service, Staff, TimeSlot, BookingDetails } from '../types';

/**
 * BACKEND CONFIGURATION
 */
const USE_MOCK = true; // Force mock for frontend demo
const API_BASE = 'http://localhost:8000';

const MOCK_SERVICES: Service[] = [
  {
    id: '1',
    name: 'The Clifton Cut',
    description: 'Precision scissor cut with styling, hair wash, and hot towel finish.',
    price: 2500,
    duration: 45,
    image: 'https://images.unsplash.com/photo-1593702295094-aea8c59b29fc?auto=format&fit=crop&q=80&w=400',
    category: 'Hair',
  },
  {
    id: '2',
    name: 'Beard Sculpting',
    description: 'Expert trimming, razor lining, and beard oil application.',
    price: 1500,
    duration: 30,
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=400',
    category: 'Beard',
  },
  {
    id: '3',
    name: 'The Groom\'s Royal Package',
    description: 'Full haircut, beard styling, whitening facial, and relaxing head massage.',
    price: 8000,
    duration: 120,
    image: 'https://images.unsplash.com/photo-1503951914875-452162b7f30a?auto=format&fit=crop&q=80&w=400',
    category: 'Package',
  },
  {
    id: '4',
    name: 'Karachi Dust Detox',
    description: 'Deep cleansing charcoal facial to remove pollution and revitalize skin.',
    price: 3500,
    duration: 45,
    image: 'https://images.unsplash.com/photo-1512690459411-b9245aed1e3e?auto=format&fit=crop&q=80&w=400',
    category: 'Face',
  },
  {
    id: '5',
    name: 'Protein Hair Treatment',
    description: 'Intense keratin infusion for dry and damaged hair.',
    price: 4000,
    duration: 60,
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=400',
    category: 'Hair',
  },
  {
    id: '6',
    name: 'Relaxing Head Massage',
    description: 'Traditional oil massage to relieve stress and improve circulation.',
    price: 1200,
    duration: 30,
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=400',
    category: 'Massage',
  },
];

const MOCK_STAFF: Staff[] = [
  {
    id: 's1',
    name: 'Bilal Ahmed',
    role: 'Senior Stylist',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 's2',
    name: 'Zara Sheikh',
    role: 'Skin Specialist',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 's3',
    name: 'Kamran Khan',
    role: 'Master Barber',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
  },
];

const MOCK_SLOTS: TimeSlot[] = [
  { time: '11:00 AM', available: true },
  { time: '11:30 AM', available: false },
  { time: '12:00 PM', available: true },
  { time: '12:30 PM', available: true },
  { time: '02:00 PM', available: true },
  { time: '02:30 PM', available: true },
  { time: '03:00 PM', available: false },
  { time: '03:30 PM', available: true },
  { time: '04:00 PM', available: true },
  { time: '05:00 PM', available: true },
  { time: '06:00 PM', available: true },
  { time: '07:00 PM', available: true },
  { time: '08:00 PM', available: true },
];

async function fetchWithDelay<T>(data: T, delay = 800): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
}

export const api = {
  getServices: async (): Promise<Service[]> => {
    if (USE_MOCK) return fetchWithDelay(MOCK_SERVICES);
    try {
      const res = await fetch(`${API_BASE}/api/services`);
      if (!res.ok) throw new Error('Failed to fetch services');
      const json = await res.json();
      return json.data;
    } catch (e) {
      console.error(e);
      return MOCK_SERVICES;
    }
  },

  getStaff: async (serviceId: string): Promise<Staff[]> => {
    if (USE_MOCK) return fetchWithDelay(MOCK_STAFF);
    try {
      const res = await fetch(`${API_BASE}/api/staff?service_id=${serviceId}`);
      if (!res.ok) throw new Error('Failed to fetch staff');
      const json = await res.json();
      return json.data;
    } catch (e) {
      console.error(e);
      return MOCK_STAFF;
    }
  },

  getSlots: async (date: string, staffId: string): Promise<TimeSlot[]> => {
    if (USE_MOCK) return fetchWithDelay(MOCK_SLOTS);
    try {
      const res = await fetch(`${API_BASE}/api/slots?date=${date}&staff=${staffId}`);
      if (!res.ok) throw new Error('Failed to fetch slots');
      const json = await res.json();
      return json.data;
    } catch (e) {
      console.error(e);
      return MOCK_SLOTS;
    }
  },

  bookAppointment: async (details: BookingDetails): Promise<{ success: boolean; ticketId: string }> => {
    if (USE_MOCK) {
      return fetchWithDelay({ success: true, ticketId: `KHI-${Math.floor(Math.random() * 10000)}` }, 1500);
    }
    
    // Map camelCase to snake_case for backend
    const payload = {
      service_id: details.serviceId,
      staff_id: details.staffId,
      date: details.date,
      time: details.time,
      customer_name: details.customerName,
      customer_email: details.customerEmail,
      customer_phone: details.customerPhone,
      location_type: 'clinic', // default
      total_price: 0 // In a real app, calculate this server-side
    };

    const res = await fetch(`${API_BASE}/api/book`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    
    if (!res.ok) throw new Error('Booking failed');
    
    const json = await res.json();
    return { 
      success: true, 
      ticketId: `KHI-${json.data.id}` // Use DB ID to form ticket
    };
  },
};
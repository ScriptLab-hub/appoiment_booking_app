export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // minutes
  image: string;
  category: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  image: string;
  rating: number;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface BookingDetails {
  serviceId: string | null;
  staffId: string | null;
  date: string | null; // ISO date string YYYY-MM-DD
  time: string | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info';
}
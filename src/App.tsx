import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/common/Navbar';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { StoriesPage } from './pages/StoriesPage';
import { BookingWizard } from './components/booking/BookingWizard';

const { HashRouter: Router, Routes, Route, Navigate } = ReactRouterDOM;

const App: React.FC = () => {
  return (
    <Router>
      <ToastProvider>
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-primary-100 selection:text-primary-900">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/stories" element={<StoriesPage />} />
              <Route path="/book" element={<BookingWizard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <MobileBottomNav />
        </div>
      </ToastProvider>
    </Router>
  );
};

export default App;
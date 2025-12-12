import React, { createContext, useContext, useState, useCallback } from 'react';
import { ToastMessage } from '../types';
import { Icon } from '../components/common/Icon';

interface ToastContextType {
  addToast: (title: string, message: string, type?: ToastMessage['type']) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((title: string, message: string, type: ToastMessage['type'] = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border w-80 transform transition-all animate-[slideIn_0.3s_ease-out] ${
              toast.type === 'success' ? 'bg-white border-green-100 text-green-800' :
              toast.type === 'error' ? 'bg-white border-red-100 text-red-800' :
              'bg-white border-slate-100 text-slate-800'
            }`}
          >
            <div className={`mt-0.5 p-1 rounded-full ${
              toast.type === 'success' ? 'bg-green-100 text-green-600' :
              toast.type === 'error' ? 'bg-red-100 text-red-600' :
              'bg-blue-100 text-blue-600'
            }`}>
              <Icon name={toast.type === 'success' ? 'check' : toast.type === 'error' ? 'alert-circle' : 'info'} size={16} />
            </div>
            <div>
              <h4 className="font-semibold text-sm">{toast.title}</h4>
              <p className="text-sm opacity-90">{toast.message}</p>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { CheckCircle } from 'lucide-react';

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');

  const showToast = useCallback((msg: string) => {
    setMessage(msg);
    setIsVisible(true);

    // Скрываем через 3 секунды
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Само всплывающее окно (Toast) */}
      <div 
        className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl transition-all duration-300 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
        }`}
      >
        <CheckCircle className="text-green-400" size={24} />
        <span className="font-medium">{message}</span>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
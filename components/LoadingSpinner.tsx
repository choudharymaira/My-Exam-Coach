
import React, { useState, useEffect } from 'react';
import { LOADING_MESSAGES } from '../constants';

const LoadingSpinner: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center animate-fade-in">
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute inset-0 border-4 border-[#D2B48C] border-t-[#8B5E3C] rounded-full animate-spin"></div>
        <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
          <span className="text-2xl">☕</span>
        </div>
      </div>
      <p className="text-xl font-medium text-[#8B5E3C] transition-all duration-500">
        {LOADING_MESSAGES[messageIndex]}
      </p>
      <p className="mt-2 text-sm text-[#4A3728] opacity-70 italic">
        "Education is the most powerful weapon which you can use to change the world."
      </p>
    </div>
  );
};

export default LoadingSpinner;

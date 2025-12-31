
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="flex-1 bg-gradient-to-br from-orange-500 to-amber-400 flex flex-col items-center justify-center text-white">
      <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl mb-6 animate-bounce">
         <svg className="w-20 h-20 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.789l-1.599.8.796 3.978a1 1 0 01-.19.833L11.5 17.5a1 1 0 01-1.5 0l-4.954-5.004a1 1 0 01-.19-.833l.796-3.978-1.599-.8a1 1 0 11.894-1.789l1.599.8L9 4.323V3a1 1 0 011-1z" />
         </svg>
      </div>
      <h1 className="text-4xl font-bold tracking-tight">Pet Pulse</h1>
      <p className="mt-2 text-orange-100 font-medium italic">Keeping paws connected</p>
      
      <div className="absolute bottom-12 flex space-x-2">
        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-75"></div>
        <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-150"></div>
      </div>
    </div>
  );
};

export default SplashScreen;

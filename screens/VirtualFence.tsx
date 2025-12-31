
import React, { useState } from 'react';
import { Geofence } from '../types';

interface VirtualFenceProps {
  onBack: () => void;
  geofence: Geofence;
  setGeofence: (fence: Geofence) => void;
}

const VirtualFence: React.FC<VirtualFenceProps> = ({ onBack, geofence, setGeofence }) => {
  const [radius, setRadius] = useState(geofence.radius);

  const handleSave = () => {
    setGeofence({ ...geofence, radius });
    onBack();
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      <header className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
            <button onClick={onBack} className="p-2 text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <h2 className="text-xl font-bold ml-2">Virtual Fence</h2>
        </div>
        <button onClick={handleSave} className="text-green-600 font-bold px-3">Save</button>
      </header>

      <div className="flex-1 relative bg-gray-50 flex flex-col">
        {/* Mock Map with Circle */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-20 grayscale">
                <div className="w-full h-full bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px]"></div>
            </div>
            
            <div className="relative">
                {/* Home Marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-10 h-10 bg-white rounded-full border-4 border-green-500 flex items-center justify-center text-xl shadow-xl">
                        🏠
                    </div>
                </div>

                {/* Fence Circle */}
                <div 
                    className="border-4 border-green-400 bg-green-500/10 rounded-full transition-all duration-300"
                    style={{ 
                        width: `${radius * 0.8}px`, 
                        height: `${radius * 0.8}px`,
                        maxWidth: '300px',
                        maxHeight: '300px'
                    }}
                ></div>
            </div>
        </div>

        {/* Controls Overlay */}
        <div className="bg-white p-8 rounded-t-3xl shadow-2xl border-t border-gray-100">
            <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-800 text-lg">Perimeter Radius</h3>
                    <span className="text-green-600 font-bold text-xl">{radius}m</span>
                </div>
                <input 
                    type="range" 
                    min="50" 
                    max="1000" 
                    step="10"
                    value={radius}
                    onChange={(e) => setRadius(parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <div className="flex justify-between text-xs text-gray-400 font-bold mt-2">
                    <span>MIN (50m)</span>
                    <span>MAX (1000m)</span>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center space-x-3">
                        <span className="text-xl">🔔</span>
                        <div>
                            <p className="font-bold text-gray-800 text-sm">Escape Alert</p>
                            <p className="text-xs text-gray-500">Notify me immediately</p>
                        </div>
                    </div>
                    <div className="w-12 h-6 bg-green-500 rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                </div>

                <p className="text-xs text-center text-gray-400 px-4">
                    You will receive a push notification if your pet leaves this area. Make sure high-accuracy location is enabled.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualFence;

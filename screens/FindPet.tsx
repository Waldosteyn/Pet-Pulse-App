
import React, { useState } from 'react';
import { Pet } from '../types';

interface FindPetProps {
  onBack: () => void;
  pets: Pet[];
}

const FindPet: React.FC<FindPetProps> = ({ onBack, pets }) => {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(pets[0] || null);

  return (
    <div className="flex-1 flex flex-col h-full bg-gray-100">
      <header className="p-4 bg-white border-b flex items-center justify-between z-10">
        <div className="flex items-center">
            <button onClick={onBack} className="p-2 text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <h2 className="text-xl font-bold ml-2">Live Tracking</h2>
        </div>
        {selectedPet && (
            <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                <span className="text-xs font-bold text-green-700">Online</span>
            </div>
        )}
      </header>

      <div className="flex-1 relative bg-blue-50 overflow-hidden">
        {/* Mock Map Background */}
        <div className="absolute inset-0 opacity-40">
            <div className="w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
        </div>
        
        {/* Mock Map Streets */}
        <div className="absolute top-1/2 left-0 w-full h-2 bg-white/50 -rotate-12"></div>
        <div className="absolute top-0 left-1/3 w-2 h-full bg-white/50 rotate-6"></div>

        {/* Pet Pin */}
        {selectedPet && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="relative">
                    <div className="w-12 h-12 bg-white rounded-full border-4 border-blue-500 p-0.5 overflow-hidden shadow-2xl animate-bounce">
                        <img src={`https://picsum.photos/seed/${selectedPet.name}/100/100`} alt={selectedPet.name} className="w-full h-full rounded-full object-cover" />
                    </div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-2 bg-blue-900/20 blur-sm rounded-full"></div>
                </div>
                <div className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    {selectedPet.name}
                </div>
            </div>
        )}

        {/* Map Controls */}
        <div className="absolute right-4 bottom-32 space-y-2">
            <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-xl text-gray-600">⊕</button>
            <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-xl text-gray-600">⊖</button>
            <button className="w-12 h-12 bg-blue-500 rounded-full shadow-lg flex items-center justify-center text-xl text-white">⌖</button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-t-3xl shadow-[0_-8px_30px_rgb(0,0,0,0.12)] z-10 -mt-6">
        <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6"></div>
        
        <div className="flex items-center space-x-4 overflow-x-auto pb-2">
            {pets.map(pet => (
                <button 
                    key={pet.id}
                    onClick={() => setSelectedPet(pet)}
                    className={`flex items-center space-x-3 p-3 rounded-2xl border transition-all min-w-[160px] ${selectedPet?.id === pet.id ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-100' : 'bg-gray-50 border-gray-100'}`}
                >
                    <img src={`https://picsum.photos/seed/${pet.name}/40/40`} className="w-10 h-10 rounded-full object-cover" />
                    <div className="text-left">
                        <p className="font-bold text-sm text-gray-800">{pet.name}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-tight">{pet.trackerId ? 'Tracking active' : 'No tag linked'}</p>
                    </div>
                </button>
            ))}
        </div>

        {selectedPet && (
            <div className="mt-6 flex items-center justify-between">
                <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase">Last seen</h4>
                    <p className="text-gray-800 font-medium">Near Central Park • 2 mins ago</p>
                </div>
                <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-xl font-bold text-sm">
                    Navigate
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default FindPet;

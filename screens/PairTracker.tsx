
import React, { useState } from 'react';
import { Pet } from '../types';

interface PairTrackerProps {
  onBack: () => void;
  pets: Pet[];
  setPets: React.Dispatch<React.SetStateAction<Pet[]>>;
}

const PairTracker: React.FC<PairTrackerProps> = ({ onBack, pets, setPets }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [targetPetId, setTargetPetId] = useState<string>(pets[0]?.id || '');
  const [pairingSuccess, setPairingSuccess] = useState(false);

  const startScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setPairingSuccess(true);
      
      const trackerId = `GT-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      setPets(prev => prev.map(p => p.id === targetPetId ? { ...p, trackerId } : p));
      
      setTimeout(() => setPairingSuccess(false), 3000);
    }, 4000);
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      <header className="p-4 border-b flex items-center">
        <button onClick={onBack} className="p-2 text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h2 className="text-xl font-bold ml-2">Pair Tracker Tag</h2>
      </header>

      <div className="p-8 flex-1 flex flex-col items-center text-center space-y-8">
        <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-800">Link your Android Tag</h3>
            <p className="text-gray-500">Hold your tag close to your phone to sync with Pet Pulse.</p>
        </div>

        <div className="relative w-64 h-64 flex items-center justify-center">
            {isScanning ? (
                <div className="absolute inset-0 rounded-full border-4 border-indigo-500 animate-ping opacity-20"></div>
            ) : null}
            <div className={`w-48 h-48 rounded-full flex flex-col items-center justify-center transition-all duration-500 ${isScanning ? 'bg-indigo-50 border-4 border-indigo-200 shadow-xl' : 'bg-gray-50 border-2 border-dashed border-gray-300'}`}>
                {pairingSuccess ? (
                    <div className="text-green-500 text-6xl">✓</div>
                ) : (
                    <>
                        <span className="text-5xl mb-2">{isScanning ? '📡' : '🏷️'}</span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{isScanning ? 'Scanning...' : 'Ready to Pair'}</span>
                    </>
                )}
            </div>
        </div>

        <div className="w-full space-y-4">
            <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-gray-400 uppercase">Select Pet</label>
                <select 
                    className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
                    value={targetPetId}
                    onChange={(e) => setTargetPetId(e.target.value)}
                >
                    {pets.map(p => (
                        <option key={p.id} value={p.id}>{p.name} {p.trackerId ? '(Linked)' : ''}</option>
                    ))}
                </select>
            </div>

            <button 
                onClick={startScan}
                disabled={isScanning}
                className={`w-full py-4 rounded-2xl font-bold text-white transition-all shadow-lg ${isScanning ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600 active:scale-95 shadow-indigo-100'}`}
            >
                {isScanning ? 'Discovering Tag...' : 'Start Pairing'}
            </button>
        </div>

        <div className="p-4 bg-indigo-50 rounded-2xl flex items-start space-x-3 text-left">
            <span className="text-indigo-500 mt-1">ℹ️</span>
            <p className="text-xs text-indigo-700 leading-relaxed">
                Pet Pulse works best with Google-certified Android tags. Make sure Bluetooth is enabled and the tag has sufficient battery.
            </p>
        </div>
      </div>
    </div>
  );
};

export default PairTracker;

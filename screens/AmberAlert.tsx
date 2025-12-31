
import React, { useState } from 'react';
import { Pet } from '../types';
import { generateAmberAlertDescription } from '../services/geminiService';

interface AmberAlertProps {
  onBack: () => void;
  pets: Pet[];
  setPets: React.Dispatch<React.SetStateAction<Pet[]>>;
}

const AmberAlertScreen: React.FC<AmberAlertProps> = ({ onBack, pets, setPets }) => {
  const [step, setStep] = useState<'SELECT' | 'CONFIRM' | 'ALERT_ACTIVE'>('SELECT');
  const [selectedPetId, setSelectedPetId] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiDescription, setAiDescription] = useState('');

  const handleTrigger = async () => {
    setIsGenerating(true);
    const pet = pets.find(p => p.id === selectedPetId);
    if (pet) {
        const desc = await generateAmberAlertDescription(pet);
        setAiDescription(desc);
        setPets(prev => prev.map(p => p.id === selectedPetId ? { ...p, isLost: true } : p));
        setStep('ALERT_ACTIVE');
    }
    setIsGenerating(false);
  };

  const selectedPet = pets.find(p => p.id === selectedPetId);

  return (
    <div className="flex-1 flex flex-col bg-white">
      <header className={`p-4 flex items-center ${step === 'ALERT_ACTIVE' ? 'bg-red-500 text-white' : 'border-b'}`}>
        <button onClick={onBack} className="p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h2 className="text-xl font-bold ml-2">Amber Alert</h2>
      </header>

      {step === 'SELECT' && (
        <div className="p-6 flex-1 space-y-6">
            <div className="text-center space-y-2">
                <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-4xl mx-auto shadow-inner">🚨</div>
                <h3 className="text-2xl font-bold text-gray-800">Lost a Pet?</h3>
                <p className="text-gray-500">Triggering an Amber Alert sends a notification to all users within a 30km radius.</p>
            </div>

            <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-400 uppercase">Which pet is missing?</h4>
                <div className="grid grid-cols-1 gap-3">
                    {pets.map(pet => (
                        <button 
                            key={pet.id}
                            onClick={() => { setSelectedPetId(pet.id); setStep('CONFIRM'); }}
                            className="flex items-center p-4 bg-gray-50 border border-gray-100 rounded-2xl hover:border-red-200 hover:bg-red-50 transition-all group"
                        >
                            <img src={`https://picsum.photos/seed/${pet.name}/50/50`} className="w-12 h-12 rounded-full object-cover mr-4" />
                            <div className="flex-1 text-left">
                                <p className="font-bold text-gray-800">{pet.name}</p>
                                <p className="text-xs text-gray-500">{pet.breed}</p>
                            </div>
                            <span className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
      )}

      {step === 'CONFIRM' && selectedPet && (
        <div className="p-6 flex-1 flex flex-col items-center space-y-8">
            <div className="text-center space-y-4">
                <div className="relative inline-block">
                    <img src={`https://picsum.photos/seed/${selectedPet.name}/150/150`} className="w-32 h-32 rounded-3xl object-cover shadow-2xl" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full border-4 border-white"></div>
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-gray-800">Confirm Alert</h3>
                    <p className="text-gray-500">Are you sure you want to broadcast an alert for <span className="font-bold text-red-500">{selectedPet.name}</span>?</p>
                </div>
            </div>

            <div className="w-full bg-red-50 p-5 rounded-2xl border border-red-100">
                <h4 className="text-red-800 font-bold mb-2">Notice:</h4>
                <ul className="text-red-700 text-sm space-y-2 list-disc pl-4">
                    <li>Broadcasting to users in 30km radius</li>
                    <li>Updating pet status to "MISSING"</li>
                    <li>Enabling high-priority tag pinging</li>
                </ul>
            </div>

            <div className="w-full mt-auto space-y-3">
                <button 
                    onClick={handleTrigger}
                    disabled={isGenerating}
                    className="w-full bg-red-600 text-white font-bold py-5 rounded-2xl shadow-xl shadow-red-200 active:scale-95 transition-all flex items-center justify-center"
                >
                    {isGenerating ? (
                        <span className="flex items-center">
                            <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                            Generating Report...
                        </span>
                    ) : 'TRIGGER AMBER ALERT'}
                </button>
                <button onClick={() => setStep('SELECT')} className="w-full py-4 text-gray-500 font-bold">Cancel</button>
            </div>
        </div>
      )}

      {step === 'ALERT_ACTIVE' && selectedPet && (
        <div className="flex-1 bg-red-600 p-8 flex flex-col text-white">
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
                <div className="w-40 h-40 bg-white p-2 rounded-3xl shadow-2xl rotate-3 relative overflow-hidden">
                    <img src={`https://picsum.photos/seed/${selectedPet.name}/200/200`} className="w-full h-full rounded-2xl object-cover grayscale" />
                    <div className="absolute inset-0 bg-red-500/20"></div>
                    <div className="absolute bottom-2 right-2 bg-red-600 text-[10px] font-black px-2 py-1 rounded">MISSING</div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-4xl font-black italic tracking-tighter">ALERT ACTIVE</h2>
                    <p className="text-red-100 font-medium">Notifications sent to 1,248 guardians nearby.</p>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl text-left border border-white/20">
                    <p className="text-xs font-bold uppercase tracking-widest text-red-200 mb-2">Smart Broadcast Description:</p>
                    <p className="text-sm italic leading-relaxed">"{aiDescription}"</p>
                </div>

                <div className="grid grid-cols-3 gap-4 w-full">
                    <div className="bg-white/10 p-3 rounded-2xl text-center">
                        <span className="block text-xl font-bold">32</span>
                        <span className="text-[10px] uppercase font-bold text-red-200">Sighted</span>
                    </div>
                    <div className="bg-white/10 p-3 rounded-2xl text-center">
                        <span className="block text-xl font-bold">142</span>
                        <span className="text-[10px] uppercase font-bold text-red-200">Searches</span>
                    </div>
                    <div className="bg-white/10 p-3 rounded-2xl text-center">
                        <span className="block text-xl font-bold">0.4km</span>
                        <span className="text-[10px] uppercase font-bold text-red-200">Tag Dist</span>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <button 
                    onClick={() => {
                        setPets(prev => prev.map(p => p.id === selectedPetId ? { ...p, isLost: false } : p));
                        onBack();
                    }}
                    className="w-full bg-white text-red-600 font-bold py-4 rounded-2xl shadow-xl active:scale-95 transition-all"
                >
                    I Found My Pet!
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default AmberAlertScreen;


import React, { useState } from 'react';
import { Pet } from '../types';

interface AddPetProps {
  onBack: () => void;
  onAdd: (pet: Pet) => void;
}

const AddPet: React.FC<AddPetProps> = ({ onBack, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Dog',
    breed: '',
    color: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPet: Pet = {
      ...formData,
      id: Date.now().toString(),
      isLost: false,
      location: { lat: 34.0522, lng: -118.2437 }
    };
    onAdd(newPet);
    onBack();
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      <header className="p-4 border-b flex items-center">
        <button onClick={onBack} className="p-2 text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h2 className="text-xl font-bold ml-2">Add New Pet</h2>
      </header>

      <form onSubmit={handleSubmit} className="p-6 space-y-4 flex-1 overflow-y-auto">
        <div className="flex justify-center mb-4">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300 relative group cursor-pointer">
                <span className="text-3xl text-gray-400 group-hover:text-orange-500">📸</span>
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 rounded-full transition-opacity"></div>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Pet Name</label>
                <input required className="w-full p-3 bg-gray-50 border rounded-xl" placeholder="e.g. Angus" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Pet Type</label>
                <select className="w-full p-3 bg-gray-50 border rounded-xl" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                    <option>Dog</option>
                    <option>Cat</option>
                    <option>Bird</option>
                    <option>Other</option>
                </select>
            </div>
        </div>

        <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Breed</label>
            <input required className="w-full p-3 bg-gray-50 border rounded-xl" placeholder="e.g. Border-Collie" value={formData.breed} onChange={e => setFormData({...formData, breed: e.target.value})} />
        </div>

        <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Colour</label>
            <input required className="w-full p-3 bg-gray-50 border rounded-xl" placeholder="e.g. black and white" value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} />
        </div>

        <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Other Descriptions</label>
            <textarea required rows={3} className="w-full p-3 bg-gray-50 border rounded-xl" placeholder="e.g. splash of white above right eye" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
        </div>

        <div className="pt-6">
          <button type="submit" className="w-full bg-teal-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-teal-200 active:scale-95 transition-all">
            Register Pet
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPet;

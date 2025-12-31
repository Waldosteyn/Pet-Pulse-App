
import React from 'react';
import { AppScreen, Pet } from '../types';

interface DashboardProps {
  onNavigate: (screen: AppScreen) => void;
  pets: Pet[];
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, pets }) => {
  const menuItems = [
    { id: AppScreen.AMBER_ALERT, label: 'Amber Alert', icon: '🚨', color: 'bg-red-500' },
    { id: AppScreen.FIND_PET, label: 'Find My Pet', icon: '📍', color: 'bg-blue-500' },
    { id: AppScreen.REGISTER_USER, label: 'User Profile', icon: '👤', color: 'bg-teal-500' },
    { id: AppScreen.ADD_PET, label: 'Add Pets', icon: '🐾', color: 'bg-orange-500' },
    { id: AppScreen.PAIR_TRACKER, label: 'Pair Tracker', icon: '🔗', color: 'bg-indigo-500' },
    { id: AppScreen.VIRTUAL_FENCE, label: 'Virtual Fence', icon: '🌐', color: 'bg-green-500' },
  ];

  return (
    <div className="flex-1 flex flex-col p-6 space-y-6">
      <header className="flex justify-between items-center mt-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Pet Pulse</h2>
          <p className="text-gray-500 text-sm">Welcome back, Guardian</p>
        </div>
        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 font-bold">
          JD
        </div>
      </header>

      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-orange-800">Status Check</h3>
          <p className="text-sm text-orange-700">{pets.length} {pets.length === 1 ? 'Pet' : 'Pets'} are Safe</p>
        </div>
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-95 text-center space-y-3"
          >
            <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-${item.color.split('-')[1]}-200`}>
              {item.icon}
            </div>
            <span className="font-semibold text-gray-700 text-sm">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-4">
        <h3 className="font-bold text-gray-800 mb-3">Your Pets</h3>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {pets.map(pet => (
            <div key={pet.id} className="min-w-[140px] bg-white rounded-2xl p-3 border border-gray-100 shadow-sm flex flex-col items-center">
              <img src={`https://picsum.photos/seed/${pet.name}/80/80`} alt={pet.name} className="w-16 h-16 rounded-full mb-2 object-cover" />
              <span className="font-medium text-gray-800">{pet.name}</span>
              <span className="text-xs text-gray-400 capitalize">{pet.breed}</span>
            </div>
          ))}
          <button 
            onClick={() => onNavigate(AppScreen.ADD_PET)}
            className="min-w-[140px] bg-gray-100 rounded-2xl p-3 border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:text-orange-500 hover:border-orange-200 transition-colors"
          >
            <span className="text-2xl mb-1">+</span>
            <span className="text-xs font-medium uppercase tracking-wider">Add New</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

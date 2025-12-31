
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface RegisterUserProps {
  onBack: () => void;
  onSave: (user: UserProfile) => void;
  initialData: UserProfile | null;
}

const RegisterUser: React.FC<RegisterUserProps> = ({ onBack, onSave, initialData }) => {
  const [formData, setFormData] = useState<UserProfile>(initialData || {
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onBack();
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      <header className="p-4 border-b flex items-center">
        <button onClick={onBack} className="p-2 text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h2 className="text-xl font-bold ml-2">User Registration</h2>
      </header>

      <form onSubmit={handleSubmit} className="p-6 space-y-5 flex-1 overflow-y-auto">
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-600">Full Name</label>
          <input
            required
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
            placeholder="John Doe"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-600">Email Address</label>
          <input
            required
            type="email"
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
            placeholder="john@example.com"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-600">Contact Number</label>
          <input
            required
            type="tel"
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
            placeholder="+1 (555) 000-0000"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-600">Home Address</label>
          <textarea
            required
            rows={3}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
            placeholder="Street address, City, Zip"
            value={formData.address}
            onChange={e => setFormData({ ...formData, address: e.target.value })}
          />
        </div>

        <div className="pt-4">
          <button type="submit" className="w-full bg-orange-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-200 active:scale-[0.98] transition-all">
            Save Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterUser;

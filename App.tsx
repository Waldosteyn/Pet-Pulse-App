
import React, { useState, useEffect } from 'react';
import { AppScreen, UserProfile, Pet, Geofence } from './types';
import SplashScreen from './screens/SplashScreen';
import Dashboard from './screens/Dashboard';
import RegisterUser from './screens/RegisterUser';
import AddPet from './screens/AddPet';
import FindPet from './screens/FindPet';
import PairTracker from './screens/PairTracker';
import VirtualFence from './screens/VirtualFence';
import AmberAlertScreen from './screens/AmberAlert';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.SPLASH);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [pets, setPets] = useState<Pet[]>([
    {
      id: '1',
      name: 'Angus',
      type: 'Dog',
      breed: 'Border-Collie',
      color: 'black and white',
      description: 'splash of white above right eye',
      isLost: false,
      location: { lat: 34.0522, lng: -118.2437 }
    }
  ]);
  const [geofence, setGeofence] = useState<Geofence>({
    center: { lat: 34.0522, lng: -118.2437 },
    radius: 100
  });

  useEffect(() => {
    if (currentScreen === AppScreen.SPLASH) {
      const timer = setTimeout(() => {
        setCurrentScreen(AppScreen.DASHBOARD);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleNavigate = (screen: AppScreen) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case AppScreen.SPLASH:
        return <SplashScreen />;
      case AppScreen.DASHBOARD:
        return <Dashboard onNavigate={handleNavigate} pets={pets} />;
      case AppScreen.REGISTER_USER:
        return <RegisterUser onBack={() => handleNavigate(AppScreen.DASHBOARD)} onSave={setUser} initialData={user} />;
      case AppScreen.ADD_PET:
        return <AddPet onBack={() => handleNavigate(AppScreen.DASHBOARD)} onAdd={(pet) => setPets([...pets, pet])} />;
      case AppScreen.FIND_PET:
        return <FindPet onBack={() => handleNavigate(AppScreen.DASHBOARD)} pets={pets} />;
      case AppScreen.PAIR_TRACKER:
        return <PairTracker onBack={() => handleNavigate(AppScreen.DASHBOARD)} pets={pets} setPets={setPets} />;
      case AppScreen.VIRTUAL_FENCE:
        return <VirtualFence onBack={() => handleNavigate(AppScreen.DASHBOARD)} geofence={geofence} setGeofence={setGeofence} />;
      case AppScreen.AMBER_ALERT:
        return <AmberAlertScreen onBack={() => handleNavigate(AppScreen.DASHBOARD)} pets={pets} setPets={setPets} />;
      default:
        return <Dashboard onNavigate={handleNavigate} pets={pets} />;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 shadow-xl overflow-hidden relative flex flex-col">
      {renderScreen()}
    </div>
  );
};

export default App;


export enum AppScreen {
  SPLASH = 'SPLASH',
  DASHBOARD = 'DASHBOARD',
  REGISTER_USER = 'REGISTER_USER',
  ADD_PET = 'ADD_PET',
  FIND_PET = 'FIND_PET',
  PAIR_TRACKER = 'PAIR_TRACKER',
  VIRTUAL_FENCE = 'VIRTUAL_FENCE',
  AMBER_ALERT = 'AMBER_ALERT'
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Pet {
  id: string;
  name: string;
  type: string;
  breed: string;
  color: string;
  description: string;
  trackerId?: string;
  isLost: boolean;
  location?: {
    lat: number;
    lng: number;
  };
}

export interface Geofence {
  center: { lat: number; lng: number };
  radius: number; // in meters
}

export interface AmberAlert {
  id: string;
  petId: string;
  timestamp: number;
  reporterName: string;
  lastSeenLocation: { lat: number; lng: number };
}

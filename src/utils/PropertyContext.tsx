/**
 * ==============================================================================
 * PROPERTYCONTEXT.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Global state for currently selected property across the app.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. STATE MANAGEMENT:
 *    - Convert to Zustand store (recommended)
 *    - Or keep React Context
 *    - Persist to AsyncStorage
 * 
 * 2. ZUSTAND ALTERNATIVE:
 *    - Better performance than Context
 *    - Simpler API
 *    - Built-in persistence
 * 
 * ==============================================================================
 * ZUSTAND EXAMPLE
 * ==============================================================================
 * 
 * import create from 'zustand';
 * import { persist } from 'zustand/middleware';
 * 
 * export const usePropertyStore = create(
 *   persist(
 *     (set) => ({
 *       selectedProperty: null,
 *       setSelectedProperty: (property) => set({ selectedProperty: property }),
 *     }),
 *     { name: 'property-storage' }
 *   )
 * );
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Property selection works
 * - [ ] State persists
 * - [ ] All screens access property
 * - [ ] Switching properties updates UI
 * - [ ] iOS and Android compatible
 * 
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface PropertyData {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  propertyType: string;
  estimatedValue: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: string;
  hoiCarrier: string;
  policyStatus: string;
  protectionScore: number;
  coverage: string;
  lastInspection: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  recentActivities: Array<{
    title: string;
    time: string;
    iconType: 'success' | 'warning' | 'info';
  }>;
  upcomingEvents: Array<{
    title: string;
    date: string;
    time: string;
    type: string;
  }>;
}

// San Francisco Bay Area Property Profiles
export const PROPERTY_PROFILES: PropertyData[] = [
  {
    id: 'valencia-st',
    address: '1234 Valencia Street',
    city: 'San Francisco',
    state: 'CA',
    zip: '94110',
    propertyType: 'Single Family Home',
    estimatedValue: '$1.2M',
    bedrooms: 3,
    bathrooms: 2.5,
    squareFeet: '2,400',
    hoiCarrier: 'State Farm',
    policyStatus: 'Active',
    protectionScore: 92,
    coverage: '$1.5M',
    lastInspection: '2 weeks',
    coordinates: {
      latitude: 37.7599,
      longitude: -122.4214,
    },
    recentActivities: [
      {
        title: 'Document uploaded: Roof Inspection Report',
        time: '2 hours ago',
        iconType: 'success',
      },
      {
        title: 'Grant application submitted for storm damage',
        time: 'Yesterday',
        iconType: 'info',
      },
      {
        title: 'Weather alert: Storm approaching Bay Area',
        time: '2 days ago',
        iconType: 'warning',
      },
      {
        title: 'Policy premium payment processed',
        time: '3 days ago',
        iconType: 'success',
      },
    ],
    upcomingEvents: [
      {
        title: 'Policy Renewal Meeting',
        date: 'Nov 22',
        time: '2:00 PM',
        type: 'State Farm agent call',
      },
      {
        title: 'Roof Inspection',
        date: 'Nov 28',
        time: '10:00 AM',
        type: 'Scheduled maintenance',
      },
      {
        title: 'Fire Safety Assessment',
        date: 'Dec 5',
        time: '3:00 PM',
        type: 'Annual compliance check',
      },
    ],
  },
  {
    id: 'pacific-heights',
    address: '2890 Pacific Heights Manor',
    city: 'San Francisco',
    state: 'CA',
    zip: '94115',
    propertyType: 'Luxury Townhouse',
    estimatedValue: '$2.8M',
    bedrooms: 4,
    bathrooms: 3.5,
    squareFeet: '3,600',
    hoiCarrier: 'Chubb Insurance',
    policyStatus: 'Active',
    protectionScore: 98,
    coverage: '$3.2M',
    lastInspection: '1 week',
    coordinates: {
      latitude: 37.7919,
      longitude: -122.4364,
    },
    recentActivities: [
      {
        title: 'Annual property inspection completed',
        time: '1 week ago',
        iconType: 'success',
      },
      {
        title: 'Premium discount applied - security upgrade',
        time: '2 weeks ago',
        iconType: 'success',
      },
      {
        title: 'New coverage addon: Earthquake protection',
        time: '1 month ago',
        iconType: 'info',
      },
      {
        title: 'Smart home sensors installed',
        time: '1 month ago',
        iconType: 'success',
      },
    ],
    upcomingEvents: [
      {
        title: 'Security System Upgrade',
        date: 'Nov 25',
        time: '1:00 PM',
        type: 'ADT installation',
      },
      {
        title: 'Home Value Reassessment',
        date: 'Dec 5',
        time: '3:00 PM',
        type: 'Appraiser visit',
      },
      {
        title: 'Earthquake Retrofit Inspection',
        date: 'Dec 12',
        time: '10:00 AM',
        type: 'Structural engineer visit',
      },
    ],
  },
  {
    id: 'sausalito-waterfront',
    address: '456 Bridgeway Boulevard',
    city: 'Sausalito',
    state: 'CA',
    zip: '94965',
    propertyType: 'Waterfront Condo',
    estimatedValue: '$1.9M',
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: '1,850',
    hoiCarrier: 'PURE Insurance',
    policyStatus: 'Active',
    protectionScore: 88,
    coverage: '$2.1M',
    lastInspection: '3 weeks',
    coordinates: {
      latitude: 37.8591,
      longitude: -122.4852,
    },
    recentActivities: [
      {
        title: 'Flood insurance renewal completed',
        time: '5 days ago',
        iconType: 'success',
      },
      {
        title: 'Marina damage assessment requested',
        time: '1 week ago',
        iconType: 'warning',
      },
      {
        title: 'Wind mitigation certificate uploaded',
        time: '2 weeks ago',
        iconType: 'success',
      },
      {
        title: 'HOA master policy updated',
        time: '3 weeks ago',
        iconType: 'info',
      },
    ],
    upcomingEvents: [
      {
        title: 'Marine Survey',
        date: 'Nov 30',
        time: '9:00 AM',
        type: 'Waterfront assessment',
      },
      {
        title: 'HOA Meeting',
        date: 'Dec 8',
        time: '6:00 PM',
        type: 'Insurance discussion',
      },
      {
        title: 'Window Seal Inspection',
        date: 'Dec 15',
        time: '11:00 AM',
        type: 'Salt air damage prevention',
      },
    ],
  },
];

interface PropertyContextType {
  selectedProperty: PropertyData;
  setSelectedProperty: (property: PropertyData) => void;
  allProperties: PropertyData[];
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export function PropertyProvider({ children }: { children: ReactNode }) {
  const [selectedProperty, setSelectedProperty] = useState<PropertyData>(PROPERTY_PROFILES[0]);

  return (
    <PropertyContext.Provider 
      value={{ 
        selectedProperty, 
        setSelectedProperty,
        allProperties: PROPERTY_PROFILES,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperty() {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
}

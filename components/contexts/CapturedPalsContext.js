import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CapturedPalsContext = createContext();

export const useCapturedPals = () => {
  const context = useContext(CapturedPalsContext);
  if (!context) {
    throw new Error('useCapturedPals must be used within a CapturedPalsProvider');
  }
  return context;
};

export const CapturedPalsProvider = ({ children }) => {
  const STORAGE_KEY = 'capturedPals';
  const [capturedPals, setCapturedPals] = useState({}); // Initialize to an empty object

  // Load captured pals from AsyncStorage on component mount
  useEffect(() => {
    const loadCapturedPals = async () => {
      try {
        const storedPals = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedPals !== null) {
          setCapturedPals(JSON.parse(storedPals));
        }
      } catch (error) {
        console.error('Error loading captured pals:', error);
      }
    };

    loadCapturedPals();
  }, []);

  // Debounce AsyncStorage writes to improve performance
  useEffect(() => {
    const saveCapturedPals = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(capturedPals));
      } catch (error) {
        console.error('Error saving captured pals:', error);
      }
    };

    const handler = setTimeout(saveCapturedPals, 500); // Debounce time of 500ms
    return () => clearTimeout(handler);
  }, [capturedPals]);

  const toggleCapture = (palKey) => {
    setCapturedPals(prevPals => {
      const updatedPals = { ...prevPals };
      if (updatedPals.hasOwnProperty(palKey)) {
        delete updatedPals[palKey];
      } else {
        updatedPals[palKey] = 1;
      }
      return updatedPals;
    });
  };

  const setCaptureCount = (palKey, count) => {
    setCapturedPals(prevPals => {
      if (count > 0) {
        return {
          ...prevPals,
          [palKey]: count,
        };
      } else {
        const { [palKey]: _, ...rest } = prevPals;
        return rest;
      }
    });
  };

  const value = useMemo(() => ({
    capturedPals,
    toggleCapture,
    setCaptureCount,
  }), [capturedPals, toggleCapture, setCaptureCount]);

  return (
    <CapturedPalsContext.Provider value={value}>
      {children}
    </CapturedPalsContext.Provider>
  );
};

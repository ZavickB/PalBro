import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CapturedPalsContext = createContext();

export const useCapturedPals = () => {
  const { capturedPals, capturePal, releasePal, refreshKey } = useContext(CapturedPalsContext);

  const toggleCapture = (palKey) => {
    if (capturedPals.includes(palKey)) {
      releasePal(palKey);
    } else {
      capturePal(palKey);
    }
  };

  return {
    capturedPals,
    toggleCapture,
    refreshKey, // Add refreshKey to get the current key value
  };
};

export const CapturedPalsProvider = ({ children }) => {
  const [capturedPals, setCapturedPals] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0); // Initialize with a key of 0

  const STORAGE_KEY = 'capturedPals'; // Key for AsyncStorage

  // Load captured pals from local storage when the component mounts
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

  // Save captured pals to local storage whenever the capturedPals state changes
  useEffect(() => {
    const saveCapturedPals = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(capturedPals));
      } catch (error) {
        console.error('Error saving captured pals:', error);
      }
    };

    saveCapturedPals();
  }, [capturedPals]);

  const capturePal = (palKey) => {
    setCapturedPals((prevCapturedPals) => [...prevCapturedPals, palKey]);
    setRefreshKey((prevKey) => prevKey + 1); // Update the key to trigger a re-render
  };

  const releasePal = (palKey) => {
    setCapturedPals((prevCapturedPals) =>
      prevCapturedPals.filter((key) => key !== palKey)
    );
    setRefreshKey((prevKey) => prevKey + 1); // Update the key to trigger a re-render
  };

  return (
    <CapturedPalsContext.Provider
      value={{
        capturedPals,
        capturePal,
        releasePal,
        refreshKey, // Provide the key value to the context
      }}
    >
      {children}
    </CapturedPalsContext.Provider>
  );
};

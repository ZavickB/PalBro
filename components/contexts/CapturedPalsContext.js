import React, { createContext, useContext, useState, useEffect } from 'react';
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
  const [capturedPals, setCapturedPals] = useState({});
  const [refreshKey, setRefreshKey] = useState(0);

  const STORAGE_KEY = 'capturedPals';

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

  const toggleCapture = (palKey) => {
    if (capturedPals.hasOwnProperty(palKey)) {
      const updatedPals = { ...capturedPals };
      delete updatedPals[palKey];
      setCapturedPals(updatedPals);
    } else {
      setCapturedPals(prevPals => ({ ...prevPals, [palKey]: 1 }));
    }
    setRefreshKey(prevKey => prevKey + 1);
  };

  const increaseCapture = (palKey) => {
    setCapturedPals(prevPals => ({
      ...prevPals,
      [palKey]: (prevPals[palKey] || 0) + 1
    }));
    setRefreshKey(prevKey => prevKey + 1);
  };

  const decreaseCapture = (palKey) => {
    if (capturedPals[palKey] > 1) {
      setCapturedPals(prevPals => ({
        ...prevPals,
        [palKey]: prevPals[palKey] - 1
      }));
    } else {
      // Effectively releases the pal if its count goes to 1 and then decremented
      const updatedPals = { ...capturedPals };
      delete updatedPals[palKey];
      setCapturedPals(updatedPals);
    }
    setRefreshKey(prevKey => prevKey + 1);
  };

 // Define setCaptureCount function
 const setCaptureCount = (palKey, count) => {
  if (count > 0) {
    setCapturedPals(prevPals => ({
      ...prevPals,
      [palKey]: count,
    }));
  } else {
    // Remove the palKey if count is 0 or less
    const { [palKey]: _, ...rest } = capturedPals;
    setCapturedPals(rest);
  }
};

return (
  <CapturedPalsContext.Provider
    value={{
      capturedPals,
      toggleCapture,
      increaseCapture,
      decreaseCapture,
      setCaptureCount, // Include setCaptureCount in the context value
    }}
  >
    {children}
  </CapturedPalsContext.Provider>
);

};

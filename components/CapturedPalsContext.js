import React, { createContext, useContext, useState } from 'react';

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

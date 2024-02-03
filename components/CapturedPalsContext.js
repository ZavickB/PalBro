import React, { createContext, useContext, useState } from 'react';

const CapturedPalsContext = createContext();

export const CapturedPalsProvider = ({ children }) => {
  const [capturedPals, setCapturedPals] = useState([]);

  const updateCapturedPals = (newCapturedPals) => {
    setCapturedPals(newCapturedPals);
  };

  return (
    <CapturedPalsContext.Provider value={{ capturedPals, updateCapturedPals }}>
      {children}
    </CapturedPalsContext.Provider>
  );
};

export const useCapturedPals = () => {
  return useContext(CapturedPalsContext);
};

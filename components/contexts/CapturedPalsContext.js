import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGame } from './GameContext'; // Import useGame from GameContext

const CapturedPalsContext = createContext();

export const useCapturedPals = () => {
    const context = useContext(CapturedPalsContext);
    if (!context) {
        throw new Error('useCapturedPals must be used within a CapturedPalsProvider');
    }
    return context;
};

export const CapturedPalsProvider = ({ children }) => {
    const { games, currentGame, setGames } = useGame(); // Assuming useGame provides access to games and a method to update it

    // This assumes games is always an object; ensure this is the case in your GameProvider
    const capturedPals = games[currentGame]?.capturedPals || {};

    const setCapturedPalsForCurrentGame = (newCapturedPals) => {
        const updatedGames = {
            ...games,
            [currentGame]: {
                ...games[currentGame],
                capturedPals: newCapturedPals,
            },
        };
        setGames(updatedGames); // Update the games state in GameContext

        // Also update AsyncStorage
        AsyncStorage.setItem('games', JSON.stringify(updatedGames)).catch(error => console.error('Error updating captured pals in AsyncStorage:', error));
    };

    const setCaptureCount = (palKey, count) => {
        const newCapturedPals = {
            ...capturedPals,
            [palKey]: count,
        };

        setCapturedPalsForCurrentGame(newCapturedPals);
    };

    const value = {
        capturedPals,
        setCaptureCount,
    };

    return <CapturedPalsContext.Provider value={value}>{children}</CapturedPalsContext.Provider>;
};
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

const STORAGE_KEY = 'games';
const CURRENT_GAME_KEY = 'currentGame'; // Key to store the current game

export const GameProvider = ({ children }) => {
  const [games, setGamesState] = useState({});
  const [currentGame, setCurrentGame] = useState('');

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Load games data
        const storedGames = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedGames !== null) {
          setGamesState(JSON.parse(storedGames));
        }

        // Load current game
        const storedCurrentGame = await AsyncStorage.getItem(CURRENT_GAME_KEY);
        if (storedCurrentGame !== null) {
          setCurrentGame(storedCurrentGame);
        }
      } catch (error) {
        console.error('Error loading initial data:', error);
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    const saveCurrentGame = async () => {
      try {
        await AsyncStorage.setItem(CURRENT_GAME_KEY, currentGame);
      } catch (error) {
        console.error('Error saving the current game:', error);
      }
    };

    if (currentGame) {
      saveCurrentGame();
    }
  }, [currentGame]);

  const setGames = async (newGames) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newGames));
      setGamesState(newGames); // Update the state
    } catch (error) {
      console.error('Error saving games:', error);
    }
  };

  const addGame = (gameName) => {
    if (!games[gameName]) {
      const newGames = {
        ...games,
        [gameName]: {}, // Initialize the new game with an empty state
      };
      setGames(newGames);
      setCurrentGame(gameName); // Set the newly added game as the current game
    }
  };

  const removeGame = (gameName) => {
    if (games[gameName]) {
      const updatedGames = { ...games };
      delete updatedGames[gameName]; // Remove the game from the state
      setGames(updatedGames); // Update both state and AsyncStorage
    }
  };

  return (
    <GameContext.Provider value={{ games, currentGame, setCurrentGame, addGame, removeGame, setGames }}>
      {children}
    </GameContext.Provider>
  );
};

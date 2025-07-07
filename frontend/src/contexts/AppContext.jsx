import React, { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const AppContext = createContext(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [goals, setGoals] = useState(null);
  const [foodLog, setFoodLog] = useState(null);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [socket, setSocket] = useState(null);

useEffect(() => {
  if (user) {
    const newSocket = io(import.meta.env.VITE_BACKEND_URL);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('✅ Connected to WebSocket:', newSocket.id);
    });

    newSocket.on('reminderAlert', (data) => {
      alert(data.message); // Works now
      // Optionally use a toast: toast.info(data.message);
    });

    return () => newSocket.disconnect();
  }
}, [user]);


  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        goals,
        setGoals,
        foodLog,
        setFoodLog,
        isOnboarded,
        setIsOnboarded,
        socket,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

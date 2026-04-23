import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      const saved = await AsyncStorage.getItem('user');
      if (saved) setUser(JSON.parse(saved));
      setLoading(false);
    };
    loadSession();
  }, []);

  const login = async (email, password) => {
    if (!email.endsWith('@chmsu.edu.ph')) throw new Error("Only @chmsu.edu.ph emails allowed");
    if (password.length < 6) throw new Error("Password must be at least 6 characters");

    await new Promise(r => setTimeout(r, 1200));

    const demoUser = {
      id: "1",
      name: "April Dawn C. Enemenzo",
      email: email.toLowerCase(),
      campus: "CHMSU Bacolod",
      karma: 245,
    };
    setUser(demoUser);
    await AsyncStorage.setItem('user', JSON.stringify(demoUser));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  const deductKarma = async (amount) => {
    if (!user) return;
    const newKarma = Math.max(0, user.karma - amount);
    const updatedUser = { ...user, karma: newKarma };
    setUser(updatedUser);
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, deductKarma, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
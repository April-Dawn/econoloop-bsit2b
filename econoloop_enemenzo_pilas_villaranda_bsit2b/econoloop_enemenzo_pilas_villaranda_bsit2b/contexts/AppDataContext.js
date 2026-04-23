import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppDataContext = createContext();

export const AppDataProvider = ({ children }) => {
  const [listings, setListings] = useState([]);
  const [karmaPoints, setKarmaPoints] = useState(0);           // Start at 0 as you want
  const [monthlyClaims, setMonthlyClaims] = useState(0);
  const [chats, setChats] = useState({});

  const maxMonthlyClaims = karmaPoints <= 50 ? 1 : karmaPoints <= 100 ? 2 : 3;

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = await AsyncStorage.getItem('listings');
        if (saved) setListings(JSON.parse(saved));

        const savedKarma = await AsyncStorage.getItem('karmaPoints');
        if (savedKarma) setKarmaPoints(parseInt(savedKarma));

        const savedClaims = await AsyncStorage.getItem('monthlyClaims');
        if (savedClaims) setMonthlyClaims(parseInt(savedClaims));
      } catch (e) {}
    };
    loadData();
  }, []);

  // Save karma & claims
  useEffect(() => { AsyncStorage.setItem('karmaPoints', karmaPoints.toString()); }, [karmaPoints]);
  useEffect(() => { AsyncStorage.setItem('monthlyClaims', monthlyClaims.toString()); }, [monthlyClaims]);

  const addListing = async (item) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
      postedBy: 'You',
      karma: parseInt(item.karma) || 30,
      karmaCost: parseInt(item.karma) || 30,
      type: item.type || 'offer',
    };
    const updated = [newItem, ...listings];
    setListings(updated);
    await AsyncStorage.setItem('listings', JSON.stringify(updated));
  };

  const claimItem = async (id) => {
    const item = listings.find(l => l.id === id);
    if (!item) throw new Error('Item not found');
    if (item.postedBy === 'You') throw new Error('You cannot claim your own item');

    const itemKarma = item.karmaCost || item.karma || 0;

    if (karmaPoints < itemKarma) {
      throw new Error(`Not enough karma. Need ${itemKarma}, you have ${karmaPoints}`);
    }
    if (monthlyClaims >= maxMonthlyClaims) {
      throw new Error(`Monthly limit reached (${maxMonthlyClaims} claims).`);
    }

    // Update listing
    const updatedListings = listings.map(l =>
      l.id === id ? { ...l, claimed: true, claimedBy: 'You' } : l
    );
    setListings(updatedListings);
    await AsyncStorage.setItem('listings', JSON.stringify(updatedListings));

    // Deduct from claimer
    setKarmaPoints(prev => Math.max(0, prev - itemKarma));
    setMonthlyClaims(prev => prev + 1);

    // Give 20% reward to original poster
    if (item.postedBy === 'You') {
      const reward = Math.floor(itemKarma * 0.2);
      setKarmaPoints(prev => prev + reward);
    }

    const transactionId = `chat-${id}`;
    if (!chats[transactionId]) {
      setChats(prev => ({
        ...prev,
        [transactionId]: [{ id: '1', text: "Hi! I've claimed your item. When can we meet?", sender: 'You', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]
      }));
    }

    return { transactionId };
  };

  return (
    <AppDataContext.Provider value={{
      listings,
      addListing,
      claimItem,
      karmaPoints,
      monthlyClaims,
      maxMonthlyClaims,
      chats,
    }}>
      {children}
    </AppDataContext.Provider>
  );
};

export { AppDataContext };
export const useAppData = () => useContext(AppDataContext);
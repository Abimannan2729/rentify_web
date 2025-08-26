
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Item, Rental } from '../types';
import { MOCK_USERS, MOCK_ITEMS, MOCK_RENTALS } from '../constants';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  items: Item[];
  rentals: Rental[];
  login: (email: string) => void;
  logout: () => void;
  addItem: (item: Omit<Item, 'id' | 'ownerId'>) => void;
  addRental: (rental: Omit<Rental, 'id'>) => void;
  updateRentalStatus: (rentalId: string, status: Rental['status']) => void;
  getItemById: (id: string) => Item | undefined;
  getUserById: (id: string) => User | undefined;
  getRentalsByRenter: (renterId: string) => Rental[];
  getRentalsByOwner: (ownerId: string) => Rental[];
  getItemsByOwner: (ownerId: string) => Item[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('rentify-user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      return MOCK_USERS.find(u => u.id === user.id) || null;
    }
    return null;
  });

  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [items, setItems] = useState<Item[]>(MOCK_ITEMS);
  const [rentals, setRentals] = useState<Rental[]>(MOCK_RENTALS);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('rentify-user', JSON.stringify({ id: currentUser.id }));
    } else {
      localStorage.removeItem('rentify-user');
    }
  }, [currentUser]);

  const login = (email: string) => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
    } else {
      alert('User not found. Try "alice@example.com" or "bob@example.com".');
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addItem = (itemData: Omit<Item, 'id' | 'ownerId'>) => {
    if (!currentUser) return;
    const newItem: Item = {
      ...itemData,
      id: `item${Date.now()}`,
      ownerId: currentUser.id,
    };
    setItems(prev => [...prev, newItem]);
  };

  const addRental = (rentalData: Omit<Rental, 'id'>) => {
     const newRental: Rental = {
      ...rentalData,
      id: `rental${Date.now()}`,
    };
    setRentals(prev => [...prev, newRental]);
  };

  const updateRentalStatus = (rentalId: string, status: Rental['status']) => {
    setRentals(prev => prev.map(r => r.id === rentalId ? {...r, status} : r));
  };
  
  const getItemById = (id: string) => items.find(item => item.id === id);
  const getUserById = (id: string) => users.find(user => user.id === id);
  const getRentalsByRenter = (renterId: string) => rentals.filter(r => r.renterId === renterId);
  const getRentalsByOwner = (ownerId: string) => rentals.filter(r => r.ownerId === ownerId);
  const getItemsByOwner = (ownerId: string) => items.filter(i => i.ownerId === ownerId);

  return (
    <AppContext.Provider value={{ currentUser, users, items, rentals, login, logout, addItem, addRental, updateRentalStatus, getItemById, getUserById, getRentalsByRenter, getRentalsByOwner, getItemsByOwner }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

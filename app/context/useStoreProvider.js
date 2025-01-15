'use client';
import React, { useState, useEffect } from 'react';
import { StoreContext } from './useStoreContext';

export const StoreProvider = ({ children }) => {
  const [store, setStore] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedStore') || '';
    }
    return '';
  });

  // Update localStorage whenever the store state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedStore', store);
    }
  }, [store]);

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      {children}
    </StoreContext.Provider>
  );
};
'use client';
import React, { useState } from 'react';
import { NavLocatorContext } from './useNavLocatorContext';

export const NavLocatorProvider = ({ children }) => {
  const [isNavLocatorActive, setIsNavLocatorActive] = useState(false);

  return (
    <NavLocatorContext.Provider value={{ isNavLocatorActive, setIsNavLocatorActive }}>
      {children}
    </NavLocatorContext.Provider>
  );
};
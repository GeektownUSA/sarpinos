'use client';
import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../context/useStoreContext';
import { NavLocatorContext } from '../context/useNavLocatorContext';

const ContactBtn = () => {
  const { store } = useContext(StoreContext);
  const { isNavLocatorActive, setIsNavLocatorActive } = useContext(NavLocatorContext);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or return a loading spinner, placeholder, etc.
  }

  if (!store || store === 'null') {
    return (
      <a href="/pizza-delivery" onClick={(e) => { e.preventDefault(); setIsNavLocatorActive(!isNavLocatorActive); }} className="btn primary-btn glow"><span>Contact Your local Sarpino&apos;s</span></a>
    );
  } else {
    return (
      <a href={`https://${store}.gosarpinos.com/ordering/menu/Catering%20Pizzas`} className="btn primary-btn glow"><span>Contact Your local Sarpino&apos;s</span></a>
    );
  }
}

export default ContactBtn;
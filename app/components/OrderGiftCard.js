'use client';
import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../context/useStoreContext';
import { NavLocatorContext } from '../context/useNavLocatorContext';

const OrderGiftCard = () => {
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
      <a href="/pizza-delivery" onClick={(e) => { e.preventDefault(); setIsNavLocatorActive(!isNavLocatorActive); }} className="nav-link">
        Gift Cards
      </a>
    );
  } else {
    return (
      <a href={`https://${store}.gosarpinos.com/giftcards/actions`} className="nav-link">
        Gift Cards
      </a>
    );
  }
}
export default OrderGiftCard;
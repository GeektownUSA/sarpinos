'use client';
import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../context/useStoreContext';
import { NavLocatorContext } from '../context/useNavLocatorContext';
import Link from 'next/link';

const FeedbackBtn = () => {
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
      <Link href="/pizza-delivery" onClick={(e) => { e.preventDefault(); setIsNavLocatorActive(!isNavLocatorActive); }}>
        Rate Us
      </Link>
    );
  } else {
    return (
      <Link href={`/pizza-delivery/sarpinos-${store.toLowerCase()}/feedback`}>
        Rate Us
      </Link>
    );
  }
}
export default FeedbackBtn;
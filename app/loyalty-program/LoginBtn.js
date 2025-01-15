'use client';
import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../context/useStoreContext';
import { NavLocatorContext } from '../context/useNavLocatorContext';

const LoginBtn = () => {
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
      <button onClick={() => setIsNavLocatorActive(!isNavLocatorActive)} className="btn primary-btn"><span>Login</span></button>
    );
  } else {
    return (
      <a href={`https://${store}.gosarpinos.com/ordering/login?target=%2Floyalty`} className="btn primary-btn"><span>Login</span></a>
    );
  }
}
export default LoginBtn;
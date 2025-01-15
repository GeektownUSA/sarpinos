'use client';
import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../context/useStoreContext';
import { NavLocatorContext } from '../context/useNavLocatorContext';

const SignupBtn = () => {
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
      <button onClick={() => setIsNavLocatorActive(!isNavLocatorActive)} className="btn secondary-btn" > <span>Sign Up</span></button>
    );
  } else {
    return (
      <a href={`https://${store}.gosarpinos.com/ordering/register?target=loyalty`} className="btn secondary-btn"><span>Sign Up</span></a>
    );
  }
}
export default SignupBtn;
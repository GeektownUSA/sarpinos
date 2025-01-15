'use client';

import { useState, useEffect } from 'react';
import OrderBtn from './OrderBtn';

const MobileOrderBtn = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 0 && window.scrollY < document.body.offsetHeight - window.innerHeight) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll, { passive: true });
  }, [isScrolled]);

  return isScrolled && <OrderBtn theme="mobile" />;
}

export default MobileOrderBtn;
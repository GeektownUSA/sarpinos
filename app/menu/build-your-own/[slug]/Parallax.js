'use client';
import Image from 'next/image';
import styles from './Parallax.module.css';

import { useEffect } from 'react';

const Parallax = () => {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1150) {
        import('rellax').then(({ default: Rellax }) => {
          new Rellax('.rellax1');
          new Rellax('.rellax2');
          new Rellax('.rellax3');
          new Rellax('.rellax4');
          new Rellax('.rellax5');
          new Rellax('.rellax6');
          new Rellax('.rellax7');
        });
      }
    };

    // Call the function once on component mount
    handleResize();

    // Add the event listener for window resize
    window.addEventListener('resize', handleResize, { passive: true });

    // Cleanup function to remove the event listener when the component unmounts
    return () => window.removeEventListener('resize', handleResize, { passive: true });
  }, []);

  return (
    <div className={styles.rellaxDiv}>
      <div className="rellax1" data-rellax-speed="-7">
        <Image src={'/onion-spiral.webp'} className={styles.image1} width={197} height={230} alt="onion spiral" />
      </div>
      <div className="rellax2" data-rellax-speed="-6">
        <Image src={'/basil-leaf-3.webp'} width={205} height={113} className={styles.image2} alt="basil leaf" />
      </div>
      <div className="rellax3" data-rellax-speed="-5">
        <Image src={'/tomatoes-cut.webp'} width={215} height={125} className={styles.image3} alt="fresh cut cherry tomatoes" />
      </div>
      <div className="rellax4" data-rellax-speed="-7">
        <Image src={'/mushroom-pair.webp'} width={204} height={168} className={styles.image4} alt="pair of mini portobella muchrooms" />
      </div>
      <div className="rellax5" data-rellax-speed="-6">
        <Image src={'/pepperoni-pair.webp'} width={204} height={134} className={styles.image5} alt="basil leaf" />
      </div>
      <div className="rellax6" data-rellax-speed="-4">
        <Image src={'/olive-bunch.webp'} width={392} height={363} className={styles.image6} alt="basil leaf" />
      </div>
      <div className="rellax7" data-rellax-speed="-3">
        <Image src={'/basil-leaf-2.webp'} width={165} height={165} className={styles.image7} alt="basil leaf" />
      </div>
    </div >
  );
}

export default Parallax;
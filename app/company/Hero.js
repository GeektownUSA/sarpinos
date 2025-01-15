'use client';
import Image from 'next/image';
import OrderBtn from '@/app/components/OrderBtn';
import styles from './Hero.module.css';

import { useEffect } from 'react';

const Hero = ({ data, heroImage }) => {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        import('rellax').then(({ default: Rellax }) => {
          new Rellax('.rellax0');
          new Rellax('.rellax1');
          new Rellax('.rellax2');
          new Rellax('.rellax3');
          new Rellax('.rellax4');
          new Rellax('.rellax5');
          new Rellax('.rellax6');
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
    <>
      <section className={`viewport`}>
        <div className={`full-page-container ${styles.container}`}>
          <div className="responsive-column-container">
            <div className={styles.animation}>
              <div className={`fade-in-slow rellax0 ${styles.shadow}`} data-rellax-speed="1"></div>
              <Image
                src="/company-pizza-hero.webp"
                alt="Pizza with tomato, spinach and cheese"
                width={750}
                height={641}
                className={styles.pizzaImg}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className={`rellax1 ${styles.rellaxDiv}`} data-rellax-speed="-1">
                <div className={styles.basilLeaf1}>
                  <Image src={'/basil-leaf-1.webp'} width={220} height={220} className={styles.fallIn1} alt="basil leaf" />
                </div>
              </div>
              <div className={`rellax2 ${styles.rellaxDiv}`} data-rellax-speed="-2">
                <div className={styles.basilLeaf2}>
                  <Image src={'/basil-leaf-2.webp'} width={300} height={300} className={styles.fallIn2} alt="basil leaf" />
                </div>
              </div>
              <div className={`rellax3 ${styles.rellaxDiv}`} data-rellax-speed="-5">
                <div className={styles.basilLeaf3}>
                  <Image src={'/basil-leaf-3.webp'} width={300} height={300} className={styles.fallIn3} alt="basil leaf" />
                </div>
              </div>
              <div className={`rellax4 ${styles.rellaxDiv}`} data-rellax-speed="-3">
                <div className={styles.basilLeaf4}>
                  <Image src={'/basil-leaf-4.webp'} width={300} height={300} className={styles.fallIn4} alt="basil leaf" />
                </div>
              </div>
              <div className={`rellax5 ${styles.rellaxDiv}`} data-rellax-speed="-4">
                <div className={styles.basilLeaf5}>
                  <Image src={'/basil-leaf-1.webp'} width={300} height={300} className={styles.fallIn5} alt="basil leaf" />
                </div>
              </div>
              <div className={`rellax6 ${styles.rellaxDiv}`} data-rellax-speed="-3">
                <div className={styles.basilLeaf6}>
                  <Image src={'/basil-leaf-2.webp'} width={300} height={300} className={styles.fallIn6} alt="basil leaf" />
                </div>
              </div>
            </div>
            <div className={`${styles.content}`}>
              <div dangerouslySetInnerHTML={{ __html: data.content.rendered || '' }} />
              <div className={styles.innerHeroText}>
                <OrderBtn />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
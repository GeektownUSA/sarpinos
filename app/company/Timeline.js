'use client';
import Image from 'next/image';
import styles from './Timeline.module.css';

import { useEffect } from 'react';

const Timeline = ({ data }) => {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        import('rellax').then(({ default: Rellax }) => {
          new Rellax('.rellax7');
          new Rellax('.rellax8');
          new Rellax('.rellax9');
          new Rellax('.rellax10');
          new Rellax('.rellax11');
          new Rellax('.rellax12');
          new Rellax('.rellax13');
          new Rellax('.rellax14');
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

  const timeline = data.acf?.timeline || [];

  return (
    <section className={`viewport`}>
      <div className={`full-page-container ${styles.container}`}>
		<div className="responsive-single-column-container">
			<h2 dangerouslySetInnerHTML={{ __html: data.acf.history_headline }} />
		</div>	
        <div className="responsive-twothirds-column-container">
          {timeline && <div className={`${styles.content}`}>
            <div className={styles.innerHeroText}>
              {timeline.map((item, index) => (
                <div key={index} className={styles.timeline}>
                  <h4 className={styles.timelineYear}><strong>{item.year}</strong></h4>
                  <div className={styles.timelineInfo}>
                    <h4><strong>{item.title}</strong></h4>
					<div dangerouslySetInnerHTML={{ __html: item.description }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>}
          <div className={styles.animation}>
            <div className={`fade-in rellax13 ${styles.shadow}`} data-rellax-speed="1"></div>
            <Image src="/pepperoniPizza.webp"
              width={750}
              height={581}
              alt="pepperoni pizza"
              className={styles.pizzaImg}
            />
            <div className={`rellax7 ${styles.rellaxDiv}`} data-rellax-speed="-1">
              <Image src={'/pepperoni-1.webp'} width={220} height={220} className={styles.pepperoni1} alt="pepperoni" />
            </div>
            <div className={`rellax8 ${styles.rellaxDiv}`} data-rellax-speed="-2">
              <Image src={'/pepperoni-2.webp'} width={300} height={300} className={styles.pepperoni2} alt="pepperoni" />
            </div>
            <div className={`rellax9 ${styles.rellaxDiv}`} data-rellax-speed="-1">
              <Image src={'/pepperoni-3.webp'} width={300} height={300} className={styles.pepperoni3} alt="pepperoni" />
            </div>
            <div className={`rellax10 ${styles.rellaxDiv}`} data-rellax-speed="-3">
              <Image src={'/pepperoni-4.webp'} width={300} height={300} className={styles.pepperoni4} alt="pepperoni" />
            </div>
            <div className={`rellax11 ${styles.rellaxDiv}`} data-rellax-speed="-4">
              <Image src={'/pepperoni-5.webp'} width={300} height={300} className={styles.pepperoni5} alt="pepperoni" />
            </div>
            <div className={`rellax12 ${styles.rellaxDiv}`} data-rellax-speed="-2">
              <Image src={'/pepperoni-6.webp'} width={300} height={300} className={styles.pepperoni6} alt="pepperoni" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Timeline;
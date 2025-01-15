'use client';
import { useContext } from 'react';
import { ThemeContext } from '../context/useThemeProvider';

import Image from 'next/image';
import OrderBtn from '@/app/components/OrderBtn';
import styles from './Hero.module.css';
const Hero = ({ data }) => {
  const theme = useContext(ThemeContext);
  const isDay = theme === 'day';
  return (
    <>
      <section className={styles.homepageHero}>
        <div className={styles.heroContainer}>
          <div className={styles.pizzaAnimation}>
            <div className={styles.pizzaShadow}></div>
            <Image src={"/olives.svg"} width={100} height={100} alt="olives" className={styles.olives} />
            <Image src={"/tomatoes-cut.svg"} width={150} height={150} alt="cut tomatoes" className={styles.tomatosCut} />
            <Image src={'/garlic-bulb.svg'} width={100} height={100} alt="garlic" className={styles.garlicBulb} />
            <Image src={'/pizza-hero.webp'} width={600} height={600} alt="pizza" className={styles.pizza}
              priority="true" />
            <Image src={'/onions-sliced.webp'} width={180} height={180} alt="sliced onions" className={styles.onions} />
            <Image src={'/heart-green-outline.svg'} width={60} height={60} alt="green outline heart" className={styles.heartGreenOutline1} />
            <Image src={'/peppercorns-two.svg'} width={60} height={60} alt="peppercorns" className={styles.peppercorns} />
            <Image src={'/heart-tan-outline.svg'} width={60} height={60} alt="tan heart outline" className={styles.heartTanOutline} />
            <Image src={'/tomatoes-cut.webp'} width={100} height={100} alt="cut tomatoes" className={styles.tomatoesFreshCut} />
            <Image src={'/heart-green-fill.svg'} width={60} height={60} alt="green fill heart" className={styles.heartGreenFill} />
            <Image src={'/basil-leaf-1.webp'} width={100} height={100} alt="basil leaf" className={styles.basilLeaf1} />
            <Image src={'/heart-green-outline.svg'} width={100} height={100} alt="green outline heart" className={styles.heartGreenOutline2} />
            <Image src={'/tomato-whole-and-slice.svg'} width={200} height={200} alt="sliced tomatoes" className={styles.tomatoesWholeSliced} />
            <Image src={'/basil-leaf-2.webp'} width={100} height={100} alt="basil leaf" className={styles.basilLeaf2} />
            <Image src={'/basil-leaf-3.webp'} width={100} height={100} alt="basil leaf" className={styles.basilLeaf3} />
          </div>
          <div className={styles.content}>
            {isDay ?
              <div dangerouslySetInnerHTML={{ __html: data?.content.rendered || '' }} />
              :
              <div dangerouslySetInnerHTML={{ __html: data?.acf?.hero_nighttime_content || '' }} />
            }

            <div className="btn-slide" style={{ paddingTop: '1rem' }}>
              <OrderBtn btnColor={`${isDay ? 'dark' : ''}`} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
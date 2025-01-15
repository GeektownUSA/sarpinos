'use client';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/useThemeProvider';

import Image from 'next/image';
import Link from 'next/link';
import styles from './InstagramFeed.module.css';

const InstagramFeed = ({ feed }) => {
  const theme = useContext(ThemeContext);
  const isDay = theme === 'day';

  const [randomImages, setRandomImages] = useState([]);

  useEffect(() => {
    function getRandomImages(images) {
      const shuffled = images.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3);
    }

    setRandomImages(getRandomImages(feed));
  }, [feed]);
  return (
    <>
      <div className={styles.heartAnimation}>
        <Image src={'/heart-white-fill.svg'} width={50} height={50} className={styles.whiteFillHeart} alt={"white fill heart"} />
        <Image src={isDay ? '/heart-red-fill.svg' : '/heart-green-fill.svg'} width={60} height={60} className={styles.greenFillHeart} alt="green fill heart" />
        <Image src={isDay ? '/heart-red-outline.svg' : '/heart-green-outline.svg'} width={40} height={40} className={styles.greenOutlineHeart} alt="green outline heart" />
      </div>
      <section className={`viewport text-align-center ${isDay === false ? 'red-color' : 'lightgreen-color'}`} style={{ paddingTop: 0 }}>
        <div className="page-container text-align-center">
          <h2 style={{ padding: '1rem 0 0' }}>Sarpino&apos;s On Social</h2>
          <p style={{ maxWidth: '347px', margin: '0 auto' }}>Pizza pics, cheesy captions and saucy posts. Follow us on Instagram and Facebook.</p>

          <div className={styles.socialFeed} style={{ margin: '3rem 0 4rem' }}>
            {randomImages.map((item, index) => {
              return (
                <Link href="https://www.instagram.com/sarpinos_pizzeria/"
                  key={index} className={styles.imageContainer}>
                  <Image
                    src={item.image.sourceUrl}
                    alt={item.image.altText}
                    className={styles.image}
                    width={100}
                    height={100}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className={styles.overlay}>
                    <span>FOLLOW US &nbsp;&nbsp;<Image
                      src={"/icon-instagram.svg"}
                      width={30}
                      height={30}
                      alt="Instagram"
                    /></span>
                    <span className={styles.handle}>@sarpinos_pizzeria</span>
                  </div>
                </Link>
              );
            }
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default InstagramFeed;
'use client';
import { useContext } from 'react';
import { ThemeContext } from '../context/useThemeProvider';

import Image from 'next/image';
import Link from 'next/link';
import styles from './Catering.module.css';

const Catering = ({ data, cateringImage }) => {
  const theme = useContext(ThemeContext);
  const isDay = theme === 'day';

  return (
    <>
      <div className={styles.cateringAnimation}>
        <Image src={'/heart-tan-outline.svg'} width={60} height={60} className={styles.tanOutlineHeart} alt={"tan outline heart"} />
        <Image src={'/heart-green-fill.svg'} width={60} height={60} className={styles.greenFillHeart} alt="green fill heart" />
        <Image src={'/heart-green-outline.svg'} width={60} height={60} className={styles.greenOutlineHeart} alt="green outline heart" />
      </div>
      <section className={`viewport catering ${isDay ? 'green-color' : 'darkred-color'}`}>
        <div className="page-container cream-color">
          <div className="responsive-twothirds-column-container">
            <div className="image-fill-container">
              <Image
                src={cateringImage.sourceUrl}
                alt={cateringImage.altText}
                fill={true}
                className="hover-image"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className={`flex-align-center ${styles.content}`}>
              <h2>{data.acf.catering_headline}</h2>
              <p>{data.acf.catering_paragraph}</p>
              <Link href="/catering" className="btn primary-btn"><span>Catering Info</span></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Catering;
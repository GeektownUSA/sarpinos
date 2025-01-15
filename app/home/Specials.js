'use client';
import { useContext } from 'react';
import { ThemeContext } from '../context/useThemeProvider';

import Link from 'next/link';
import SpecialsCarousel from '@/app/components/SpecialsCarousel';
import styles from './Specials.module.css';
const Specials = ({ data, specialsData }) => {
  const theme = useContext(ThemeContext);
  const isDay = theme === 'day';

  return (
    <section className={`viewport text-align-center ${styles.specials} ${isDay ? 'red-color' : 'lightgreen-color'}`} style={{ padding: '7rem 0' }}>
      <div className="full-page-container">
        <div className={styles.content}>
          <h2>{data.acf.national_specials_headline}</h2>
          <p>{data.acf.national_specials_paragraph}</p>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <SpecialsCarousel specialsData={specialsData} />
          </div>
        </div>
        <div style={{ margin: '2rem 0' }}>

        </div>
        <Link href="/menu/national-specials" className={`btn ${isDay ? 'secondary-btn' : 'primary-btn'}`}><span>See More Specials</span></Link>
      </div>
    </section>
  )
}

export default Specials;
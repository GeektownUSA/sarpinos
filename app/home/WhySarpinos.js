'use client';
import { useContext } from 'react';
import { ThemeContext } from '../context/useThemeProvider';

import CalloutWhy from '@/app/components/CalloutWhy';
const WhySarpinos = ({ data }) => {
  const theme = useContext(ThemeContext);
  const isDay = theme === 'day';

  return (
    <section className={`viewport text-align-center ${isDay === false ? 'daytime-background-color' : 'nighttime-background-color'}`} style={{ paddingTop: 0 }}>
      <h2 style={{ margin: 0 }}>{data.acf.why_sarpinos_headline || 'WHY SARPINO\'S?'}</h2>
      {data.acf.why_sarpinos_paragraph && <div style={{ maxWidth: '520px', margin: '0 auto 3rem', padding: '0 2rem' }} dangerouslySetInnerHTML={{ __html: data.acf.why_sarpinos_paragraph }} />}
      <CalloutWhy
        containerClasses={'page-container cream-outline text-align-center'}
        gridClasses={isDay === false ? 'night-theme' : ''}
      />
    </section>
  );
}

export default WhySarpinos;
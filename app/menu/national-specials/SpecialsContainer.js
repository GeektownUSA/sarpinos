'use client';

import { useContext } from 'react';
import { ThemeContext } from '../../context/useThemeProvider';
import SpecialsList from './SpecialsList';

const SpecialsContainer = ({ data, posts, postType }) => {
  const theme = useContext(ThemeContext);
  const isNight = theme === 'night';

  return (
    <section className={`viewport innermenu specials-background white-text`}>
      <div className="full-page-container">
        <div className='flex-align-center text-align-center' style={{ padding: '0 2rem' }}>
          <h2 dangerouslySetInnerHTML={{ __html: data.title.rendered || '' }} />
          <div style={{ maxWidth: '500px' }} dangerouslySetInnerHTML={{ __html: data.content.rendered || '' }} />
        </div>
        <SpecialsList
          posts={posts}
          postType={postType}
          categoryTitle={'Sort ' + postType} />
      </div>
    </section>

  )
}

export default SpecialsContainer;
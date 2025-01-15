import Image from 'next/image';
import styles from './MenuHeader.module.css';
import OrderLink from '@/app/components/OrderLink';
const MenuHeader = ({ featuredImage, featuredImageAlt, pageTitle, pageContent, category }) => {
  return (
    <div className="responsive-column-container" style={{ margin: '1em 0 2em' }}>
      <div>
        {featuredImage && (
          <Image
            priority
            alt={featuredImageAlt}
            src={featuredImage}
            width={650}
            height={400}
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
          />
        )}
      </div>
      <div className='flex-align-center'>
        <h1 style={{ margin: '0 auto 0 0' }} dangerouslySetInnerHTML={{ __html: pageTitle || '' }} />
        <div dangerouslySetInnerHTML={{ __html: pageContent || '' }} />
        <p>Please check your <OrderLink label="local Sarpino's Pizzeria" category={category} />, as not all of the <span dangerouslySetInnerHTML={{ __html: pageTitle + ' items' || 'items' }} /> shown here are available at every location.</p>
      </div>
    </div>
  )
}

export default MenuHeader;
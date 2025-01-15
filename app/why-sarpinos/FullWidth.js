import Image from 'next/image';
import styles from './FullWidth.module.css';

const FullWidth = ({ data, fullWidthImage }) => {
  return (
    <section className="full-page-container daytime-background-color">
      <div className="text-align-center flex-align-center position-relative">
          <Image src={fullWidthImage.sourceUrl} 
            width={1200}
            height={800}
            alt={fullWidthImage.altText}  
            className={styles.image}
          />
          <div className={styles.container}></div>
          <div className={styles.content}>
            <h2>{data.acf.full_width_headline}</h2>
          </div>
      </div>
    </section>
  )
}

export default FullWidth;
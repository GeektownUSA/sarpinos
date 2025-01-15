import styles from './Hero.module.css'
import Image from 'next/image';
import ContactBtn from '@/app/components/ContactBtn';
const Hero = ({ featuredImage, featuredImageAlt, data }) => {
  return (
    <>
      <div className="responsive-column-container" style={{ margin: '1em 0 0', gridGap: '4rem' }}>
        <div className={styles.animation}>
          <div className={styles.mask}>
            {featuredImage && (
              <Image
                alt={featuredImageAlt}
                src={featuredImage}
                width={650}
                height={650}
                className={styles.image}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
              />
            )}
          </div>
          <Image src={'/heart-red-fill.svg'} width={55} height={55} className={styles.redFillHeart} alt="red fill heart" />
          <Image src={'/heart-green-fill.svg'} width={40} height={40} className={styles.greenFillHeart} alt="green fill heart" />
          <Image src={'/heart-green-outline.svg'} width={57} height={57} className={styles.greenOutlineHeart} alt="green outline heart" />
          <Image src={'/heart-red-outline.svg'} width={60} height={60} className={styles.redOutlineHeart} alt="red outline heart" />
        </div>
        <div className='flex-align-center'>
          <div>
            <div dangerouslySetInnerHTML={{ __html: data.content.rendered || '' }} />
            <ContactBtn />
            <p style={{ maxWidth: '255px' }} dangerouslySetInnerHTML={{ __html: data.acf.description }} />
          </div>
        </div>
      </div></>
  );
}

export default Hero;
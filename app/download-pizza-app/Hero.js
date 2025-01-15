import Image from 'next/image';
import Link from 'next/link';
import styles from './Hero.module.css';
import styles2 from '@/app/components/Footer.module.css';

const Hero = ({ data, mainImage }) => {


  return (
    <div className="responsive-column-container">
      <div className={`flex-align-center order2 ${styles.textCol}`}>
        <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: data?.title.rendered || '' }} />
        <div dangerouslySetInnerHTML={{ __html: data?.content.rendered || '' }} />
        <div className={styles2.appStoreLinks}>
          <div>
            <a href="https://apps.apple.com/us/app/sarpinos-pizzeria/id1334667520" target="_blank" rel="noopener noreferrer">
              <Image
                src={"/icon-app-store.png"}
                alt="App Store"
                width={136}
                height={40}
                style={{ paddingBottom: '1rem' }}
              />
              </a>
            <a href="https://play.google.com/store/apps/details?id=com.foodtec.sarpinosusa&hl=en_US" target="_blank" rel="noopener noreferrer">
              <Image
                src={"/icon-google-play.png"}
                alt="App Store"
                width={136}
                height={40}
              />
              </a>
          </div>

          <Image
            src={"/qr-code-app.png"}
            alt="Scan the QR Code"
            width={78}
            height={97}
            className={styles2.qrCode}
          />
        </div>
      </div>
      <div className={`order1 ${styles.imageCol}`}>
        {mainImage && (
          <Image
            src={mainImage.sourceUrl}
            alt={mainImage.altText}
            width={650}
            height={412}
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
          />
        )}
        <Image src={'/heart-green-fill.svg'} width={55} height={55} className={styles.greenFillHeart} alt="green fill heart" />
        <Image src={'/heart-green-outline.svg'} width={57} height={57} className={styles.greenOutlineHeart} alt="green outline heart" />
        <Image src={'/heart-red-outline.svg'} width={60} height={60} className={styles.redOutlineHeart} alt="red outline heart" />
      </div>
    </div>
  );
}

export default Hero;
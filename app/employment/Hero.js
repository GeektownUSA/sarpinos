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
          <Image src={'/icon-mail-red-fill.svg'} width={55} height={55} className={styles.redFillHeart} alt="red fill mail" />
          <Image src={'/icon-mail-green-fill.svg'} width={40} height={40} className={styles.greenFillHeart} alt="green fill mail" />
          <Image src={'/icon-phone-green-outline.svg'} width={57} height={57} className={styles.greenOutlineHeart} alt="green outline phone" />
          <Image src={'/icon-phone-red-outline.svg'} width={60} height={60} className={styles.redOutlineHeart} alt="red outline phone" />
        </div>
        <div className='flex-align-center'>
          <div>
            <div>
				<h1 class="wp-block-heading">JOIN THE SARPINO’S TEAM</h1>
				<p>At Sarpino’s, we’re always looking for great people to join our team. If you’re interested in employment with one of our locations, we’d love to hear from you.</p>
				<p>Fill out the form below to submit your application. Your information will be forwarded to the appropriate Sarpino’s location for review.</p>
				<h4>Thank you for your interest in joining Sarpino’s!</h4>
			</div>
          </div>
        </div>
      </div></>
  );
}

export default Hero;
import Image from 'next/image';
import ContactBtn from './ContactBtn';
import styles from './CalloutCatering.module.css';

const CalloutCatering = () => {
  return (
    <>
      <section className={`viewport gray-color ${styles.bkg}`}>
        <Image
          src="/pizza-background-callout.jpg"
          alt="Pizza Background"
          fill
          className={styles.bkgImage}
        />
        <div className={styles.callout}>
          <div className="responsive-column-container">
            <div className={styles.column}>
              <h3 className={styles.title}>
                Find Catering Options Near You
              </h3>
              <ContactBtn />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CalloutCatering;
import Image from 'next/image';
import styles from './CalloutBanner.module.css';

const CalloutBanner = ({ data }) => {
  return (
    <>
      <section className={`viewport gray-color ${styles.bkg}`}>
        <Image
          src="/pizza-background-callout-new.png"
          alt="Pizza Background"
          fill
          className={styles.bkgImage}
        />
        <div className={styles.callout}>
          <div className="responsive-column-container">
            <div className={styles.column}>
              <h2 dangerouslySetInnerHTML={{ __html: data.acf.contact_corporate_headline }} />
			  <div dangerouslySetInnerHTML={{ __html: data.acf.contact_corporate_content }} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CalloutBanner;
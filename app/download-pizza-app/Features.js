import Image from 'next/image';
import styles from './Features.module.css';

const Features = ({ data }) => {
  const features = data?.acf?.features_list || [];
  return (
    <>
      <h2 dangerouslySetInnerHTML={{ __html: data?.acf?.features_headline || '' }} className={styles.title}></h2>
      <div className="responsive-column-container">
        <div dangerouslySetInnerHTML={{ __html: data?.acf?.navigation_features || '' }} className={styles.content} />
        <div className={styles.features}>
          <div className={styles.feature}>
            <Image
              src={'/icon-notifications.svg'}
              alt="icon"
              width={65}
              height={65}
              className={styles.icon}
            />
            <p dangerouslySetInnerHTML={{ __html: data.acf.features_list[0].title || '' }} />
          </div>
          <div className={styles.feature}>
            <Image
              src={'/icon-login.svg'}
              alt="icon"
              width={65}
              height={65}
              className={styles.icon}
            />
            <p dangerouslySetInnerHTML={{ __html: data.acf.features_list[1].title || '' }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Features;
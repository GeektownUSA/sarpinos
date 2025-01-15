import Image from 'next/image';
import OrderBtn from './OrderBtn';
import styles from './CalloutLoyalty.module.css';

const CalloutLoyalty = ({ data, bkgImage }) => {
  return (
    <>
      <section className={`viewport gray-color ${styles.bkg}`}>
        <Image
          src={bkgImage ? bkgImage.sourceUrl : '/pizza2-background-callout.jpg'}
          alt="Pizza Background"
          fill
          className={styles.bkgImage}
        />
        <div className={styles.callout}>
          <div className="responsive-column-container">
            <div className={styles.column}>
              <h2 className={styles.title}>
                {data?.acf?.order_now_headline || 'Order Now'}
              </h2>
              <h4 className={styles.subTitle}>{data?.acf?.order_now_subheadline || 'and Start Earning Pizza Rewards!'}</h4>
              <OrderBtn />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CalloutLoyalty;
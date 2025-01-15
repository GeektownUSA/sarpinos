import Image from 'next/image';
import styles from './Earn.module.css';

const Earn = ({ data, earnImages, rewardsPointsImage, rewardsDiscountImage, rewardsPizzaImage }) => {
  const title = '<span>' + data?.acf.points_headline + '</span>';
  const title2 = '<span>' + data?.acf.rewards_headline + '</span>';

  return (
    <>
      <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: title || '' }} />
      <div className="responsive-three-column-container">
        <div className={styles.iconCol}>
          <Image
            src={earnImages[0] ? earnImages[0].sourceUrl : '/loyalty-signup.svg'}
            alt="signup icon"
            width={167}
            height={167}
            className={styles.icon}
          />
          <div>
            <h4 className={styles.iconTitle} dangerouslySetInnerHTML={{ __html: data?.acf.earn_points[0].title || '' }} />
            <p className={styles.iconCaption} dangerouslySetInnerHTML={{ __html: data?.acf.earn_points[0].caption || '' }} />
          </div>
        </div>
        <div className={styles.iconCol}>
          <Image
            src={earnImages[1] ? earnImages[1].sourceUrl : '/loyalty-cash.svg'}
            alt="signup icon"
            width={167}
            height={167}
            className={styles.icon}
          />
          <div>
            <h4 className={styles.iconTitle} dangerouslySetInnerHTML={{ __html: data?.acf.earn_points[1].title || '' }} />
            <p className={styles.iconCaption} dangerouslySetInnerHTML={{ __html: data?.acf.earn_points[1].caption || '' }} />
          </div>
        </div>
        <div className={styles.iconCol}>
          <Image
            src={earnImages[2] ? earnImages[2].sourceUrl : '/loyalty-pizza.svg'}
            alt="signup icon"
            width={167}
            height={167}
            className={styles.icon}
          />
          <div>
            <h4 className={styles.iconTitle} dangerouslySetInnerHTML={{ __html: data?.acf.earn_points[2].title || '' }} />
            <p className={styles.iconCaption} dangerouslySetInnerHTML={{ __html: data?.acf.earn_points[2].caption || '' }} />
          </div>
        </div>
      </div>
      <h2 className={styles.title} style={{ marginTop: '4rem' }} dangerouslySetInnerHTML={{ __html: title2 || '' }} />
      <div className={`responsive-unlimited-equal-height-container ${styles.pointsContainer}`}>
        <div className={styles.pointsCol}>
          <Image
            src={rewardsPointsImage ? rewardsPointsImage.sourceUrl : '/loyalty-points.svg'}
            alt="100 points icon"
            width={150}
            height={150}
            className={styles.icon}
          />
        </div>
        <div className={styles.arrow} />
        <div className={styles.pointsCol}>
          <Image
            src={rewardsDiscountImage ? rewardsDiscountImage.sourceUrl : '/loyalty-discount.svg'}
            alt="Get $10 off icon"
            width={220}
            height={220}
            className={styles.icon}
          />
        </div>
        <div className={styles.arrow} />
        <div className={styles.pointsCol}>
          <Image
            src={rewardsPizzaImage ? rewardsPizzaImage.sourceUrl : '/loyalty-canadian-pizza.webp'}
            alt="Canadian bacon pizza"
            width={350}
            height={350}
            className={styles.pizza}
          />
        </div>
      </div>
      <p className={styles.pointsDesc} dangerouslySetInnerHTML={{ __html: data?.acf.rewards_description || '' }} />
    </>
  );
}

export default Earn;
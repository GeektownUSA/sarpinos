import styles from './BYOContent.module.css';

const BYOContent2 = ({ data }) => {

  const sauces = data?.acf?.sauces || '';
  return (
    <>
      {sauces && <div className={styles.ingredients}>
        <div className={styles.sauces} dangerouslySetInnerHTML={{ __html: sauces || '' }} />
      </div>}
    </>
  );
}

export default BYOContent2;
import styles from './ItemAllergens.module.css';

const ItemAllergens = ({ post }) => {
  return (
    <div className={styles.allergens} dangerouslySetInnerHTML={{ __html: post?.acf?.allergens || 'No allergens' }} />
  )
};

export default ItemAllergens;
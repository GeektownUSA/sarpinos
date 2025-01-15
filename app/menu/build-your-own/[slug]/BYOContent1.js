import styles from './BYOContent.module.css';

const BYOContent1 = ({ data, post }) => {

  const sizes = post?.acf?.sizes || [];
  const ingredients = data?.acf?.ingredients || [];
  return (
    <>
      <div>
        {sizes &&
          <div className={styles.sizes}>
            {sizes.map((item, index) => (
              <div key={index} className={styles.sizeItem}>
                <div className={styles.circleContainer}>
                  <div className={styles.circle}>
                    {item.title}
                  </div>
                </div>
                <div className={styles.label}>
                  {item.description}
                </div>
              </div>
            ))}
          </div>}
        {ingredients && <div className={styles.ingredients}>
          {ingredients.map((item, index) => (
            <div className={styles.ingredientsList} key={index}>
              <h5 className={styles.ingredientsTitle}>{item.title}</h5>
              <div className={styles.ingredientsContent} dangerouslySetInnerHTML={{ __html: item.ingredients_list || '' }} />
            </div>
          ))}
        </div>}
      </div>
    </>
  );
}

export default BYOContent1;
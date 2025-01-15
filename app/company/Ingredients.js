import styles from './Ingredients.module.css';
const Ingredients = ({ data }) => {
  return (
    <section className="viewport">
      <div className="page-container red-color inner-hero" style={{ padding: 0, width: '92%' }}>
        <div className={styles.ingredients}>
          <h2 className='text-align-center'>{data.acf.gourmet_headline}</h2>
          <div dangerouslySetInnerHTML={{ __html: data.acf.gourmet_paragraph || '' }} style={{ maxWidth: '500px', margin: '0 auto 2rem', textAlign: 'center' }} />
          <hr />
          <div className="responsive-three-column-container">
            <div className="content">
              <div dangerouslySetInnerHTML={{ __html: data.acf.gourmet_ingredients_1 || '' }} />
            </div>
            <div className="content">
              <div dangerouslySetInnerHTML={{ __html: data.acf.gourmet_ingredients_2 || '' }} />
            </div>
            <div className="content">
              <div dangerouslySetInnerHTML={{ __html: data.acf.gourmet_ingredients_3 || '' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Ingredients;
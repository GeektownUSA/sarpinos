import styles from './How.module.css';
const How = ({ data }) => {

  const steps = data.acf?.steps || [];
  return (
    <>
      <div className={styles.container}>
        <div className={styles.headline}>
          <h2 dangerouslySetInnerHTML={{ __html: data.acf.how_it_works_headline || '' }} />
        </div>
        <ul className={styles.steps}>
          {steps.map((item, index) => (
            <li key={index}>
              <div className={styles.circle}>
                <p className={styles.title}>Step {index + 1}</p>
                <p className={styles.step}>
                  {item.step}
                </p>
              </div>
              <div className={styles.arrow} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default How;
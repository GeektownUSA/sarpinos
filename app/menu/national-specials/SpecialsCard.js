import Image from 'next/image';
import styles from './SpecialsCard.module.css';

const SpecialsCard = ({ acfTitle, postTitle, postContent, category }) => {
  console.log("POST CONTENT:", postContent);

  return (
    <>
      <div className={styles.specials}>
        <div className={styles.specialsItem}>
          <Image
            src={'/circle-outline-1.svg'}
            alt=""
            width={200}
            height={200}
            className={styles.specialsBkg}
          />
          <div className={styles.item}>
            {/* 👇 Native WordPress Post Content at the top */}
            {postContent && (
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: postContent }}
              />
            )}

            <h3 className={styles.title} dangerouslySetInnerHTML={{ __html: acfTitle || '' }} />
            <p className={styles.paragraph}>with code</p>
            <h3 className={styles.code}>{postTitle}</h3>
          </div>
        </div>

        {category.includes('Carryout Only') ? (
          <p className="museo-slab">Online/Carryout Only</p>
        ) : null}
      </div>
    </>
  );
};

export default SpecialsCard;

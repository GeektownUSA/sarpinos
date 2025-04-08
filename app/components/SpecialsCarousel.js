import Image from 'next/image';
import styles from '../home/Specials.module.css';
import specialsBKG from '../../public/circle-outline-1.svg';

const SpecialsCarousel = ({ specialsData }) => {
  return (
    <ul className={styles.carousel} style={{ gridTemplateColumns: `repeat(${specialsData.length}, 1fr)` }}>
      {specialsData.map((item, index) => (
        <li className={styles.carouselItem} key={index}>
          <Image src={specialsBKG} alt="" className={styles.specialsBkg} />
          <div className={styles.item}>
            {/* 👇 Move native post content to the top */}
            {item.content?.rendered && (
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: item.content.rendered }}
              />
            )}

            <h3
              className={styles.title}
              dangerouslySetInnerHTML={{ __html: item.acf.title_of_special || '' }}
            />
            <p className={styles.withcode}>with code</p>
            <h3 className={styles.code}>{item.title.rendered}</h3>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SpecialsCarousel;

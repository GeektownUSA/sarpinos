import Image from "next/image";
import Link from "next/link";
import styles from './PopularItems.module.css'

const PopularItems = ({ data, menuItemsWithImages }) => {
  return (
    <section className="viewport" style={{ padding: 0 }}>
      <div className="page-container cream-color text-align-center">
        <h2 style={{ paddingTop: '2rem' }}>{data.acf.popular_items_headline}</h2>
        <div className="responsive-three-column-container">
          {menuItemsWithImages.map((item, index) => {
            return (
              <div key={index} className={styles.item}>
                <div className={styles.thumbnail}>
                  <Link href={item.link.url}>
                    {item.hoverImage.sourceUrl ? (
                      <>
                        <Image
                          src={item.hoverImage.sourceUrl}
                          alt={item.hoverImage.altText}
                          className={styles.hoverImage}
                          width={100}
                          height={100}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <Image
                          src={item.image.sourceUrl}
                          alt={item.image.altText}
                          className={styles.mainImage}
                          width={100}
                          height={100}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </>
                    ) : (
                      <Image
                        src={item.image.sourceUrl}
                        alt={item.image.altText}
                        className={styles.mainImageScale}
                        width={100}
                        height={100}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    )}

                  </Link>
                </div>
                <div className={styles.label} style={{ alignItems: 'center' }}>
                  <h3><Link href={item.link.url}>{item.title}</Link></h3>
                  <div className={styles.caption} dangerouslySetInnerHTML={{ __html: item.description || '' }} />
                  <Link className="btn primary-btn" href={item.link.url} style={{ margin: '1rem 0' }}><span>{item.title}</span></Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}

export default PopularItems;
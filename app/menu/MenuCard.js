import Image from 'next/image';
import Link from 'next/link';
import OrderBtn from '@/app/components/OrderBtn';
import styles from './MenuCard.module.css';
import he from 'he';

const MenuCard = ({ post, postTypeSlug, itemCategory, menuSlug, hoverImage, hoverAlt, featuredImage, featuredAlt }) => {

  const whichMenu = menuSlug === 'vegan-menu' ? 'vegan-menu' : 'menu';
  const veganMenuMap = {
    'sarpinos-specialty-pizza': 'vegan-pizza',
    'deep-dish-pizza': 'vegan-deep-dish-pizza',
    'calzones': 'vegan-calzones',
    'wings-apps': 'vegan-wings-apps',
    'salads': 'vegan-salads',
    'sandwiches': 'vegan-sandwiches',
    'pastas': 'vegan-pastas',
    'breadsticks': 'vegan-breadsticks',
    'desserts': 'vegan-desserts',
    'extras': 'vegan-extras',
    // add more mappings as needed
  };

  const whichPizza = menuSlug === 'vegan-menu' && veganMenuMap[postTypeSlug] ? veganMenuMap[postTypeSlug] : postTypeSlug;
  const url = `/${whichMenu}/${whichPizza}/${post.slug}`;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.menuThumb}>
          <Link href={url} className='fade-in'>
            {hoverImage ? (
              <>
                <Image
                  alt={hoverAlt}
                  src={hoverImage}
                  width={500}
                  height={500}
                  className={styles.hoverImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <Image
                  priority
                  alt={featuredAlt}
                  src={featuredImage}
                  width={500}
                  height={500}
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </>
            ) : (
              <Image
                priority
                alt={featuredAlt}
                src={featuredImage}
                width={500}
                height={500}
                className={`${styles.scaleImage}`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
          </Link>
        </div>
        <div className={styles.label}>
          <h2 className={styles.title}>
            <Link className={styles.link} href={url}>{he.decode(post?.title?.rendered || '')}</Link>
          </h2>
          <Link className={styles.caption} href={url}>
            {post.acf.caption.length > 140
              ? post.acf.caption.substring(0, 140) + '...'
              : post.acf.caption || ''}
          </Link>
          <p className={styles.links}>
            <OrderBtn category={post.type} itemCategory={itemCategory} />
            <Link className={styles.link} href={url}>More Info</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default MenuCard;
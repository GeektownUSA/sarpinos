'use client';
import { useEffect, useContext } from 'react';
import { StoreContext } from '@/app/context/useStoreContext';
import styles from './DeliveryArea.module.css';

const DeliveryArea = ({ post }) => {

  const { setStore } = useContext(StoreContext); 

  useEffect(() => {
    if (post?.acf?.name) {
      setStore(post.acf.name); // Set the store context to the ACF "name"
    }
  }, [post, setStore]);

  const areacities = post.acf?.area_cities || [];
  const areazips = post.acf?.area_zips || [];
  const areaneighborhoods = post.acf?.area_neighborhoods || [];
  const arealandmarks = post.acf?.area_landmarks || [];
  const areahotels = post.acf?.area_hotels || [];


  return (
    <>
      <div className={styles.container}>
        {areacities && areacities.length > 0 &&
          <>
          <h3>Sarpino&apos;s delivers food to:</h3>
            <ul className={styles.list}>
              {areacities.map((item, index) => (
                <li key={index}>
                  {item.item_name}
                </li>
              ))}
            </ul>
          </>
        }
        {areaneighborhoods && areaneighborhoods.length > 0 &&
        <>
          <h5 className={styles.title}>Find best pizza places that deliver in and around {post.acf?.city}, {post.acf?.state}</h5>
          <ul className={styles.list}>
            {areaneighborhoods.map((item, index) => (
              <li key={index}>
                {item.item_name}
              </li>
            ))}
          </ul>
        </>
        }
      </div>
        {areazips && areazips.length > 0 &&
        <div className={styles.container}>
          <h5 className={styles.title}>Food Delivery To Zip Codes</h5>
            <ul className={styles.list}>
              {areazips.map((item, index) => (
                <li key={index}>
                  {item.item_name}
                </li>
              ))}
            </ul>
        </div>
        }
        {areahotels && areahotels.length > 0 &&
        <div className={styles.container}>
          <h5 className={styles.title}>Hotel Delivery Options</h5>
          <ul className={styles.list}>
            {areahotels.map((item, index) => (
              <li key={index}>
                {item.item_name}
              </li>
            ))}
          </ul>
        </div>
        }
        {arealandmarks && arealandmarks.length > 0 &&
          <div className={styles.container}>
            <h5 className={styles.title}>Late Night Food Delivery To:</h5>
            <ul className={styles.list}>
              {arealandmarks.map((item, index) => (
                <li key={index}>
                  {item.item_name}
                </li>
              ))}
            </ul>
          </div>
        }
    </>
  );
}

export default DeliveryArea;
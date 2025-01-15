'use client';
import { useEffect, useContext } from 'react';
import { StoreContext } from '@/app/context/useStoreContext';
import styles from './StoreInfo.module.css';
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';
import he from 'he';
import OrderBtn from '@/app/components/OrderBtn';
import OrderLink from '@/app/components/OrderLink';

const StoreInfo = ({ post }) => {
  const { setStore } = useContext(StoreContext); 

  useEffect(() => {
    if (post?.acf?.name) {
      setStore(post.acf.name); // Set the store context to the ACF "name"
    }
  }, [post, setStore]);
  
  const slug = post.slug || '';
  const url = `/pizza-delivery/${slug}`;

  const careers = post?.acf?.careers || ['careers list'];
  
  const groupDays = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    let groupedDays = [];
    let currentGroup = [];
  
    for (let i = 0; i < days.length; i++) {
      if (i === 0 || (post.acf[days[i] + '_open'] === post.acf[days[i - 1] + '_open'] && post.acf[days[i] + '_close'] === post.acf[days[i - 1] + '_close'])) {
        currentGroup.push(days[i]);
      } else {
        groupedDays.push(currentGroup);
        currentGroup = [days[i]];
      }
    }
  
    groupedDays.push(currentGroup);
  
    return groupedDays.map(group => {
      const openTimeValue = post.acf[group[0] + '_open'];
      const closeTimeValue = post.acf[group[0] + '_close'];
  
      if (!openTimeValue || !closeTimeValue) {
        return '<p>Hours not available</p>';
      }
  
      const openTime = moment(openTimeValue, 'hh:mm:ss A').format('h:mm a');
      const closeTime = moment(closeTimeValue, 'hh:mm:ss A').format('h:mm a');
      const hours = openTime + ' - ' + closeTime;
  
      if (group.length === 1) {
        return '<p><strong>' + (group[0].charAt(0).toUpperCase() + group[0].slice(1)) + '</strong><br/> ' + hours + '</p>';
      } else {
        return '<p><strong>' + (group[0].charAt(0).toUpperCase() + group[0].slice(1)) + ' - ' + (group[group.length - 1].charAt(0).toUpperCase() + group[group.length - 1].slice(1)) + '</strong><br/> ' + hours + '</p>';
      }
    }).join('');
  }

  // Log the URLs to ensure they are not undefined
  console.log('Google Maps URL:', `https://www.google.com/maps?saddr=Your+Location&daddr=${post.acf?.name || ''}`);
  console.log('Delivery Area URL:', url + '/delivery-area');

  return (
    <>
      <div className={styles.container}>
        <div className={styles.column1}>
          <p><strong>{post.acf?.phone_number || 'phone number'}</strong></p>
          <p>{post.acf?.address || 'address'}<br />
            {post.acf?.city}, {post.acf?.state} {post.acf?.zip}
          </p>
          <Link className="text-link" href={`https://www.google.com/maps?saddr=Your+Location&daddr=${post.acf?.name || ''}`} target="_blank">Directions</Link>
        </div>
        <div className={styles.column2}>
          <p dangerouslySetInnerHTML={{ __html: groupDays() }}></p>
        </div>
      </div>
      <div className={styles.content}>
        <h3>Looking for the Best Pizza Delivery in {post.acf?.city || 'your city'}?</h3>
        <p>Look no further than your local Sarpino&apos;s. You want the best pizza delivery in your area, and we aim to fulfill that with hand-made pizza delivered to you with no delivery fee and, oh yeah, we&apos;re open late.</p>
        <p>We offer specialty pizza with the freshest of ingredients. Our menu is full of gourmet pizza options born from Italian tradition. We also provide numerous vegan/gluten free pizza options because everyone deserves great pizza in their life. Vegan pizza doesn&apos;t mean less flavor. Our vegan pizza uses fresh ingredients from trusted brands such as Daiya Cheese, Beyond Meat, and Field Roast to ensure maximum flavor. We encourage you to try all our different vegan pizza options in Sarpino&apos;s Pizzeria {post.acf?.city || 'your city'}. We can even accommodate new creations, so feel free to order a customized vegan pizza today!</p>
        <p>Our menu provides so much more than pizza, serving up sandwiches, pastas, calzones, salads, sides, desserts and more! All meals are made fresh and you can also count on free delivery when you order from Sarpino&apos;s online.</p>
      </div>
      <div className={styles.content}>
        <h5>The Only Choice for Free Delivery in the {post.acf?.metro_area || 'your metro area'} metro area.</h5>
        <p>We take pizza and food delivery to the next level. You get fast, free food delivery, even if it&apos;s a late night. There is no minimum order and you can take your time while using our online menu. And of course, you can always count on getting delicious pizza from Sarpino&apos;s Pizzeria in the {post.acf?.metro_area || 'your metro area'} metro area.</p>
      </div>
      <div className={styles.content}>
        <h5>Wondering about our delivery area?</h5>
        <p>Food and Pizza Delivery to the {post.acf?.name || 'your area'} area at no additional cost! Want to know if your zip code, hotel or other location is in our delivery area? See the <Link href={url + '/delivery-area'}>Delivery Area section</Link> for more specific details.</p>
      </div>
      <div className={styles.content}>
        <h5>Have a craving after hours?</h5>
        <p>It&apos;s late. You are hungry. You are craving pizza. You need it delivered fast. You are on the right page. Your local  {post.acf?.name || 'Sarpino\'s'} Sarpino&apos;s is open all day, even at late-night and is ready help you satisfy your cravings.</p>
      </div>
      <div className={styles.content}>
        <h5>You can get hot, fresh food delivered to your door in three easy steps:</h5>
        <ol className={styles.list}>
          <li>Browse {he.decode(post.title.rendered)} <OrderLink label="online menu" /> and pick what you like from our selection of pizzas, pastas, sandwiches, and more.</li>
          <li>Order online using our secure website. There is no minimum order requirement for free delivery.</li>
          <li>We will deliver your food fast and free right to your door.</li>
        </ol>
      </div>
      <OrderBtn />
      <div className={styles.container2}>
        {(post.acf?.managers_email || post.acf?.mangers_name) &&
          <div className={styles.column1}>
            <h5>MANAGER</h5>
            {post.acf?.managers_photo && <Image
              className={styles.managerPhoto}
              src={post.acf?.managers_photo || '/default-manager.jpg'}
              alt="manager"
              width={80} height={80} />}
            {post.acf?.mangers_name &&<h5 className={styles.managerName}>{post.acf?.mangers_name}</h5>}
            {post.acf?.managers_email && <Link
              className={styles.managerEmail}
              href={`mailto:${post.acf.managers_email}`}>{post.acf.managers_email}</Link>}
          </div>
        }
        {careers && careers.some(career => career.position) ? <div className={styles.column2}>
          <h5>Currently Hiring</h5>
          <div className={styles.careers}>
            {careers.map((career, index) => (
              <div key={index} className={styles.career}>
                <Link className={styles.jobLink} href={career.url || '#'}>{career.position}</Link>
              </div>
            ))}
          </div>
        </div> : <div className={styles.column2}>
            <h5>Currently Hiring</h5>
            <p>Interested in working with us? <a href="https://jobs.gosarpinos.com/" target="_blank" rel="noopener noreferrer">View our current job listings.</a></p>
          </div>}
      </div>
      <div className={styles.content}>
        <ul className={styles.list}>
          {post.acf?.google_write_a_review_link?.url && 
            <li><a className='text-link' href={post.acf?.google_write_a_review_link?.url} target="_blank" rel="noopener noreferrer">Google Reviews</a></li>
          }
          {post.acf?.allergyeats_url?.url && 
            <li><a className='text-link' href={post.acf?.allergyeats_url?.url} target="_blank" rel="noopener noreferrer">Allergy Eats</a></li>
          }
          {post.acf?.apple_maps_url?.url && 
            <li><a className='text-link' href={post.acf?.apple_maps_url?.url} target="_blank" rel="noopener noreferrer">Apple Maps</a></li>
          }
          {post.acf?.bing_maps_url?.url && 
            <li><a className='text-link' href={post.acf?.bing_maps_url?.url} target="_blank" rel="noopener noreferrer">Bing Maps</a></li>
          }
          {post.acf?.delivery_url?.url && 
            <li><a className='text-link' href={post.acf?.delivery_url?.url} target="_blank" rel="noopener noreferrer">Delivery</a></li>
          }
          {post.acf?.facebook_url?.url && 
            <li><a className='text-link' href={post.acf?.facebook_url?.url} target="_blank" rel="noopener noreferrer">Facebook</a></li>
          }
          {post.acf?.instagram_url?.url && 
            <li><a className='text-link' href={post.acf?.instagram_url?.url} target="_blank" rel="noopener noreferrer">Instagram</a></li>
          }
          {post.acf?.foursquare_url?.url && 
            <li><a className='text-link' href={post.acf?.foursquare_url?.url} target="_blank" rel="noopener noreferrer">Foursquare</a></li>
          }
          {post.acf?.google_url?.url && 
            <li><a className='text-link' href={post.acf?.google_url?.url} target="_blank" rel="noopener noreferrer">Google</a></li>
          }
          {post.acf?.groupon_url?.url && 
            <li><a className='text-link' href={post.acf?.groupon_url?.url} target="_blank" rel="noopener noreferrer">Groupon</a></li>
          }
          {post.acf?.grubhub_url?.url && 
            <li><a className='text-link' href={post.acf?.grubhub_url?.url} target="_blank" rel="noopener noreferrer">Grubhub</a></li>
          }
          {post.acf?.judys_book_url?.url && 
            <li><a className='text-link' href={post.acf?.judys_book_url?.url} target="_blank" rel="noopener noreferrer">Judy&apos;s Book</a></li>
          }
          {post.acf?.seamless_url?.url && 
            <li><a className='text-link' href={post.acf?.seamless_url?.url} target="_blank" rel="noopener noreferrer">Seamless</a></li>
          }
          {post.acf?.tripadvisor_url?.url && 
            <li><a className='text-link' href={post.acf?.tripadvisor_url?.url} target="_blank" rel="noopener noreferrer">Trip Advisor</a></li>
          }
          {post.acf?.yellowpages_url?.url && 
            <li><a className='text-link' href={post.acf?.yellowpages_url?.url} target="_blank" rel="noopener noreferrer">Yellow Pages</a></li>
          }
          {post.acf?.yelp_url?.url && 
            <li><a className='text-link' href={post.acf?.yelp_url?.url} target="_blank" rel="noopener noreferrer">Yelp</a></li>
          }
          {post.acf?.zomato_url?.url && 
            <li><a className='text-link' href={post.acf?.zomato_url?.url} target="_blank" rel="noopener noreferrer">Zomato</a></li>
          }
        </ul>
        </div>
    </>
  );
}

export default StoreInfo;
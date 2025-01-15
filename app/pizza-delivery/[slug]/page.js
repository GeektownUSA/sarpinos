import { METADATABASE_API_URL } from '@/app/lib/constants';
import { fetchCPTMetadataBySlug, fetchCPTBySlug } from '@/app/lib/utils'; // Adjust the path as necessary
import Link from 'next/link';
import Hero from './Hero';
import StoreInfo from './StoreInfo';
import tabStyles from '@/app/components/TabList.module.css';
import moment from 'moment';

const pageId = 214;
const postType = 'locations';
export async function generateMetadata({ params }) {
  const postId = params.slug;
  const metadata = await fetchCPTMetadataBySlug(postId, postType);

  return {
    metadataBase: METADATABASE_API_URL,
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      images: metadata.ogImage ? [{ url: metadata.ogImage }] : []
    },
    jsonld: metadata.yoastMetadata?.schema?.["@graph"]
  };
}


export default async function Page({ params }) {

  let post;
  let storefrontImage;
  try {
    post = await fetchCPTBySlug(params.slug, postType)

    storefrontImage = post?.acf.storefront_image ? await fetchACFImage(post?.acf.storefront_image).catch(e => {
      console.error(`Error fetching storefront image: ${e}`);
      return null;
    }) : null;

    post = { ...post, storefrontImage };

  } catch (error) {
    console.error("Error fetching post data:", error);
    // Handle the error appropriately
  }
  const slug = post.slug || '';
  const url = `/pizza-delivery/${slug}`;
  console.log('url: ', url)
  console.log('slug: ', post.slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    name: 'Sarpino\'s Pizzeria',
    url: `https://www.gosarpinos.com/${url}`,
    image: './default-image.jpg',
    description: post.yoast_head_json.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: post.acf.address,
      addressLocality: post.acf.city,
      addressRegion: post.acf.state,
      postalCode: post.acf.zip,
      addressCountry: 'US'
    },
    telephone: post.acf.phone_number,
    email: 'us@gosarpinos.com',
    servesCuisine: "Italian",
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Credit Card',
    priceRange: '$$',
    logo: './location-hero-sarpinos.jpg',
    openingHours: post.acf ? [
      `Mo ${post.acf.monday_open ? moment(post.acf.monday_open, 'HH:mm:ss').format('h:mm a') : 'Closed'}-${post.acf.monday_close ? moment(post.acf.monday_close, 'HH:mm:ss').format('h:mm a') : 'Closed'}`,
      `Tu ${post.acf.tuesday_open ? moment(post.acf.tuesday_open, 'HH:mm:ss').format('h:mm a') : 'Closed'}-${post.acf.tuesday_close ? moment(post.acf.tuesday_close, 'HH:mm:ss').format('h:mm a') : 'Closed'}`,
      `We ${post.acf.wednesday_open ? moment(post.acf.wednesday_open, 'HH:mm:ss').format('h:mm a') : 'Closed'}-${post.acf.wednesday_close ? moment(post.acf.wednesday_close, 'HH:mm:ss').format('h:mm a') : 'Closed'}`,
      `Th ${post.acf.thursday_open ? moment(post.acf.thursday_open, 'HH:mm:ss').format('h:mm a') : 'Closed'}-${post.acf.thursday_close ? moment(post.acf.thursday_close, 'HH:mm:ss').format('h:mm a') : 'Closed'}`,
      `Fr ${post.acf.friday_open ? moment(post.acf.friday_open, 'HH:mm:ss').format('h:mm a') : 'Closed'}-${post.acf.friday_close ? moment(post.acf.friday_close, 'HH:mm:ss').format('h:mm a') : 'Closed'}`,
      `Sa ${post.acf.saturday_open ? moment(post.acf.saturday_open, 'HH:mm:ss').format('h:mm a') : 'Closed'}-${post.acf.saturday_close ? moment(post.acf.saturday_close, 'HH:mm:ss').format('h:mm a') : 'Closed'}`,
      `Su ${post.acf.sunday_open ? moment(post.acf.sunday_open, 'HH:mm:ss').format('h:mm a') : 'Closed'}-${post.acf.sunday_close ? moment(post.acf.sunday_close, 'HH:mm:ss').format('h:mm a') : 'Closed'}`
    ] : [],
    hasMenu: `https://${post.acf.name}.gosarpinos.com/ordering/menu/`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      reviewCount: '250'
    },
  }

  return (
    <div className="cream-color">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="hero">
        <Hero post={post} storefrontImage={storefrontImage} />
      </section>
      <section className="viewport">
        <div className="page-container">
          <ul className={`${tabStyles.tabList} ${tabStyles.locationTabs}`}>
            <li className={`${tabStyles.tabItem} ${tabStyles.active}`}>
              <Link href={url}>Store Info</Link>
            </li>
            <li className={`${tabStyles.tabItem}`}>
              <Link href={url + '/feedback'}>Feedback</Link>
            </li>
            <li className={`${tabStyles.tabItem}`}>
              <Link href={url + '/delivery-area'}>Delivery Area</Link>
            </li>
          </ul>
          {post?.acf.storefront_image && post?.acf.storefront_image.sourceUrl}
          <StoreInfo post={post} />
        </div>
      </section>
    </div>
  );
}

// app/menu/[cptName]/[slug]/page.js
import { fetchCPTMetadataBySlug, fetchCPTBySlug, fetchPageData, fetchACFImage } from '@/app/lib/utils';
import { METADATABASE_API_URL } from '@/app/lib/constants';
import CalloutMobileApp from '@/app/components/CalloutMobileApp';
import MenuNavigation from '../../MenuNavigation';
import styles from './Single.module.css';
import ItemTabs from '../../ItemTabs';
import BYOContent1 from './BYOContent1';
import BYOContent2 from './BYOContent2';
import Parallax from './Parallax';
import OrderBtn from '@/app/components/OrderBtn';
import Link from 'next/link';

const postType = 'build-your-own';
export async function generateMetadata({ params }) {
  const postId = params.slug;
  const metadata = await fetchCPTMetadataBySlug(postId, postType);

  const metadataBase = METADATABASE_API_URL;

  return {
    metadataBase,
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      images: metadata.ogImage ? [{ url: metadata.ogImage }] : []
    },
    jsonld: metadata.yoastMetadata?.schema?.["@graph"]
  };
}

export default async function Page({ params }) {

  let data;
  let post;
  let calloutImage;

  try {
    data = await fetchPageData(91);
    post = await fetchCPTBySlug(params.slug, postType);
    calloutImage = data?.acf.mobile_app_background_image ? await fetchACFImage(data.acf.mobile_app_background_image).catch(e => {
      console.error(`Error fetching callout image: ${e}`);
      return null;
    }) : null;
    data = { ...data, calloutImage };
    post = { ...post };

  } catch (error) {
    console.error("Error fetching post data:", error);
  }


  const content = [
    { id: 'tab1', component: <BYOContent1 data={data} post={post} /> },
    { id: 'tab2', component: <BYOContent2 data={data} post={post} /> },
    // Add more content as needed
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    "@graph": [
      {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "url": `https://www.gosarpinos.com/menu/${post.slug}`,
        "name": "Sarpino\'s Pizzeria",
        "image": '/default-menu-image.svg',
        "description": "Sarpino's is your go-to for authentic Italian flavor and free delivery on gourmet pizzas, open late into the night when, and where, you need it most.",
        "address": {
          '@type': 'PostalAddress',
          "streetAddress": '200 Tri State International, Suite 550',
          "addressLocality": 'Lincolnshire',
          "addressRegion": 'IL',
          "postalCode": '60069',
          "addressCountry": 'US'
        },
        "telephone": '(847) 374-6300',
        "email": 'us@gosarpinos.com',
        "servesCuisine": "Italian",
        "currenciesAccepted": 'USD',
        "paymentAccepted": 'Cash, Credit Card',
        "priceRange": '$$',
        "logo": './sarpinos-logo.svg',
        "bestRating": "5",
        "ratingExplanation": "Many 5 star reviews have been captured with the ReviewTracker app",
        "hasMenu": {
          "@type": "Menu",
          "hasMenuSection": {
            "@type": "MenuSection",
            "name": "Build Your Own",
            "description": "When you know what you want, you need to create it your way.",
            "hasMenuItem": {
              "@type": "MenuItem",
              "name": post?.title?.rendered,
              "description": post?.acf?.caption || post?.excerpt?.rendered || '',
            }
          },
          "inLanguage": "English"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Gourmet Pizza Open Late Near You | Sarpino\'s Pizzeria",
            "item": "https://gosarpinos.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": `Create Your Own | Sarpino\'s Pizzeria`,
            "item": `https://www.gosarpinos.com/menu/${postType}`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": `${post.title.rendered} | Sarpino\'s Pizzeria`,
            "item": `https://www.gosarpinos.com/menu/${postType}/${post.slug}`
          }
        ]
      }
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="cream-color">
        <MenuNavigation
          mode="dark"
          activeItem="build-your-own" />
        <section className="viewport innermenu">
          <div className={`page-container ${styles.container}`}>
            <div className={styles.content}>
              <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: post.title.rendered || '' }} />
              <div dangerouslySetInnerHTML={{ __html: post.content.rendered || '' }} />

              <ItemTabs
                bkgVariant="green"
                tab1="Ingredients"
                tab2="Sauces"
                content={content} />
              <div className="display-flex" style={{ alignItems: 'center' }}>
                <OrderBtn category={post.type} />
                {data.acf?.allergens_list?.url && (
                  <Link href={data.acf.allergens_list.url} target='_blank' className='text-link' style={{ paddingLeft: '2rem', color: 'white' }}>
                    Allergen Info
                  </Link>
                )}
              </div>
            </div>
          </div>
          <Parallax />
        </section>
        <CalloutMobileApp calloutImage={calloutImage} />
      </div>
    </>
  );
}

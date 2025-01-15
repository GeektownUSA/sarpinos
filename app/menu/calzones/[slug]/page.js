// app/menu/calzones/[slug]/page.js
import { fetchCPTMetadataBySlug, fetchCPTBySlug, fetchACFImage, fetchPageData } from '@/app/lib/utils';
import { METADATABASE_API_URL } from '@/app/lib/constants';
import Image from 'next/image';
import MenuNavigation from '../../MenuNavigation';
import OrderBtn from '@/app/components/OrderBtn';
import ShareToggle from '@/app/components/ShareToggle';
import ItemTabs from '../../ItemTabs';
import CalloutMobileApp from '@/app/components/CalloutMobileApp';
import ItemInfo from '../../ItemInfo';
import ItemAllergens from '../../ItemAllergens';
import styles from './Single.module.css';

const pageId = 94;
const postType = 'calzones';
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

  let post;
  let mainImage;
  let pageData;
  let calloutImage;

  try {
    post = await fetchCPTBySlug(params.slug, postType);

    mainImage = post?.acf.main_image ? await fetchACFImage(post?.acf.main_image).catch(e => {
      console.error(`Error fetching main image: ${e}`);
      return null;
    }) : null;

    post = { ...post, mainImage };

  } catch (error) {
    console.error("Error fetching post data:", error);
    // Handle the error appropriately
  }
  try {
    pageData = await fetchPageData(pageId);
    calloutImage = pageData?.acf.mobile_app_background_image ? await fetchACFImage(pageData.acf.mobile_app_background_image).catch(e => {
      console.error(`Error fetching callout image: ${e}`);
      return null;
    }) : null;

  } catch (error) {
    console.error("Error fetching callout image:", pageData.acf.mobile_app_background_image);
    throw error;
  }


  const content = [
    { id: 'tab1', component: <ItemInfo post={post} /> },
    { id: 'tab2', component: <ItemAllergens post={post} /> },
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
        "image": mainImage ? mainImage.sourceUrl : '/default-menu-image.svg',
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
            "name": postType,
            "description": post?.acf?.caption || post?.excerpt?.rendered || '',
            "image": mainImage ? mainImage.sourceUrl : '/default-menu-image.svg',
            "hasMenuItem": {
              "@type": "MenuItem",
              "name": post?.title?.rendered,
              "description": post?.acf?.caption || post?.excerpt?.rendered || '',
              "mainEntityOfPage": `https://www.gosarpinos.com/menu/${postType}`,
              "nutrition": {
                "@type": "NutritionInformation",
                "calories": post.acf.nutritional_info_by_size[0].total_calories ? `${post.acf.nutritional_info_by_size[0].total_calories} calories` : 'Not available',
                "fatContent": post.acf.nutritional_info_by_size[0].total_fat ? `${post.acf.nutritional_info_by_size[0].total_fat} grams` : 'Not available',
                "transFatContent": post.acf.nutritional_info_by_size[0].trans_fat ? `${post.acf.nutritional_info_by_size[0].trans_fat} grams` : 'Not available',
                "cholesterolContent": post.acf.nutritional_info_by_size[0].cholesterol ? `${post.acf.nutritional_info_by_size[0].cholesterol} mg` : 'Not available',
                "sodiumContent": post.acf.nutritional_info_by_size[0].sodium ? `${post.acf.nutritional_info_by_size[0].sodium} mg` : 'Not available',
                "carbohydrateContent": post.acf.nutritional_info_by_size[0].total_carbohydrate ? `${post.acf.nutritional_info_by_size[0].total_carbohydrate} grams` : 'Not available',
                "fiberContent": post.acf.nutritional_info_by_size[0].fiber ? `${post.acf.nutritional_info_by_size[0].fiber} grams` : 'Not available',
                "sugarContent": post.acf.nutritional_info_by_size[0].sugar ? `${post.acf.nutritional_info_by_size[0].sugar} grams` : 'Not available',
                "proteinContent": post.acf.nutritional_info_by_size[0].protein ? `${post.acf.nutritional_info_by_size[0].protein} grams` : 'Not available'
              },
              "suitableForDiet": "https://schema.org/GlutenFreeDiet"
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
            "name": `Calzones | Sarpino\'s Pizzeria`,
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
          activeItem="calzones" />
        <section className="viewport innermenu">
          <div className="page-container">
            <div className="responsive-column-container">
              <div>
                <Image
                  src={mainImage ? mainImage.sourceUrl : '/default-menu-image.svg'}
                  alt={mainImage ? mainImage.altText : 'calzones'}
                  width={612}
                  height={678}
                  className={styles.image}
                />
              </div>
              <div>
                <ShareToggle post={post} />
                <h1 dangerouslySetInnerHTML={{ __html: post?.title?.rendered || '' }} />
                <div dangerouslySetInnerHTML={{ __html: post?.content?.rendered || '' }} />
                <OrderBtn category={post.type} />
                <ItemTabs
                  tab1="Nutritional Info"
                  tab2="Allergens"
                  content={content} />
              </div>
            </div>
          </div>
        </section>
        <CalloutMobileApp calloutImage={calloutImage} calloutItem={postType} />
      </div>
    </>
  );
}

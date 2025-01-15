// /menu/pizza/page.js
import { METADATABASE_API_URL } from '@/app/lib/constants';
import { fetchMetadata, fetchPageData, fetchCPTData, fetchACFImage } from '@/app/lib/utils';
import MenuNavigation from '../MenuNavigation';
import MenuHeader from '../MenuHeader';
import MenuContent from '../MenuContent';
import CalloutMenu from '@/app/components/CalloutMenu';
import CalloutMobileApp from '@/app/components/CalloutMobileApp';

const pageId = 34;
const postType = ['pizza'];
export async function generateMetadata() {
  const metadata = await fetchMetadata(pageId);

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

export default async function Page() {


  let data;
  let posts;
  let heroImage;
  let calloutImage;
  try {
    data = await fetchPageData(pageId);
    posts = await fetchCPTData(postType);
    try {
      if (data.acf && data.acf.hero_image) {
        heroImage = await fetchACFImage(data.acf.hero_image);
      }
    } catch (error) {
      console.error("Error fetching hero image:", data.acf.hero_image);
    }

    try {
      if (data.acf && data.acf.mobile_app_background_image) {
        calloutImage = await fetchACFImage(data.acf.mobile_app_background_image);
      }
    } catch (error) {
      console.error("Error fetching callout image:", data.acf.mobile_app_background_image);
    }
  } catch (error) {
    console.error("Error in Page component:", error);
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    "@graph": [
      {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "url": `https://www.gosarpinos.com/menu/sarpinos-specialty-pizza`,
        "image": heroImage ? heroImage.sourceUrl : '/default-menu-image.svg',
        "name": "Sarpino\'s Pizzeria",
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
            "name": "Specialty Pizzas",
            "description": data.excerpt.rendered || '',
            "image": heroImage ? heroImage.sourceUrl : '/default-menu-image.svg'
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
            "name": `${data.yoast_head_json.title} | Sarpino\'s Pizzeria`,
            "item": `https://www.gosarpinos.com/menu/sarpinos-specialty-pizza/${data.slug}`
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
      <MenuNavigation
        mode="light"
        activeItem="pizza" />
      <section className="viewport innermenu">
        <div className="page-container cream-color">
          <MenuHeader
            featuredImage={heroImage ? heroImage.sourceUrl : '/default-menu-image.svg'}
            featuredImageAlt={heroImage?.altText || 'fresh pizza'}
            pageTitle={data.title.rendered}
            pageContent={data.content.rendered}
            category="pizza"
          />
          {/* Render the menu posts */}
          <MenuContent
            posts={posts}
            postTypeSlug="sarpinos-specialty-pizza"
            categoryTitle="Sort Specialty Pizzas"
          />
        </div>
      </section>

      <CalloutMenu />
      <CalloutMobileApp calloutImage={calloutImage} />
    </>
  );
}

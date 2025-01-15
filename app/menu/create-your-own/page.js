import { METADATABASE_API_URL } from '@/app/lib/constants';
import { fetchMetadata, fetchPageData, fetchCPTData, fetchACFImage } from '@/app/lib/utils';
import MenuNavigation from '../MenuNavigation';
import MenuHeader from '../MenuHeader';
import MenuContentCYO from '../MenuContentCYO';
import CalloutMenu from '@/app/components/CalloutMenu';
import CalloutMobileApp from '@/app/components/CalloutMobileApp';

const pageId = 91;
const postType = ['build-your-own'];
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

export default async function Page({ params }) {
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
        "url": `https://www.gosarpinos.com`,
        "name": "Sarpino's Pizzeria",
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
      },
      {
        '@type': 'Menu',
        "name": `Build Your Own | Sarpino\'s Pizzeria`,
        "url": `https://www.gosarpinos.com/menu/${data.slug}`,
        "image": heroImage?.sourceUrl || '/default-menu-image.svg',
        "description": data.yoast_head_json.description || data.excerpt.rendered,
        "servesCuisine": "Italian",
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
            "name": `Build Your Own | Sarpino\'s Pizzeria`,
            "item": `https://www.gosarpinos.com/menu/${postType}`
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
        activeItem="build-your-own" />
      <section className="viewport innermenu">
        <div className="page-container cream-color">
          <MenuHeader
            featuredImage={heroImage?.sourceUrl || '/default-menu-image.svg'}
            featuredImageAlt={heroImage?.altText || 'build your own fresh pizza'}
            pageTitle={data.title.rendered}
            pageContent={data.content.rendered}
            category="build-your-own"
          />
          {/* Render the menu posts */}
          <MenuContentCYO
            posts={posts}
            postTypeSlug={postType} />
        </div>
      </section>

      <CalloutMenu />
      <CalloutMobileApp calloutImage={calloutImage} />
    </>
  );
}

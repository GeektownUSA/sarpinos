import dynamic from 'next/dynamic';
import { METADATABASE_API_URL } from '@/app/lib/constants';
import { fetchMetadata, fetchCPTData, fetchPageData } from '@/app/lib/utils'; // Adjust the path as necessary
// import MapHero from './Map';
const DynamicMap = dynamic(() => import('./Map'));

const pageId = 214;
const postType = ['locations'];
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
  let posts;
  let data;
  try {
    posts = await fetchCPTData(postType);
    data = await fetchPageData(pageId);

  } catch (error) {
    console.error("Error in Page component:", error);
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    "@graph": [
      {
        '@type': 'FoodEstablishment',
        name: 'Sarpino\'s Pizzeria',
        url: 'https://www.gosarpinos.com/',
        image: './default-image.jpg',
        description: data.yoast_head_json.description,
        address: {
          '@type': 'PostalAddress',
          streetAddress: '200 Tri State International, Suite 550',
          addressLocality: 'Lincolnshire',
          addressRegion: 'IL',
          postalCode: '60069',
          addressCountry: 'US'
        },
        telephone: '(847) 374-6300',
        email: 'us@gosarpinos.com',
        servesCuisine: "Italian",
        currenciesAccepted: 'USD',
        paymentAccepted: 'Cash, Credit Card',
        priceRange: '$$',
        logo: './sarpinos-logo.svg',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.5',
          reviewCount: '250'
        },
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
            "name": "Find Pizza Delivery Near You | Sarpino\'s Pizzeria",
            "item": "https://gosarpinos.com/pizza-delivery"
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
      <DynamicMap posts={posts} data={data} />
    </>
  );
}

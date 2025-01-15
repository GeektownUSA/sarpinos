// /menu/pizza/page.js
import { METADATABASE_API_URL } from '@/app/lib/constants';
import { fetchMetadata, fetchPageData, fetchCPTData, fetchACFImage } from '@/app/lib/utils';
import MenuNavigation from './MenuNavigation';
import MenuHeader from './MenuHeader';
import MenuContent from './MenuContent';
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

export default async function Page({ params }) {

  let data;
  let posts;
  let heroImage;
  try {
    data = await fetchPageData(pageId);
    posts = await fetchCPTData(postType);
    try {
      heroImage = await fetchACFImage(data.acf.hero_image);
    } catch (error) {
      console.error("Error fetching hero image:", data.acf.hero_image);
      throw error;
    }
  } catch (error) {
    console.error("Error in Page component:", error);
  }
  const jsonLd = {
    '@context': 'https://schema.org',
    "@graph": [
      {
        '@type': 'Menu',
        "name": `Full Menu | Sarpino\'s Pizzeria`,
        "url": 'https://www.gosarpinos.com/menu/sarpinos-specialty-pizza',
        "image": heroImage?.sourceUrl,
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
            "name": `${data.yoast_head_json.title} | Sarpino\'s Pizzeria`,
            "item": `https://www.gosarpinos.com/menu/${data.slug}`
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
            featuredImage={heroImage?.sourceUrl || '/default-menu-image.svg'}
            featuredImageAlt={heroImage?.altText || 'fresh pizza'}
            pageTitle={data.title.rendered}
            pageContent={data.content.rendered}
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
      <CalloutMobileApp />
    </>
  );
}

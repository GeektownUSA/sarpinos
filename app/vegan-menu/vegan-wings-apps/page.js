// /menu/desserts/page.js
import { METADATABASE_API_URL } from '@/app/lib/constants';
import { fetchMetadata, fetchPageData, fetchCPTData, fetchACFImage } from '@/app/lib/utils';
import MenuNavigation from '../MenuNavigation';
import MenuHeader from '../../menu/MenuHeader';
import PostContent from '../../menu/PostContent';
import CalloutMenu from '@/app/components/CalloutMenu';
import CalloutMobileApp from '@/app/components/CalloutMobileApp';

const pageId = 1018;
const postType = ['wings-apps'];
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

  return (
    <>
      <MenuNavigation
        mode="light"
        activeItem="wings-apps" />
      <section className="viewport innermenu">
        <div className="page-container cream-color">
          <MenuHeader
            featuredImage={heroImage?.sourceUrl || '/default-menu-image.svg'}
            featuredImageAlt={heroImage?.altText || 'fresh vegan wings and apps'}
            pageTitle={data.title.rendered}
            pageContent={data.content.rendered}
            category="Vegan"
          />
          {/* Render the menu posts */}
          <PostContent
            posts={posts}
            postTypeSlug="vegan-wings-apps"
            menuSlug="vegan-menu"
            filterPostsBy='Vegan' />
        </div>
      </section>

      <CalloutMenu isVegan={true} />
      <CalloutMobileApp calloutImage={calloutImage} calloutItem={"vegan appetizers"} />
    </>
  );
}

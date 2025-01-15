// app/menu/pastas/[slug]/page.js
import { fetchCPTMetadataBySlug, fetchCPTBySlug, fetchACFImage, fetchPageData } from '@/app/lib/utils';
import { METADATABASE_API_URL } from '@/app/lib/constants';
import Image from 'next/image';
import MenuNavigation from '../MenuNavigation';
import OrderBtn from '@/app/components/OrderBtn';
import ShareToggle from '@/app/components/ShareToggle';
import CalloutMobileApp from '@/app/components/CalloutMobileApp';
import ItemTabs from '../../menu/ItemTabs';
import ItemInfo from '../../menu/ItemInfo';
import ItemAllergens from '../../menu/ItemAllergens';
import styles from './Single.module.css';

const pageId = 34;
const postType = 'pizza';
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

  return (
    <>
      <div className="cream-color">
        <MenuNavigation
          mode="dark"
          activeItem="pizza" />
        <section className="viewport innermenu">
          <div className="page-container">
            <div className="responsive-column-container">
              <div>
                <Image
                  src={mainImage ? mainImage.sourceUrl : '/default-menu-image.svg'}
                  alt={mainImage ? mainImage.altText : 'vegan pizza'}
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
        <CalloutMobileApp calloutImage={calloutImage} />
      </div>
    </>
  );
}

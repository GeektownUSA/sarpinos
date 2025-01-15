import { METADATABASE_API_URL } from '@/app/lib/constants';
import { fetchMetadata, fetchPageData, fetchACFImage } from '@/app/lib/utils';
import Hero from './Hero';
import Earn from './Earn';
import CalloutLoyalty from '@/app/components/CalloutLoyalty';
import Breadcrumbs from '@/app/components/Breadcrumbs';

const pageId = 111;
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
  let mainImage;
  let earnImages;
  let rewardsPointsImage;
  let rewardsDiscountImage;
  let rewardsPizzaImage;
  let bkgImage;

  try {
    data = await fetchPageData(pageId);
    // Fetch hero image
    mainImage = data?.acf.main_image ? await fetchACFImage(data?.acf.main_image).catch(e => {
      console.error(`Error fetching main image: ${e}`);
      return null;
    }) : null;

    // Fetch images for earn points
    earnImages = await Promise.all(data?.acf.earn_points.map(async point => {
      return fetchACFImage(point.graphic).catch(e => {
        console.error(`Error fetching earn point image: ${e}`);
        return null;
      });
    }));

    // Fetch rewards images
    rewardsPointsImage = data?.acf.rewards_points ? await fetchACFImage(data?.acf.rewards_points).catch(e => {
      console.error(`Error fetching rewards points image: ${e}`);
      return null;
    }) : null;

    rewardsDiscountImage = data?.acf.rewards_discount ? await fetchACFImage(data?.acf.rewards_discount).catch(e => {
      console.error(`Error fetching rewards discount image: ${e}`);
      return null;
    }) : null;

    rewardsPizzaImage = data?.acf.rewards_pizza ? await fetchACFImage(data?.acf.rewards_pizza).catch(e => {
      console.error(`Error fetching rewards pizza image: ${e}`);
      return null;
    }) : null;

    // Fetch Order Now Background Image
    bkgImage = data?.acf.order_now_background ? await fetchACFImage(data?.acf.order_now_background).catch(e => {
      console.error(`Error fetching rewards bkg image: ${e}`);
      return null;
    }) : null;

    data = { ...data, mainImage, earnImages, rewardsPointsImage, rewardsDiscountImage, rewardsPizzaImage, bkgImage };

  } catch (error) {
    console.error("Error in Page component:", error);
  }

  return (
    <div className='cream-color'>
      <Breadcrumbs style="nonmenu" />
      <section className="viewport" style={{ marginTop: '-100px' }}>
        <div className="page-container" style={{ paddingTop: 0 }}>
          <Hero
            data={data}
            mainImage={mainImage} />
        </div>
      </section>
      <section className="viewport" style={{ overflow: 'hidden' }}>
        <div className="page-container" style={{ paddingTop: 0 }}>
          <Earn
            data={data}
            earnImages={earnImages}
            rewardsPointsImage={rewardsPointsImage}
            rewardsDiscountImage={rewardsDiscountImage}
            rewardsPizzaImage={rewardsPizzaImage} />
        </div>
      </section >
      <CalloutLoyalty data={data} bkgImage={bkgImage} />
    </div >
  );
}
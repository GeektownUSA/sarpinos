import { METADATABASE_API_URL } from '@/app/lib/constants';
import { fetchMetadata, fetchPageData, fetchACFImage } from '@/app/lib/utils'; // Adjust the path as necessary
import Hero from './Hero';
import Columns from './Columns';
import FullWidth from './FullWidth.js';
import Experience from './Experience';
import Breadcrumbs from '@/app/components/Breadcrumbs';

const pageId = 60;
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
  let fullWidthImage;

  try {
    data = await fetchPageData(pageId);
    fullWidthImage = data.acf && data.acf.full_width_background_image ? await fetchACFImage(data.acf.full_width_background_image) : null;
  } catch (error) {
    console.error("Error in Page component:", error);
  }

  return (
    <>
      <div className="cream-color">
        <Breadcrumbs style="nonmenu" />
        <Hero data={data} />
        <Columns data={data} />
        <FullWidth data={data} fullWidthImage={fullWidthImage} />
        <Experience data={data} />
      </div>
    </>
  );
}
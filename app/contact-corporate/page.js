import { METADATABASE_API_URL } from '@/app/lib/constants';
import { fetchMetadata, fetchCPTData, fetchPageData } from '@/app/lib/utils'; // Adjust the path as necessary
import Hero from './Hero';
import How from './How';
//import Form from './Form';
import Info from './Info';
import CalloutCatering from '@/app/components/CalloutCatering';
//import WhySarpinos from './WhySarpinos';
//import FAQs from './FAQs';
import Breadcrumbs from '@/app/components/Breadcrumbs';

const pageId = 2020;
const postType = 'locations';
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

  try {
    data = await fetchPageData(pageId);
    posts = await fetchCPTData([postType]);

  } catch (error) {
    console.error("Error in Page component:", error);
  }

  return (
    <>
      <div className="cream-color">
        <Breadcrumbs style="nonmenu" />
        <section className="viewport">
          <div className="page-container">
            <Hero
              featuredImage={data._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-image.jpg'}
              featuredImageAlt={data._embedded?.['wp:featuredmedia']?.[0]?.alt_text || 'fresh pizza'}
              data={data}
            />
          </div>
        </section>
        <section className="viewport half-darkred-color">
          <div className="page-container green-gradient">
            <How data={data} />
          </div>
        </section>
        {/*<section className="viewport red-gradient">
          <div className="page-container">
            <Form data={data} posts={posts} />
          </div>
        </section>*/}
        <section className="viewport cream-color">
          <div className="page-container">
            <Info data={data} />
          </div>
        </section>
        <CalloutCatering />
        {/*<WhySarpinos />
        <section className="viewport cream-color">
          <FAQs data={data} />
        </section>*/}
      </div>
    </>
  );
}
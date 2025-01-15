// /menu/national-specials/page.js
import { METADATABASE_API_URL } from '@/app/lib/constants';
import { fetchMetadata, fetchPageData, fetchCPTData } from '@/app/lib/utils';
import MenuNavigation from '../MenuNavigation';
import SpecialsContainer from './SpecialsContainer';
import CalloutMenu from '@/app/components/CalloutMenu';
import CalloutMobileApp from '@/app/components/CalloutMobileApp';

const pageId = 88;
const postType = ['specials'];
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

  try {
    data = await fetchPageData(pageId);
    posts = await fetchCPTData(postType);

  } catch (error) {
    console.error("Error in Page component:", error);
  }

  return (
    <>
      <MenuNavigation
        mode="light"
        activeItem="specials" />
      <SpecialsContainer data={data} posts={posts} postType={postType} />
      <CalloutMenu />
      <CalloutMobileApp />
    </>
  );
}

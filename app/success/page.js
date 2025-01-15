import { METADATABASE_API_URL } from '@/app/lib/constants';
import { fetchMetadata } from '@/app/lib/utils'; // Adjust the path as necessary
import Link from 'next/link';
import styles from '../[slug]/Page.module.css';

export async function generateMetadata({ params }) {
  const pageId = params.pageId || 149; // default to 149 if no ID is provided
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

  return (
    <>
      <section className="viewport innerhero">
        <div className="page-container cream-color">
          <div className={`text-align-center ${styles.miscContent}`}>
            <h1 className="page-title">Welcome to the family!</h1>
            <p>Thank you for choosing Sarpino&apos;s.</p>
            <Link className="btn primary-btn" href="/"><span>GO TO THE HOMEPAGE</span></Link>

          </div>
        </div>
      </section>
    </>
  );
}
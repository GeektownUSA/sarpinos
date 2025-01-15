import { METADATABASE_API_URL } from '@/app/lib/constants';
import { fetchMiscMetadata, fetchMiscData } from '@/app/lib/utils'; // Adjust the path as necessary
import Link from 'next/link';
import styles from './Page.module.css';

export async function generateMetadata({ params }) {
  const metadata = await fetchMiscMetadata(params.slug);

  if (!metadata) {
    // Return default metadata if no page matches the slug
    return {
      metadataBase: METADATABASE_API_URL,
      title: 'Sarpino\'s Pizzeria',
      description: 'Sarpino\'s is your go-to for authentic Italian flavor and free delivery on gourmet pizzas, open late into the night when, and where, you need it most.',
      openGraph: {
        images: []
      },
    };
  }

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

  try {
    data = await fetchMiscData(params.slug);
  } catch (error) {
    console.error("Error in Page component:", error);
  }
  // If data is null or undefined, render a 404 page
  if (!data) {
    return <section className="viewport innerhero">
      <div className="page-container cream-color">
        <div className={`text-align-center ${styles.miscContent}`}>
          <h1 className={styles.title}>SO SORRY!</h1>
          <p>The page you&apos;re looking for cannot be found.</p>
          <Link className="btn primary-btn" href="/"><span>GO TO THE HOMEPAGE</span></Link>
        </div>
      </div>
    </section>;
  }
  return (
    <>
      <section className="viewport innerhero">
        <div className="page-container cream-color">
          <div className={styles.miscContent}>
            <h1 className="page-title">{data?.title?.rendered || ''}</h1>
            <div dangerouslySetInnerHTML={{ __html: data?.content?.rendered || '' }} />
          </div>
        </div>
      </section>
    </>
  );
}
import { METADATABASE_API_URL } from '@/app/lib/constants';
import { fetchMetadata, fetchCPTData, fetchPageData } from '@/app/lib/utils'; // Adjust the path as necessary
import Hero from './Hero';
import Form from './Form';
import CalloutBanner from './CalloutBanner';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import Head from 'next/head'; // Import Head from Next.js

const pageId = 2020;
const postType = 'locations';

// Static schema for the employment page (Organization schema)
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Sarpino's USA, Inc.",
  "legalName": "Sarpino's USA, Inc.",
  "url": "https://www.gosarpinos.com/",
  "logo": "https://www.gosarpinos.com/wp-content/uploads/2023/01/sarpinos-logo.png",
  "description": "Sarpino’s USA, Inc. is the U.S. corporate office for the Sarpino’s Pizzeria restaurant chain, offering gourmet Italian‑style pizza delivery and take‑out.",
  "founder": {
    "@type": "Person",
    "name": "Gerry Koutougos"
  },
  "foundingDate": "2001",
  "foundingLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Victoria",
      "addressRegion": "British Columbia",
      "addressCountry": "CA"
    }
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "200 Tri State International, Suite 550",
    "addressLocality": "Lincolnshire",
    "addressRegion": "IL",
    "postalCode": "60069",
    "addressCountry": "US"
  },
  "telephone": "+1-847-374-6300",
  "email": "us@gosarpinos.com",
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "telephone": "+1-847-374-6300",
      "email": "us@gosarpinos.com"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/sarpinospizza",
    "https://www.instagram.com/sarpinosusa",
    "https://twitter.com/sarpinospizza",
    "https://www.linkedin.com/company/sarpinos-international-usa"
  ],
  "identifier": [
    {
      "@type": "PropertyValue",
      "propertyID": "DUNS",
      "value": "IF_AVAILABLE_DUNS_NUMBER"
    }
  ],
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "value": 100
  }
};

// This function is used to fetch metadata (in case you need to fetch something dynamic from WordPress)
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
    jsonld: organizationSchema // Use your static schema
  };
}

export default async function Page({ params }) {
  let data;
  let posts;

  try {
    // Fetch the page data and CPT data
    data = await fetchPageData(pageId);
    posts = await fetchCPTData([postType]);
  } catch (error) {
    console.error("Error in Page component:", error);
  }

  // Call generateMetadata to get the schema, even though it's static
  const schema = await generateMetadata();

  return (
    <>
      <script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
		/>

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

        <section className="viewport form-absolute">
          <div className="page-container red-gradient ">
            <Form data={data} posts={posts} />
          </div>
        </section>

        <CalloutBanner data={data} />
      </div>
    </>
  );
}

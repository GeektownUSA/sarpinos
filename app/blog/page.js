// about.blog.page.js
import { METADATABASE_API_URL } from '@/app/lib/constants';
import { fetchMetadata, fetchPageData, fetchPostData } from '@/app/lib/utils'; // Adjust the path as necessary
import Link from 'next/link';
import BlogFeatured from './BlogFeatured';
import BlogContent from './BlogContent';
import Breadcrumbs from '@/app/components/Breadcrumbs';

const pageId = 278;
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
    posts = await fetchPostData();
  } catch (error) {
    console.error("Error in Page component:", error);
  }

  // Sort posts by date
  const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Get the most recent post (which is the featured post)
  const featuredPost = sortedPosts[0];

  // Filter out the featured post from all posts to get non-featured posts
  const nonFeaturedPosts = posts.filter(post => post !== featuredPost);
  return (
    <>
      <div className="cream-color">
        <Breadcrumbs style="nonmenu" />
        <section className="viewport">
          <div className="page-container">
            <div className="content text-align-center">
              <div dangerouslySetInnerHTML={{ __html: data?.content.rendered || '' }} />
            </div>
            {/* Render the featured post */}
            {featuredPost && (
              <Link href={`/blog/${featuredPost.slug}`}>
                <BlogFeatured
                  post={featuredPost}
                  featuredImage={featuredPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-image.jpg'}
                />
              </Link>
            )}
            <BlogContent initialPosts={posts} />
          </div>
        </section>
      </div>
    </>
  );
}

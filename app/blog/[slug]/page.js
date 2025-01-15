import { METADATABASE_API_URL } from '@/app/lib/constants';
import { fetchMetadataPost, fetchPostBySlug, getCategoryNamesByIds, fetchRelatedPosts } from '@/app/lib/utils';
import Image from 'next/image';
import BlogRelated from '../BlogRelated';
import ShareThis from '@/app/components/ShareThis';
import styles from './Single.module.css';
import Breadcrumbs from '@/app/components/Breadcrumbs';


export async function generateMetadata({ params }) {
  const postId = params.slug;
  const metadata = await fetchMetadataPost(postId);

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
  let relatedPosts = [];

  try {
    post = await fetchPostBySlug(params.slug);
  } catch (error) {
    console.error("Error fetching post data:", error);
    // Handle the error appropriately
  }

  let categoryNames = [];
  if (post && post.categories) {
    categoryNames = await getCategoryNamesByIds(post.categories);
  }

  try {
    post = await fetchPostBySlug(params.slug);

    if (post && post.categories) {
      // Fetch category names
      categoryNames = await getCategoryNamesByIds(post.categories);

      // Fetch related posts for the first category
      const fetchedRelatedPosts = await fetchRelatedPosts(post.categories[0]);
      if (Array.isArray(fetchedRelatedPosts)) {  // Ensure fetchedRelatedPosts is an array
        relatedPosts = fetchedRelatedPosts;
        // const featuredImageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-image.jpg';
      }
    }
  } catch (error) {
    console.error("Error fetching post data:", error);
  }
  const featuredImageUrl = relatedPosts._embedded?.['wp:featuredmedia']?.source_url || '/default-image.jpg';


  // Return JSX with the post data
  return (
    <div className="cream-color">
      <Breadcrumbs style="nonmenu" />
      <section className="viewport">
        <div className="page-container">
          <div className="text-align-center">
            <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: post?.title?.rendered || '' }} />
            <p className={styles.date}>
              {post?.date && new Date(post.date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            {post?.featuredImage && (
              <Image
                src={post.featuredImage}
                alt={post.title.rendered}
                width={1080}
                height={487}
                className={styles.image}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
          </div>
          {/* Post Content */}
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post?.content?.rendered || '' }}
          />
          {/* Share This Post */}
          <ShareThis
            headline="Share This Story"
            post={post}
          />
          {/* Related Posts */}
          <BlogRelated
            relatedPosts={relatedPosts} />
        </div>
      </section>
    </div>
  );
}

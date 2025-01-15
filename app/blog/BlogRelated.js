import Link from "next/link";
import BlogCard from './BlogCard';
import styles from './[slug]/Single.module.css';

const BlogRelated = ({ relatedPosts }) => {
  return (
    <>
      {relatedPosts && (
        <div className={styles.relatedPosts}>
          <h3>Related Posts</h3>
          <div className="responsive-equal-height-container">
            {relatedPosts.slice(0, 3).map((relatedPost, index) => (
              <Link key={index} href={`/blog/${relatedPost.slug}`} style={{ display: 'flex' }}>
                <BlogCard
                  post={relatedPost}
                  featuredImage={relatedPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-image.jpg'} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default BlogRelated;
import Image from 'next/image';
import styles from './BlogFeatured.module.css';

const BlogFeatured = ({ post, featuredImage }) => {

  return (
    <>
      <div className={styles.featuredContainer}>
        {featuredImage && (
          <Image
            alt={post.title.rendered}
            src={featuredImage}
            width={500}
            height={300}
            className={styles.image}
          />
        )}
        <div className={styles.content}>
          <p className={styles.date}>
            {post.date && new Date(post.date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: post?.title?.rendered }} />
          <p
            className={styles.excerpt}
            dangerouslySetInnerHTML={{
              __html: post.excerpt.rendered.length > 200
                ? post.excerpt.rendered.substring(0, 200) + '...'
                : post.excerpt.rendered || ''
            }}
          />
        </div>
      </div>
    </>
  );
}

export default BlogFeatured;
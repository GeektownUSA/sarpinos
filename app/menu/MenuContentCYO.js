'use client';
import React, { useState, useEffect, useCallback } from 'react';
import MenuCard from './MenuCard';
import { fetchACFImage } from '@/app/lib/utils';

const MenuContentCYO = ({ posts, postTypeSlug }) => {
  const [visiblePosts, setVisiblePosts] = useState([]);

  // Fetch images for posts
  const fetchImages = useCallback(async (postsToProcess) => {
    return await Promise.all(postsToProcess.map(async post => {
      const mainImage = post.acf.main_image ? await fetchACFImage(post.acf.main_image).catch(e => {
        console.error(`Error fetching main image: ${e}`);
        return null;
      }) : null;
      const hoverImage = post.acf.hover_image ? await fetchACFImage(post.acf.hover_image).catch(e => {
        console.error(`Error fetching hover image: ${e}`);
        return null;
      }) : null;

      return { ...post, mainImage, hoverImage };
    }));
  }, []);

  useEffect(() => {
    // Fetch images for all posts
    fetchImages(posts).then(postsWithImages => {
      setVisiblePosts(postsWithImages);
    });
  }, [posts, fetchImages]);

  return (
    <div className="responsive-equal-height-container fade-in" style={{ marginBottom: '1rem' }}>
      {visiblePosts.map((post, index) => (
        <MenuCard
          key={index}
          post={post}
          postTypeSlug={postTypeSlug}
          hoverImage={post.hoverImage ? post.hoverImage.sourceUrl : null}
          hoverAlt={post.hoverImage ? post.hoverImage.altText : ''}
          featuredImage={post.mainImage ? post.mainImage.sourceUrl : '/default-menu-image.svg'}
          featuredAlt={post.mainImage ? post.mainImage.altText : ''}
        />
      ))}
    </div>
  );
};

export default MenuContentCYO;
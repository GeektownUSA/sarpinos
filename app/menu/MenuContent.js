'use client';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import MenuCard from './MenuCard';
import SortCategories from '@/app/components/SortCategories';
import { fetchACFImage } from '@/app/lib/utils';

// This component is used to include the SortCategories component that sorts post by category
const MenuContent = ({ posts, postTypeSlug, categoryTitle, filterPostsBy }) => {

  const [filteredPosts, setFilteredPosts] = useState(posts || []);
  const [categories, setCategories] = useState([]); // New state for categories
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Extract unique categories from posts
    const uniqueCategories = Array.from(new Set(posts.flatMap(post => post.acf.menu_category || [])));
    setCategories(uniqueCategories.map(category => ({ name: category, id: category })));

    // // If 'Specialty' category exists, set it as the selected category
    // if (uniqueCategories.includes('Specialty')) {
    //   setSelectedCategory('Specialty');
    // }
  }, [posts]);

  // Fetch the first 6 images for posts
  const fetchImages = useCallback(async (postsToProcess, numPosts) => {
    let filterPosts = postsToProcess.slice(0, numPosts); // Only process the first 6 posts
    if (filterPostsBy === 'Vegan' || filterPostsBy === 'Gluten Free') {
      filterPosts = filterPosts.filter(post => post.acf.menu_category?.includes(filterPostsBy));
    }
    return await Promise.all(filterPosts.map(async post => {
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
  }, [filterPostsBy]);

  useEffect(() => {
	  // Filter posts based on selected category
	  const filtered = selectedCategory === `All`
		? posts
		: posts.filter(post => post.acf.menu_category?.includes(selectedCategory));

	  // Prioritize 'Popular' posts
	  const popularPosts = filtered.filter(post => post.acf.menu_category?.includes('Popular'));
	  const otherPosts = filtered.filter(post => !post.acf.menu_category?.includes('Popular'));

	  // Sort the posts alphabetically for categories other than 'All'
	  const sortedOtherPosts = otherPosts.sort((a, b) => {
		const titleA = a.title.rendered.toLowerCase();
		const titleB = b.title.rendered.toLowerCase();
		if (titleA < titleB) return -1;
		if (titleA > titleB) return 1;
		return 0;
	  });

	  // Randomize the order of popularPosts
	  const randomizedPopularPosts = popularPosts.sort(() => Math.random() - 0.5);

	  // Combine the posts
	  const combinedPosts = [...randomizedPopularPosts, ...sortedOtherPosts];

	  // Set filteredPosts to combinedPosts
	  setFilteredPosts(combinedPosts);

	  // Fetch images for the first 6 posts
	  fetchImages(combinedPosts.slice(0, 6)).then(posts => {
		setVisiblePosts(posts);
	  });
	}, [selectedCategory, posts, fetchImages, postTypeSlug]);


  // LAZY LOADING
  // load more posts as the user scrolls
  const [visiblePosts, setVisiblePosts] = useState([]);
  const loadMoreRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const currentRef = loadMoreRef.current;
    const observer = new IntersectionObserver((entries) => {
      const loadMorePosts = async () => {
        if (entries[0].isIntersecting && !isLoading) {
          setIsLoading(true); // Set loading to true when starting to fetch images
          if (filteredPosts.length > visiblePosts.length) {
            const nextPosts = filteredPosts.slice(visiblePosts.length, Math.min(visiblePosts.length + 6, filteredPosts.length));

            // Fetch images for the next set of posts
            const fetchedPosts = await fetchImages(nextPosts, nextPosts.length);
            setIsLoading(false); // Set loading to false when images have finished loading
            setVisiblePosts(prevPosts => [...prevPosts, ...fetchedPosts]);
          }
        }
      };
      loadMorePosts();
    }, { threshold: 1 });

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [filteredPosts, fetchImages, isLoading, visiblePosts.length]); // Add isLoading to the dependency array

  useEffect(() => {
    setVisiblePosts(filteredPosts.slice(0, Math.min(6, filteredPosts.length)));
  }, [filteredPosts]);

  return (
    <>
      {categories.length > 0 && <SortCategories
        selectionTitle={categoryTitle}
        postType={postTypeSlug}
        selectedCategory={selectedCategory}
        categories={categories}
        onCategorySelect={setSelectedCategory}
      />}

      <div className="responsive-equal-height-container fade-in" style={{ marginBottom: '1rem' }}>
        {visiblePosts.map((post, index) => {
          return (
            <MenuCard
              key={index}
              post={post}
              itemCategory={post.acf.menu_category ? post.acf.menu_category[0] : null}
              menuSlug={post.acf.menu_category?.includes('Vegan') ? 'vegan-menu' : null}
              postTypeSlug={postTypeSlug}
              hoverImage={post.hoverImage ? post.hoverImage.sourceUrl : null}
              hoverAlt={post.hoverImage ? post.hoverImage.altText : ''}
              featuredImage={post.mainImage ? post.mainImage.sourceUrl : '/default-menu-image.svg'}
              featuredAlt={post.mainImage ? post.mainImage.altText : ''}
            />
          )
        })}
        {filteredPosts.length > visiblePosts.length && <div ref={loadMoreRef} />}
      </div>
    </>
  );
};

export default MenuContent;

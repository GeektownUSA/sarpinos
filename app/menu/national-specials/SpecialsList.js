'use client';
import React, { useState, useEffect, useCallback } from 'react';
import SpecialsCard from './SpecialsCard';
import SortSpecials from './SortSpecials';

// This component is used to include the SortSpecials component that sorts post by category
const SpecialsList = ({ posts, postType, categoryTitle, filterPostsBy }) => {

  const [loading, setLoading] = useState(true);
  const [filteredPosts, setFilteredPosts] = useState(posts || []);
  const [categories, setCategories] = useState([]); // New state for categories
  const [selectedCategory, setSelectedCategory] = useState('All Specials');


  useEffect(() => {
    setLoading(true);
    if (posts) {
      setFilteredPosts(posts);
      setLoading(false);
    }
  }, [posts]);

  useEffect(() => {
    // Extract unique categories from posts
    const uniqueCategories = Array.from(new Set(posts.flatMap(post => post.acf.menu_category || [])));
    setCategories(uniqueCategories.map(category => ({ name: category, id: category })));
  }, [posts]);

  useEffect(() => {
    setLoading(true);
    // Filter posts based on selected category
    const filtered = selectedCategory === `All Specials`
      ? posts
      : posts.filter(post => post.acf.menu_category?.includes(selectedCategory));

    setFilteredPosts(filtered);
    setLoading(false);
  }, [selectedCategory, posts, postType]);

  return (
    <>
      {categories.length > 0 && <SortSpecials
        selectionTitle={categoryTitle}
        postType={postType}
        selectedCategory={selectedCategory}
        categories={categories}
        onCategorySelect={setSelectedCategory}
      />}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="responsive-equal-height-container fade-in" style={{ gridGap: '0' }}>
          {filteredPosts.map((post, index) => {
            return (
              <SpecialsCard
                key={index}
                post={post}
                acfTitle={post.acf.title_of_special}
                postTitle={post.title.rendered}
                category={post.acf.menu_category}
              />
            )
          })}
        </div>
      )}
    </>
  );
};

export default SpecialsList;
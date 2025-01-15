'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import BlogCard from './BlogCard';
import SortCategories from '@/app/components/SortCategories';
import { fetchCategories } from '@/app/lib/utils';


const BlogContent = ({ initialPosts }) => {

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredPosts, setFilteredPosts] = useState(initialPosts || []);
  const [categories, setCategories] = useState([]); // New state for categories

  useEffect(() => {
    // Fetch categories and set state
    const fetchAndSetCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };

    fetchAndSetCategories();
  }, []);

  useEffect(() => {
    // Find the category object that matches the selectedCategory name
    const selectedCategoryObject = categories.find(cat => cat.name === selectedCategory);

    // Use the ID of the found category, or null if 'All' or not found
    const categoryId = selectedCategoryObject ? selectedCategoryObject.id : null;

    if (selectedCategory === 'All' || !categoryId) {
      setFilteredPosts(initialPosts);
    } else {
      const filtered = initialPosts.filter(post => post.categories.includes(categoryId));
      setFilteredPosts(filtered);
    }
  }, [selectedCategory, initialPosts, categories]);


  return (
    <>
      <SortCategories
        selectionTitle="Sort by:"
        selectedCategory={selectedCategory}
        categories={categories}
        onCategorySelect={setSelectedCategory}
      />

      <div className="responsive-equal-height-container">
        {filteredPosts.map((post, index) => {
          const featuredImageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-image.jpg';

          return (
            <Link key={index} href={`/blog/${post.slug}`}
              style={{ display: 'flex' }}>
              <BlogCard
                post={post}
                featuredImage={featuredImageUrl} />
            </Link>
          )
        })}

      </div>
    </>
  );
};

export default BlogContent;

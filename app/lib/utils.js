import { POSTS_API_URL, PAGES_API_URL, CPT_API_URL, MEDIA_API_URL } from './constants';
import he from 'he';

// utils/fetchMetadata
export async function fetchMetadata(pageId) {
  const url = `${PAGES_API_URL}/${pageId}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch metadata');
  }

  const data = await res.json();
  const yoastMetadata = data.yoast_head_json;
  const ogImage = yoastMetadata.og_image ? yoastMetadata.og_image[0].url : null;
  // Return only the title and description
  return {
    title: yoastMetadata.title ? he.decode(yoastMetadata.title) : 'Default Title',
    description: yoastMetadata.description ? he.decode(yoastMetadata.description) : 'Default Description',
    ogImage: ogImage,
    yoastMetadata: yoastMetadata // Include the entire Yoast metadata
  };
}
// utils/fetchMiscMetadata
export async function fetchMiscMetadata(slug) {
  const url = `${PAGES_API_URL}?slug=${slug}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch metadata');
  }

  const data = await res.json();
  const pageData = data[0]; // Get the first page that matches the slug

  if (!pageData) {
    return null; // Return null if no page matches the slug
  }

  const yoastMetadata = pageData.yoast_head_json;
  const ogImage = yoastMetadata.og_image ? yoastMetadata.og_image[0].url : null;

  // Return only the title and description
  return {
    title: yoastMetadata.title ? he.decode(yoastMetadata.title) : 'Default Title',
    description: yoastMetadata.description ? he.decode(yoastMetadata.description) : 'Default Description',
    ogImage: ogImage,
    yoastMetadata: yoastMetadata // Include the entire Yoast metadata
  };
}
// utils/fetchMetadataPost
export async function fetchMetadataPost(postId) {
  const url = `${POSTS_API_URL}?slug=${postId}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Failed to fetch metadata');
  }

  const data = await res.json();
  const yoastMetadata = data[0]?.yoast_head_json; // Access the first item of the array
  let ogImage = null;
  if (yoastMetadata && yoastMetadata.og_image) {
    ogImage = yoastMetadata.og_image[0].url;
  }

  // Return only the title and description
  return {
    title: yoastMetadata && yoastMetadata.title ? he.decode(yoastMetadata.title) : null,
    description: yoastMetadata && yoastMetadata.og_description ? he.decode(yoastMetadata.og_description) : null,
    ogImage: ogImage,
    yoastMetadata: yoastMetadata // Include the entire Yoast metadata
  };
}

// utils/fetchCPTMetadataBySlug
export async function fetchCPTMetadataBySlug(slug, cptName) {
  const url = `${CPT_API_URL}/${cptName}?slug=${slug}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Failed to fetch metadata');
  }

  const data = await res.json();
  const yoastMetadata = data[0]?.yoast_head_json; // Access the first item of the array
  const mainImageId = data[0]?.acf?.main_image; // Access the main_image field

  let ogImage = null;
  if (yoastMetadata && yoastMetadata.og_image && yoastMetadata.og_image.length > 0) {
    ogImage = yoastMetadata.og_image[0].source_url;
  }

  // If main_image is available, use it as ogImage
  if (mainImageId) {
    const mainImageData = await fetchACFImage(mainImageId);
    ogImage = mainImageData.sourceUrl;
  }

  // Return only the title and description
  return {
    title: yoastMetadata && yoastMetadata.title ? he.decode(yoastMetadata.title) : null,
    description: yoastMetadata && yoastMetadata.og_description ? he.decode(yoastMetadata.og_description) : null,
    ogImage: ogImage,
    yoastMetadata: yoastMetadata // Include the entire Yoast metadata
  };
}

// utils fetchPostData
export async function fetchPostData() {
  try {
    // Append '_embed' to the URL to include additional data like featured images
    const response = await fetch(`${POSTS_API_URL}?_embed`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const posts = await response.json();

    // Assuming posts is an array
    return posts.map(post => {
      // Extract the featured image URL; use a default or fallback if not available
      const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-image.jpg';
      return {
        ...post,
        featuredImage
      };
    });

  } catch (error) {
    console.error("Error fetching posts:", error);
    return []; // Return an empty array in case of error
  }
}

// utils/fetchPostBySlug
export async function fetchPostBySlug(slug) {
  const response = await fetch(`${POSTS_API_URL}?slug=${slug}&_embed&per_page=100`);
  const posts = await response.json();
  // Assuming only one post will be returned for a given slug
  const post = posts[0] || null;

  if (post) {
    post.featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-image.jpg';
  }

  return post;
}

export async function fetchCategories() {
  try {
    const response = await fetch(`${CPT_API_URL}/categories`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getCategoryNamesByIds(categoryIds) {
  const categories = await fetchCategories();
  const categoryMap = categories.reduce((map, category) => {
    map[category.id] = category.name;
    return map;
  }, {});

  return categoryIds.map(catId => categoryMap[catId]).filter(name => name);
}

export async function fetchRelatedPosts(categoryId) {
  // Adjust the URL and logic to fetch posts by category
  //const response = await fetch(`${POSTS_API_URL}?category=${categoryId}&_embed`);

  try {
    const url = `${POSTS_API_URL}?category=${categoryId}&_embed`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }

    const relatedPosts = await response.json();

    if (relatedPosts) {
      relatedPosts.featuredImage = relatedPosts._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-image.jpg';
    }

    return relatedPosts;
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}

// utils fetchPageData
export async function fetchPageData(pageId) {
  const res = await fetch(`${PAGES_API_URL}/${pageId}?_embed`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

// utils/fetchMiscData
export async function fetchMiscData(slug) {
  const res = await fetch(`${PAGES_API_URL}?slug=${slug}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json();
  return data[0]; // Return the first page that matches the slug
}

// utils fetchCPTData
export async function fetchCPTData(cptNames) {
  const data = await Promise.all(cptNames.map(async (cptName) => {
    const res = await fetch(`${CPT_API_URL}/${cptName}?per_page=100&order=desc&orderby=date`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch data for CPT: ${cptName}`);
    }
    return res.json();
  }));
  return data.flat();
}

// utils/fetchCPTBySlug
export async function fetchCPTBySlug(slug, cptName) {
  const response = await fetch(`${CPT_API_URL}/${cptName}?slug=${slug}&_embed`);
  const posts = await response.json();
  // Assuming only one post will be returned for a given slug
  const post = posts[0] || null;

  if (post) {
    post.featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-image.jpg';
  }

  return post;
}

// utils fetchACFImage
export async function fetchACFImage(imageId) {
  const res = await fetch(`${MEDIA_API_URL}/${imageId}`);
  if (!res.ok) {
    throw new Error('Failed to fetch image data');
  }
  const imageData = await res.json();
  return {
    sourceUrl: imageData.source_url,
    altText: imageData.alt_text || 'Image'
  };
}

export async function fetchMediaData(mediaId, size = 'full') {
  const res = await fetch(`${MEDIA_API_URL}/${mediaId}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch data for media ${mediaId}`);
  }
  const data = await res.json();
  const imageUrl = data.media_details.sizes[size]
    ? data.media_details.sizes[size].source_url
    : data.source_url;
  return {
    ...data,
    source_url: imageUrl
  };
}

// utils/fetchLocations
export async function fetchLocations() {
  const url = `${CPT_API_URL}/locations?per_page=100&order=asc&orderby=title`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch locations');
  }

  return await res.json();
}


export async function fetchACFDayTimes() {
  const res = await fetch(`${PAGES_API_URL}?slug=about`);
  if (!res.ok) {
    throw new Error('Failed to fetch ACF day times');
  }
  const data = await res.json();
  
  if (!data[0] || !data[0].acf) {
    throw new Error('ACF data is missing');
  }

  return {
    dayStart: data[0].acf.day_start,
    dayEnd: data[0].acf.day_end
  };
}
import { POSTS_API_URL, PAGES_API_URL, CPT_API_URL, MEDIA_API_URL } from './constants';
import he from 'he';

// Next.js aborts and restarts static generation for a page that takes more
// than 60s, so one page's fetches must stay comfortably inside that budget.
const CMS_TIMEOUT_MS = 8000;
// Attempts after the first, for network errors and 5xx only.
// Worst case per URL: 8s + 0.5s backoff + 8s = ~16.5s.
const CMS_RETRIES = 1;

// If the CMS is properly down rather than briefly slow, retrying every URL
// would push pages past Next's 60s budget and stall the build. After this many
// consecutive unreachable responses, stop retrying and take one shot per URL.
const CMS_FAILURE_LIMIT = 3;
let consecutiveFailures = 0;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch JSON from the CMS without ever throwing.
 *
 * Every page in this app is statically prerendered at build time, so an
 * exception here fails the whole Vercel build. Returning null instead lets a
 * page render in a degraded state rather than taking the deploy down with it.
 *
 * Returns the parsed JSON, or null if the resource is genuinely unavailable.
 */
async function fetchJson(url, init) {
  let lastError = null;
  // Once the CMS looks genuinely down, take a single shot per URL so the build
  // degrades quickly instead of stalling on retries.
  const retries = consecutiveFailures >= CMS_FAILURE_LIMIT ? 0 : CMS_RETRIES;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        ...init,
        signal: AbortSignal.timeout(CMS_TIMEOUT_MS),
      });

      if (res.ok) {
        consecutiveFailures = 0;
        return await res.json();
      }

      // 4xx means the resource is missing or not public - retrying won't help.
      // The CMS answered, so it is up; don't count this toward the breaker.
      if (res.status >= 400 && res.status < 500) {
        consecutiveFailures = 0;
        console.error(`[cms] ${res.status} ${url}`);
        return null;
      }

      lastError = new Error(`HTTP ${res.status}`);
    } catch (error) {
      lastError = error;
    }

    if (attempt < retries) {
      await wait(500 * 2 ** attempt);
    }
  }

  consecutiveFailures++;
  console.error(`[cms] unreachable after ${retries + 1} attempt(s): ${url} (${lastError})`);

  return null;
}

// utils/fetchMetadata
export async function fetchMetadata(pageId) {
  const url = `${PAGES_API_URL}/${pageId}`;

  const data = await fetchJson(url);
  const yoastMetadata = data?.yoast_head_json;
  if (!yoastMetadata) {
    return { title: 'Default Title', description: 'Default Description', ogImage: null, yoastMetadata: null };
  }
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

  const data = await fetchJson(url);
  const pageData = data?.[0]; // Get the first page that matches the slug

  if (!pageData) {
    return null; // Return null if no page matches the slug
  }

  const yoastMetadata = pageData.yoast_head_json;
  if (!yoastMetadata) {
    return null;
  }
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

  const data = await fetchJson(url);
  const yoastMetadata = data?.[0]?.yoast_head_json; // Access the first item of the array
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

  const data = await fetchJson(url);
  const yoastMetadata = data?.[0]?.yoast_head_json; // Access the first item of the array
  const mainImageId = data?.[0]?.acf?.main_image; // Access the main_image field

  let ogImage = null;
  if (yoastMetadata && yoastMetadata.og_image && yoastMetadata.og_image.length > 0) {
    ogImage = yoastMetadata.og_image[0].source_url;
  }

  // If main_image is available, use it as ogImage
  if (mainImageId) {
    const mainImageData = await fetchACFImage(mainImageId);
    if (mainImageData) {
      ogImage = mainImageData.sourceUrl;
    }
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
  // Append '_embed' to the URL to include additional data like featured images
  const posts = await fetchJson(`${POSTS_API_URL}?_embed`);
  if (!Array.isArray(posts)) {
    return [];
  }

  return posts.map(post => {
      // Extract the featured image URL; use a default or fallback if not available
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-image.jpg';
    return {
      ...post,
      featuredImage
    };
  });
}

// utils/fetchPostBySlug
export async function fetchPostBySlug(slug) {
  const posts = await fetchJson(`${POSTS_API_URL}?slug=${slug}&_embed&per_page=100`);
  // Assuming only one post will be returned for a given slug
  const post = posts?.[0] || null;

  if (post) {
    post.featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-image.jpg';
  }

  return post;
}

export async function fetchCategories() {
  const categories = await fetchJson(`${CPT_API_URL}/categories`);
  return Array.isArray(categories) ? categories : [];
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

  const url = `${POSTS_API_URL}?category=${categoryId}&_embed`;

  const relatedPosts = await fetchJson(url);
  if (!relatedPosts) {
    return [];
  }

  relatedPosts.featuredImage = relatedPosts._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-image.jpg';

  return relatedPosts;
}

// utils fetchPageData
export async function fetchPageData(pageId) {
  return fetchJson(`${PAGES_API_URL}/${pageId}?_embed`);
}

// utils/fetchMiscData
export async function fetchMiscData(slug) {
  const data = await fetchJson(`${PAGES_API_URL}?slug=${slug}`);
  return data?.[0] ?? null; // Return the first page that matches the slug
}

// utils fetchCPTData
export async function fetchCPTData(cptNames) {
  const data = await Promise.all(cptNames.map(async (cptName) => {
    const result = await fetchJson(`${CPT_API_URL}/${cptName}?per_page=100&order=desc&orderby=date`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    return Array.isArray(result) ? result : [];
  }));
  return data.flat();
}

// utils/fetchCPTBySlug
export async function fetchCPTBySlug(slug, cptName) {
  const posts = await fetchJson(`${CPT_API_URL}/${cptName}?slug=${slug}&_embed`);
  // Assuming only one post will be returned for a given slug
  const post = posts?.[0] || null;

  if (post) {
    post.featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-image.jpg';
  }

  return post;
}

// utils fetchACFImage
export async function fetchACFImage(imageId) {
  const imageData = await fetchJson(`${MEDIA_API_URL}/${imageId}`);
  if (!imageData) {
    return null;
  }
  return {
    sourceUrl: imageData.source_url,
    altText: imageData.alt_text || 'Image'
  };
}

export async function fetchMediaData(mediaId, size = 'full') {
  const data = await fetchJson(`${MEDIA_API_URL}/${mediaId}`);
  if (!data) {
    return null;
  }
  const imageUrl = data.media_details?.sizes?.[size]
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

  const locations = await fetchJson(url);
  return Array.isArray(locations) ? locations : [];
}


export async function fetchACFDayTimes() {
  const data = await fetchJson(`${PAGES_API_URL}?slug=about`);

  if (!data?.[0]?.acf) {
    return { dayStart: null, dayEnd: null };
  }

  return {
    dayStart: data[0].acf.day_start,
    dayEnd: data[0].acf.day_end
  };
}
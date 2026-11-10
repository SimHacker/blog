import articles from '$lib/data/articles.json';

export const prerender = true;

export function load() {
  // Return an array of paths to prerender based on article slugs
  return {
    entries: articles.map(article => `/article/${article.slug}`)
  };
}
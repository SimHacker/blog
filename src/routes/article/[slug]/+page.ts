import articleData from '$lib/data/articles.json';
import { articles } from '$lib/data/articles';
import type { PageLoad } from './$types';
import type { Component } from 'svelte';

export const load: PageLoad = async ({ params }) => {
  const { slug } = params;
  console.log("article/[slug]/+page.ts: Starting load function, slug:", slug);

  const article = articleData.find(a => a.slug === slug);
  console.log("article/[slug]/+page.ts: Found article:", article);

  if (!article) {
    console.error("article/[slug]/+page.ts: Article not found for slug:", slug);
    return {
      status: 404,
      error: new Error('Article not found')
    };
  }

  let content: Component;
  try {
    const importPath = `./articles/${slug}.md`;
    console.log("article/[slug]/+page.ts: Import path for content:", importPath);

    if (articles[importPath]) {
      const module = await articles[importPath]();
      content = module.default as Component;
      console.log("article/[slug]/+page.ts: Loaded content module:", module);
    } else {
      console.error("article/[slug]/+page.ts: Content not found for import path:", importPath);
      throw new Error('Content not found');
    }
  } catch (error) {
    console.error("article/[slug]/+page.ts: Error loading content:", error);
    return {
      status: 500,
      error: new Error('Failed to load article content')
    };
  }

  console.log("article/[slug]/+page.ts: Successfully loaded article:", article, "and content:", content);
  return {
    article,
    content
  };
};
<script lang="ts" context="module">
  import taxonomy from '$lib/data/taxonomy.json';
  import articles from '$lib/data/articles.json';
  import { buildTagTree } from '$lib/utils';
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import TagTree from './TagTree.svelte';
  import Header from './Header.svelte';
  import type { Tag, Article } from '$lib/types';

  let selectedTag: Tag | null = null;
  let filteredArticles: Article[] = [];
  const tagTree: Tag[] = buildTagTree(taxonomy.tags);

  onMount(() => {
    filteredArticles = articles;
  });

  const handleSelectTag = (tag: Tag) => {
    selectedTag = tag;
    filterArticles();
  };

  const filterArticles = () => {
    if (selectedTag) {
      filteredArticles = articles.filter(article =>
        article.tags.includes(selectedTag.slug)
      );
    } else {
      filteredArticles = articles;
    }
  };
</script>

<Header title="Don Hopkins' Blog Taxonomy" />

<div>
  <h1>Tags</h1>
  <TagTree tags={tagTree} onSelectTag={handleSelectTag} />

  <h1>Articles</h1>
  <ul>
    {#each filteredArticles as article}
      <li>
        <a href={`/article/${article.slug}`}>{article.title}</a>
      </li>
    {/each}
  </ul>
</div>

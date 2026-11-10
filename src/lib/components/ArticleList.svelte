<script lang="ts">
  export let articles;
  export let currentArticleSlug = null;
</script>

<!-- Render the list of articles and highlight the current article -->
<div class="article-list">
  <ul>
    {#each articles as article}
      <li class="article-item {(currentArticleSlug && (article.slug === currentArticleSlug)) ? 'active' : ''}">{article.title}</li>
    {/each}
  </ul>
</div>

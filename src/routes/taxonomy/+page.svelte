<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import TagTree from '$lib/components/TagTree.svelte';
  import taxonomy from '$lib/data/taxonomy.json';
  import articles from '$lib/data/articles.json';
</script>

<Header title="Explore by Tags" />

<main class="container mx-auto p-4">
  <TagTree {taxonomy} {articles} />
</main>

<Footer />

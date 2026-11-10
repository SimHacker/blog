<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import type { Component } from 'svelte';

  // Use the $props rune to handle props
  const myProps = $props();
  const { data } = myProps;
  let { article, content }: { article: { title: string; slug: string; tags: string[]; imported: boolean; pinned?: boolean }, content: Component } = data;
  const ContentComponent = content;

  // Debugging: log the props received
  console.log('routes/article/[slug]/+page.svelte: Received myProps:', myProps);
  console.log('routes/article/[slug]/+page.svelte: Received data:', data);
  console.log('routes/article/[slug]/+page.svelte: Received content prop:', content);

  // Log when the component is mounted
  import { onMount } from 'svelte';
  onMount(() => {
    console.log('routes/article/[slug]/+page.svelte: Component mounted');
  });
</script>

<Header title={`Don Hopkins' Blog: ${article ? article.title : 'Loading...'}`} />

<main class="container mx-auto p-4">
  {#if article && content}
    <h1>{article.title}</h1>
    <div>
      <!-- Directly render the markdown content as a Svelte component -->
      <ContentComponent />
    </div>
  {:else}
    <p>Loading...</p>
  {/if}
</main>

<Footer />
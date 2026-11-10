<script lang="ts">
  import type { Tag } from '$lib/types';
  import TagTree from './TagTree.svelte'; // Import the TagTree component

  export let tags: Tag[] = [];
  export let onSelectTag: (tag: Tag) => void;

  const handleClick = (tag: Tag) => {
    onSelectTag(tag);
  };
</script>

<ul>
  {#each tags as tag}
    <li>
      <button type="button" on:click={() => handleClick(tag)}>
        {tag.name}
      </button>
      {#if tag.children && tag.children.length > 0}
        <TagTree tags={tag.children} onSelectTag={onSelectTag} />
      {/if}
    </li>
  {/each}
</ul>

<style>
  /* Optional: Add custom styles for the button to match your design */
  button {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    text-decoration: underline;
    padding: 0;
    font: inherit;
  }

  button:hover {
    text-decoration: none;
  }
</style>

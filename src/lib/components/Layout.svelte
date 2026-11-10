<script lang="ts">
  import '../../app.css';
  let { children } = $props();
</script>

<div class="min-h-screen flex flex-col">
  <main class="flex-grow container mx-auto p-4">
    {@render children()}
  </main>
</div>

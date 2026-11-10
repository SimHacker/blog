import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { readFileSync } from 'fs';
import path from 'path';

// Read and parse the articles JSON file
const articles = JSON.parse(
  readFileSync(path.resolve('src/lib/data/articles.json'), 'utf-8')
);

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extension: '.md'
    })
  ],

  extensions: ['.svelte', '.svx', '.md'],

  kit: {
    // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://svelte.dev/docs/kit/adapters for more information about adapters.
    adapter: adapter({
      fallback: '404.html', // or any other fallback file
      strict: false, // don't need dynamic routes
    }),
    prerender: {
      entries: [
        '*',
        ...articles.map(article => `/article/${article.slug}`)
      ]
    },
    alias: {
      $components: 'src/components',
      $lib: 'src/lib',
      $routes: 'src/routes',
      $app: 'node_modules/@sveltejs/kit'
    }
  }
};

export default config;

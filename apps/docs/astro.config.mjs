import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Served under a sub-path in production (gems.rueda.dev/diamond/docs).
  // DOCS_BASE is set by the Docker build; local dev stays at the root.
  // Always normalize to a trailing slash so `${BASE_URL}path` joins cleanly.
  base: (process.env.DOCS_BASE || '/').replace(/\/?$/, '/'),
  integrations: [react(), mdx()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
  },
  output: 'static',
});

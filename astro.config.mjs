import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://rzanela.github.io',
  base: '/brarquitetura',
  output: 'static',
  integrations: [sitemap()],
});

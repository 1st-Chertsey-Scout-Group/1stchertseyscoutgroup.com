import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

import mdx from "@astrojs/mdx";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind({
    applyBaseStyles: false
  }), sitemap(), mdx()],

  build: {
    assets: "_assets"
  },

  site: "https://1stchertseyscoutgroup.com/",

  adapter: node({
    mode: "standalone"
  })
});
import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import pageInsight from "astro-page-insight";
import sitemap from "@astrojs/sitemap";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind({
    applyBaseStyles: false
  }), pageInsight(), sitemap(), mdx()],
  build: {
    assets: "_assets"
  },
  site: "https://1stchertseyscoutgroup.com/"
});
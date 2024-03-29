import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

import pageInsight from "astro-page-insight";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind({
    applyBaseStyles: false
  }), pageInsight()],
  build: {
    assets: "_assets"
  },
  site: "https://1stchertsey.com"
});
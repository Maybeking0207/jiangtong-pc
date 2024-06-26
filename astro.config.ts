import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import vue from '@astrojs/vue'
import playformCompress from '@playform/compress'
import compressor from 'astro-compressor'
import metaTags from 'astro-meta-tags'
import robotsTxt from 'astro-robots-txt'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  image: {
    domains: ['autoreport.site'],
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  site: 'https://www.jungt.com',
  experimental: {
    directRenderScript: true,
    globalRoutePriority: true,
    clientPrerender: true,
  },
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
  },
  integrations: [tailwind(), vue({
    appEntrypoint: '/src/pages/_app',
  }), metaTags(), sitemap(), robotsTxt(), compressor(), playformCompress()],
})

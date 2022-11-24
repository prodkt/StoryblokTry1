import { defineConfig } from "astro/config";
import Unocss from "unocss/astro";
// import storyblok from "@storyblok/astro";
// import { loadEnv } from "vite";
import {
  presetIcons,
  presetUno,
  transformerDirectives,
  presetAttributify,
} from 'unocss'

// const env = loadEnv(import.meta.env.MODE, process.cwd(), 'STORYBLOK');

// https://astro.build/config
import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
// import vercel from '@astrojs/vercel/edge';
// import vercel from '@astrojs/vercel/static';
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [
    storyblok({
      accessToken:
        import.meta.env.MODE === "development"
          ? env.STORYBLOK_PREVIEW_TOKEN
          : env.STORYBLOK_PUBLIC_TOKEN,
      components: {
        course: 'storyblok/course',
        course: '/learning/course',
      },
      cache: {
        clear: "auto",
        type: "memory",
      },
      bridge: true,
      apiOptions: {
        // Choose your Storyblok space region
        region: "us",
      },
      useCustomApi: false,
    }),
    Unocss({
      shortcuts: [
        { 'i-logo': 'i-logos-astro w-6em h-6em transform transition-800' },
      ],
      transformers: [
        transformerDirectives(),
      ],
      presets: [
        presetUno(),
        presetIcons({
          extraProperties: {
            'display': 'inline-block',
            'vertical-align': 'middle',
          },
        }),
        presetAttributify({ /* options */ }),
      // ...other presets
      ],
    }),
    alpinejs(),
  ],
  output: "server",
  adapter: vercel(),
});

import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

const LIVE_URL = "https://bishalvaii.github.io"


export default defineConfig({
  integrations: [react()],
  site: LIVE_URL
});

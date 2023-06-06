import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	server: {
    watch: {
      usePolling: true,
    },
    port: 8080,
    host: true,
  },
	preview: {
    port: 8080,
  },
};

export default config;

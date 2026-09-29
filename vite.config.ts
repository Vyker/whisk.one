import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    // Hosted as a GitHub Pages project site: https://vyker.github.io/whisk.one/
    // When the custom domain whisk.one is connected via CNAME, change base to '/'.
    base: '/whisk.one/',
    resolve: {
      alias: {
        '@': import.meta.dirname,
      },
    },
  };
});

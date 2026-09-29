import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    // Custom domain whisk.one is connected (see CNAME file), so the site
    // builds from the root. Do not add a sub-path prefix here.
    base: '/',
    resolve: {
      alias: {
        '@': import.meta.dirname,
      },
    },
  };
});

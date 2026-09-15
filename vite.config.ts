import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          meesho: path.resolve(__dirname, 'meesho-label-crop.html'),
          flipkart: path.resolve(__dirname, 'flipkart-label-crop.html'),
          guide: path.resolve(__dirname, 'shipping-label-guide.html'),
          faq: path.resolve(__dirname, 'faq.html'),
          about: path.resolve(__dirname, 'about.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

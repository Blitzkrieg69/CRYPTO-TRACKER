import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { // This is the prefix you'll use in your fetch call
        target: 'https://api.coingecko.com/api/v3', // The actual CoinGecko API URL
        changeOrigin: true, // Important for CORS to work
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Removes the /api prefix when forwarding
      },
    },
  },
});
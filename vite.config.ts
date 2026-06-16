import tailwindcss from '@tailwindcss/vite';
import dotenv from 'dotenv';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import { fetchCodolioStats } from './scripts/codolio-service.js';

function getCodolioToken() {
  dotenv.config({ path: path.join(__dirname, '.env') });
  const env = loadEnv(process.env.NODE_ENV || 'development', '.', '');
  return env.CODOLIO_TOKEN || process.env.CODOLIO_TOKEN || '';
}

function codolioLiveStatsPlugin() {
  const handleRequest = async (_req: any, res: any) => {
    try {
      const data = await fetchCodolioStats(getCodolioToken());
      res.setHeader('Cache-Control', 'no-store');
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load Codolio stats';
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: message }));
    }
  };

  return {
    name: 'codolio-live-stats',
    configureServer(server: any) {
      server.middlewares.use('/api/codolio/stats', handleRequest);
    },
    configurePreviewServer(server: any) {
      server.middlewares.use('/api/codolio/stats', handleRequest);
    },
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    root: path.resolve(__dirname),
    plugins: [react(), tailwindcss(), codolioLiveStatsPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.js$/,
      exclude: [],
    },
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});

import react from '@vitejs/plugin-react';
import type { ProxyOptions } from 'vite';
import { defineConfig } from 'vite';
import {
  ApiPath,
  BackendOrigin,
  SpaAssetPath,
} from './src/shared/constants/api.ts';
import { MediaType } from './src/shared/constants/http.ts';

function apiProxy(): ProxyOptions {
  return {
    target: BackendOrigin.Local,
    bypass(req) {
      const accept = req.headers.accept ?? '';
      if (accept.includes(MediaType.TextHtml)) {
        return SpaAssetPath.IndexHtml;
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: '/curs_react_hw/',
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    proxy: {
      [ApiPath.Books]: apiProxy(),
      [ApiPath.Members]: apiProxy(),
      [ApiPath.Loans]: apiProxy(),
    },
  },
});

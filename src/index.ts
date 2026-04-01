import type { Express } from 'express';
import http from 'http';

// eslint-disable-next-line @typescript-eslint/no-require-imports
let app: Express = require('./server').default;

const server = http.createServer(app);

let currentApp = app;

const port = Number(process.env.PORT) || 3000;

/** HMR in dev, or when this bundle is the process entry (`node build/server.js` / Coolify). */
const shouldListen =
  Boolean(module.hot) ||
  (typeof require !== 'undefined' && require.main === module);

if (shouldListen) {
  // Bind 0.0.0.0 so Docker/Coolify can reach the process (not only localhost).
  server.listen(port, '0.0.0.0', () => {
    console.log(`🚀 started on port ${port}`);
  });
}

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...');

    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      app = require('./server').default;
      server.removeListener('request', currentApp);
      server.on('request', app);
      currentApp = app;
    } catch (error) {
      console.error(error);
    }
  });
}

export default app;

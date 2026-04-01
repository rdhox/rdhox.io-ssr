'use strict';

/**
 * terser-webpack-plugin v5 (required for modern dependency syntax) drops the
 * top-level `sourceMap` option Razzle passes — strip it so initialization succeeds.
 * Bump terser ecma so optional chaining in deps minifies correctly.
 */
module.exports = {
  options: {
    // Without this, Razzle's DefinePlugin bakes PORT from the *build* machine (often 3000).
    // Coolify injects a different PORT at runtime — the proxy then gets "no available server".
    forceRuntimeEnvVars: ['PORT'],
  },
  modifyWebpackOptions({
    options: { webpackOptions },
    env: { target, dev },
  }) {
    if (target === 'web' && !dev && webpackOptions.terserPluginOptions) {
      const t = webpackOptions.terserPluginOptions;
      delete t.sourceMap;
      if (t.terserOptions) {
        t.terserOptions.parse = { ...t.terserOptions.parse, ecma: 2020 };
        t.terserOptions.compress = { ...t.terserOptions.compress, ecma: 2020 };
        t.terserOptions.output = { ...t.terserOptions.output, ecma: 2020 };
      }
    }
    return webpackOptions;
  },
  modifyWebpackConfig({
    env: { target, dev },
    webpackConfig,
  }) {
    if (target === 'web') {
      // Webpack 5: no Node core polyfills for the browser; razzle-dev-utils HMR still needs `url`.
      webpackConfig.resolve = webpackConfig.resolve || {};
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        url: require.resolve('url/'),
      };
    }
    if (target === 'web' && !dev) {
      webpackConfig.devtool = false;
      webpackConfig.performance = { hints: false };
    }
    return webpackConfig;
  },
};

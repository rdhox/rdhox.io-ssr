import App from '../client/App';
import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST as string);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR as string))
  .get('/*', (req, res) => {
    const context: { url?: string } = {};
    const markup = renderToString(<App />);

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>rdhox.io</title>
        <meta name="keywords" content="developer,javascript,node,react,freelance">
        <meta name="description" content="Welcome to my personnal website! You'll find here some informations about my work. Don't hesitate to contact me or follow me on twitter.">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="author" content="rdhox - Freelancer">
        <script defer src="https://umami.rdhox.io/script.js" data-website-id="b33486ce-00bf-496c-b6e1-6b4b24f68466"></script>
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ''
        }
        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
    </head>
    <body>
      <div id="root">${markup}</div>
    </body>
</html>`
      );
    }
  });

export default server;

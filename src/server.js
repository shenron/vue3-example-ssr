const path = require("path");
const express = require("express");
const { createSSRApp } = require("vue");
const { renderToString } = require("@vue/server-renderer");
const manifest = require("../dist/ssr-manifest.json");

const server = express();

const appPath = path.join(__dirname, "../dist", manifest["app.js"]);
const _createApp = require(appPath).default;

server.use("/img", express.static(path.join(__dirname, "../dist", "img")));
server.use("/js", express.static(path.join(__dirname, "../dist", "js")));
server.use("/css", express.static(path.join(__dirname, "../dist", "css")));
server.use(
      "/favicon.ico",
      express.static(path.join(__dirname, "../dist", "favicon.ico"))
);

server.get("*", async (req, res) => {
  const { app, router } = await _createApp({ url: req.url })
  const _app = createSSRApp(app, { url: req.ul });

  router.push(req.url);

  await router.isReady();

  _app.use(router)

  const appContent = await renderToString(_app);

  const html = `
  <html>
    <head>
      <title>Hello</title>
      <link rel="stylesheet" href="${manifest["app.css"]}" />
    </head>
    <body>
      ${appContent}
    </body>
  </html>

  `;

  res.end(html);
});

console.log('You can navigate to http://localhost:8080');

server.listen(8080);

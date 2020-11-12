const path = require("path");
const express = require("express");
const { createSSRApp } = require("vue");
const { renderToString } = require("@vue/server-renderer");
const manifest = require("../dist/ssr-manifest.json");
const r = require('vue-router')
const {
  createRouter,
  createMemoryHistory,
} = r;

const router = createRouter({
  createMemoryHistory,
  routes: [
    { path: '/', name: 'page', component: { template: '<div>Page</div>'} }],
});

const server = express();

const appPath = path.join(__dirname, "../dist", manifest["app.js"]);
const App = require(appPath).default;

server.use("/img", express.static(path.join(__dirname, "../dist", "img")));
server.use("/js", express.static(path.join(__dirname, "../dist", "js")));
server.use("/css", express.static(path.join(__dirname, "../dist", "css")));
server.use(
  "/favicon.ico",
  express.static(path.join(__dirname, "../dist", "favicon.ico"))
);

server.get("/", async (req, res) => {
  console.log(req.url);
  const app = createSSRApp(App);

  app.use(router);

  const appContent = await renderToString(app);

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

// server.get("/page", async (req, res) => {
//   console.log(req.url);
//
//   res.send('???')
// });

console.log('You can navigate to http://localhost:8080');

server.listen(8080);

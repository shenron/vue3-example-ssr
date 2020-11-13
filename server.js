const path = require("path");
const express = require("express");
const fs = require('fs');
const serialize = require('serialize-javascript');
const { renderToString } = require("@vue/server-renderer");
const manifest = require("./dist/server/ssr-manifest.json");

const server = express();

const appPath = path.join(__dirname, "./dist", 'server', manifest["app.js"]);
const createApp = require(appPath).default;

server.use("/img", express.static(path.join(__dirname, "./dist/client", "img")));
server.use("/js", express.static(path.join(__dirname, "./dist/client", "js")));
server.use("/css", express.static(path.join(__dirname, "./dist/client", "css")));
server.use(
      "/favicon.ico",
      express.static(path.join(__dirname, "./dist/client", "favicon.ico"))
);

const renderState = (context) => {
  const contextKey = 'state';
  const windowKey = '__INITIAL_STATE__';
  const state = serialize(context[contextKey]);
  const autoRemove =
        ';(function(){var s;(s=document.currentScript||document.scripts[document.scripts.length-1]).parentNode.removeChild(s);}());';
  var nonceAttr = context.nonce ? ' nonce="' + context.nonce + '"' : '';
  return context[contextKey]
        ? '<script' +
        nonceAttr +
        '>window.' +
        windowKey +
        '=' +
        state +
        autoRemove +
        '</script>'
        : '';
};

server.get("*", async (req, res) => {
  const { app, store } = await createApp({ url: req.url })

  let appContent = await renderToString(app)

  fs.readFile(path.join(__dirname, '/dist/client/index.html'), (err, html) => {
    if (err) {
      throw err
    }

    appContent = `<div id="app">${renderState(store)}${appContent}</div>`

    html = html.toString().replace('<div id="app"></div>', `${appContent}`)
    res.setHeader('Content-Type', 'text/html')
    res.send(html)
  })
});

console.log('You can navigate to http://localhost:8787');

server.listen(8787);

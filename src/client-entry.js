import createApp from './app'

const { app, router, store } = createApp();

(async (r, a) => {
  await r.isReady();

  if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
  }
  a.mount('#app', true);
})(router, app);

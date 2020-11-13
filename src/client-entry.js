import createApp from './app'

const { app, router, store, nativeStore } = createApp();

(async (r, a) => {
  await r.isReady();

  if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
  }
  if (window.__INITIAL_NATIVE_STATE__) {
    nativeStore.value = window.__INITIAL_NATIVE_STATE__;
  }
  a.mount('#app', true);
})(router, app);

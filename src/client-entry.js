import { _createStore } from './store/useNativeStore'
import createApp from './app'

const nativeStore = _createStore();
if (window.__INITIAL_NATIVE_STATE__) {
  Object.keys(window.__INITIAL_NATIVE_STATE__).forEach((k) => {
    nativeStore[k] = window.__INITIAL_NATIVE_STATE__[k];
  });
}

const { app, router, store } = createApp({ nativeStore });

(async (r, a) => {
  await r.isReady();

  if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
  }
  a.mount('#app', true);
})(router, app);

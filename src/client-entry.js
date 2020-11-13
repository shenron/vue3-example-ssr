import * as nativeStore from './store/useNativeStore'
import * as vuexStore from './store/useVuexStore';
import createApp from './app'

const _vuexStore = vuexStore._createStore();

const _nativeStore = nativeStore._createStore();

if (window.__INITIAL_NATIVE_STATE__) {
  Object.keys(window.__INITIAL_NATIVE_STATE__).forEach((k) => {
    _nativeStore[k] = window.__INITIAL_NATIVE_STATE__[k];
  });
}

const { app, router } = createApp({
  nativeStore: _nativeStore,
  vuexStore: _vuexStore,
});

(async (r, a) => {
  await r.isReady();

  if (window.__INITIAL_STATE__) {
    _vuexStore.replaceState(window.__INITIAL_STATE__);
  }

  delete window.__INITIAL_STATE__
  delete window.__INITIAL_NATIVE_STATE__
  a.mount('#app', true);
})(router, app);

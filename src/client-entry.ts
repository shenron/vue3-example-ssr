import * as nativeStore from './store/useNativeStore';
import * as vuexStore from './store/useVuexStore';
import createApp from './app';

const _vuexStore = vuexStore._createStore();

const _nativeStore: any = nativeStore._createStore();

// @ts-ignore - store hydration
const initialNativeState = window.__INITIAL_NATIVE_STATE__;
if (initialNativeState) {
  Object.keys(initialNativeState).forEach((k) => {
    _nativeStore[k] = initialNativeState[k];
  });
}

const { app, router } = createApp({
  nativeStore: _nativeStore,
  vuexStore: _vuexStore,
});

(async (r, a) => {
  await r.isReady();

  // @ts-ignore - store hydration
  const initialVuexStore = window.__INITIAL_STATE__;
  if (initialVuexStore) {
    _vuexStore.replaceState(initialVuexStore);
  }

  // @ts-ignore delete store from window
  delete window.__INITIAL_STATE__;

  // @ts-ignore delete store from window
  delete window.__INITIAL_NATIVE_STATE__;
  a.mount('#app', true);
})(router, app);

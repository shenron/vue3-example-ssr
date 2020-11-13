import createApp from './app';
import * as nativeStore from './store/useNativeStore'
import * as vuexStore from './store/useVuexStore';

export default function () {
  const _nativeStore = nativeStore._createStore();

  const _vuexStore = vuexStore._createStore();

  const {
    router,
    app,
  } = createApp({
    nativeStore: _nativeStore,
    vuexStore: _vuexStore,
  });

  return {
    app,
    router,
    nativeStore: _nativeStore,
    vuexStore: _vuexStore,
  };
}

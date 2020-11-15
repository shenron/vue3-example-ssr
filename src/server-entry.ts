import { InMemoryCache } from 'apollo-cache-inmemory';
import createApp from './app';
import * as nativeStore from './store/useNativeStore';
import * as vuexStore from './store/useVuexStore';

export default function () {
  const _nativeStore = nativeStore._createStore();

  const _vuexStore = vuexStore._createStore();

  const apolloCache = new InMemoryCache();

  return {
    ...createApp({
      nativeStore: _nativeStore,
      vuexStore: _vuexStore,
      apolloCache,
    }),
    nativeStore: _nativeStore,
    vuexStore: _vuexStore,
    apolloCache,
  };
}

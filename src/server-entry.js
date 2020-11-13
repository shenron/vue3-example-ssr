import createApp from './app';
import { _createStore } from './store/useNativeStore'

export default function () {
  const nativeStore = _createStore();

  const {
    store,
    router,
    app,
  } = createApp({ nativeStore });

  return {
    app,
    store,
    router,
    nativeStore,
  };
}

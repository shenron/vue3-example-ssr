import { createSSRApp, h } from 'vue'
import App from './App.vue'
import createRouter from './router';
import store from './store/store';
import useNativeStore, { getStore } from './store/useNativeStore';

export default function () {
  const rootComponent = {
    render: () => h(App),
    components: { App },
    setup() {
      useNativeStore().provide();
    }
  }

  const app = createSSRApp(rootComponent)

  const router = createRouter();

  app.use(router);
  app.use(store);

  return {
    app,
    router,
    store,
    nativeStore: getStore(),
  };
}

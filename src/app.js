import { createSSRApp, createApp, h } from 'vue'
import isSSR from '@/_base/isSSR'
import App from './App.vue'
import createRouter from './router';
import { provideStore } from './store/useNativeStore';
import vuexStore from './store/vuexStore';

export default function ({ nativeStore }) {
  const rootComponent = {
    render: () => h(App),
    components: { App },
    setup() {
      provideStore(nativeStore)
    }
  }

  const app = (isSSR ? createSSRApp : createApp)(rootComponent);

  const router = createRouter();

  app.use(vuexStore);
  app.use(router);

  return {
    app,
    store: vuexStore,
    router,
  };
}

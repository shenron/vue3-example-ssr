import { createSSRApp, createApp, h } from 'vue'
import isSSR from '@/_base/isSSR'
import App from './App.vue'
import createRouter from './router';
import * as nativeStore from './store/useNativeStore';
import * as vuexStore from './store/useVuexStore';

export default function (args) {
  const rootComponent = {
    render: () => h(App),
    components: { App },
    setup() {
      nativeStore.provideStore(args.nativeStore)
      vuexStore.provideStore(args.vuexStore)
    }
  }

  const app = (isSSR ? createSSRApp : createApp)(rootComponent);

  const router = createRouter();

  app.use(router);
  app.use(args.vuexStore);

  return {
    app,
    router,
  };
}

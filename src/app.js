import { createSSRApp, h } from 'vue'
import App from './App.vue'
import createRouter from './router';
import store from './store';

export default function () {
  const rootComponent = {
    render: () => h(App),
    components: { App }
  }

  const app = createSSRApp(rootComponent)

  const router = createRouter();

  app.use(router);
  app.use(store);

  return { app, router, store };
}

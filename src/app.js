import { createSSRApp, h } from 'vue'
import App from './App.vue'
import createRouter from './router';
import createStore from './store';

export default function () {
  const rootComponent = {
    render: () => h(App),
    components: { App }
  }

  const app = createSSRApp(rootComponent)

  const router = createRouter();
  const store = createStore();

  app.use(router);
  app.use(store);

  return { app, router, store };
}

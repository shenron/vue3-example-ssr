import { _createApp } from './app';

const { app, router } = _createApp();

(async (r, a) => {
  await r.isReady();
  a.mount('#app', true);
})(router, app);

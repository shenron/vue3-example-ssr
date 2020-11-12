import createRouter from './router';
import App from './App.vue';

export default function () {
  const app = App;
  const router = createRouter();

  return { app, router };
}

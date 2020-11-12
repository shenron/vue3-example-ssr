import { createApp } from "vue";
import App from './App';
import createRouter from './router';

const app = createApp(App);

app.use(createRouter());

app.mount("#app");

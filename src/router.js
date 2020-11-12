import {
  createRouter,
  createWebHistory,
  createMemoryHistory,
} from 'vue-router'
import isSSR from './_base/isSSR';

const history = isSSR ? createMemoryHistory() : createWebHistory()

const router = createRouter({
  history,
  routes: [
    { page: '/', name: 'home', component: () => import('./Home.vue').default },
    { path: '/page', name: 'page', component: () => import('./Page.vue').default }
  ],
});

router.beforeEach((to, from, next) => {
  console.log('before each');
  next();
});

export default router;


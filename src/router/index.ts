import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
} from 'vue-router';

const isServer = typeof window === 'undefined';

const history = isServer ? createMemoryHistory() : createWebHistory();

const routes = [
  { path: '/', name: 'home', component: () => import('../pages/Home.vue') },
  {
    path: '/page/:id',
    name: 'page',
    component: () => import('../pages/Page.vue'),
    props: true,
  },
];

export default function () {
  return createRouter({ routes, history });
}

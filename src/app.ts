import {
  createSSRApp, createApp, h, provide,
} from 'vue';
import isSSR from '@/_base/isSSR';
import { DefaultApolloClient } from '@vue/apollo-composable';
import nodeFetch from 'node-fetch';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import App from './App.vue';
import createRouter from './router';
import * as nativeStore from './store/useNativeStore';
import * as vuexStore from './store/useVuexStore';

// GRAPHQL STUFF

const enchancedFetch = (url: any, init: any) => fetch(url, {
  ...init,
  credentials: 'same-origin',
  headers: {
    ...init.headers,
  },
}).then((response) => response);

const _fetch: any = isSSR ? nodeFetch : enchancedFetch;

// client apollo client
const apolloClient = new ApolloClient({
  link: createHttpLink({
    uri: '/api',
    fetchOptions: {
      mode: 'cors',
    },
    fetch: _fetch,
  }),
  cache: new InMemoryCache(),
});

export default function (args: any) {
  const rootComponent = {
    render: () => h(App),
    components: { App },
    setup() {
      nativeStore.provideStore(args.nativeStore);
      vuexStore.provideStore(args.vuexStore);

      provide(DefaultApolloClient, apolloClient);
    },
  };

  const app = (isSSR ? createSSRApp : createApp)(rootComponent);

  const router = createRouter();

  app.use(router);
  app.use(args.vuexStore);

  return {
    app,
    router,
  };
}

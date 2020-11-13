import { inject, provide, reactive } from 'vue';

const StoreSymbol = Symbol('store')

export function _createStore() {
  return reactive({ cpt: 1 });
}

export function provideStore(store) {
  provide(StoreSymbol, store)
}

export default function useStore() {
  const store = inject(StoreSymbol)
  if (!store) {
    throw Error('no store provided')
  }
  return store
}


import { inject, provide, ref } from 'vue';

const StoreSymbol = Symbol('store');

const store = ref({
  cpt: -0,
});

// static store to be able to use without composition api
const getStore = () => {
  return store;
};

export default function () {
  return {
    store: inject(StoreSymbol, store),
    provide: () => {

      return provide(StoreSymbol, store);
    },
  };
}

export {
  getStore,
};

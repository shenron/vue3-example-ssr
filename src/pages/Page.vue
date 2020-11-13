<template>
  Im the page: {{ id }}

  Store: {{ store.cpt }}
</template>

<script>
import { defineComponent } from 'vue';
import useNativeStore from '../store/useNativeStore';

export default defineComponent({
  props: {
    id: String,
  },
  setup() {
    const { store } = useNativeStore();

    return {
      store,
    };
  },
  async serverPrefetch() {
    this.store.cpt += 10;
  },
})
</script>

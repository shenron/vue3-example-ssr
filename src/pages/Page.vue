<template>
  Im the page: {{ id }}

  <br />

  Store: {{ store.cpt }}

  <button @click="clicked">Cpt + 1</button>
</template>

<script>
import { defineComponent } from 'vue';
import useNativeStore from '../store/useNativeStore';

export default defineComponent({
  props: {
    id: String,
  },
  setup() {
    const store = useNativeStore();

    const clicked = () => {
      store.cpt += 1
    };

    return {
      store,
      clicked,
    };
  },
  async serverPrefetch() {
    this.store.cpt += 10;
  },
})
</script>

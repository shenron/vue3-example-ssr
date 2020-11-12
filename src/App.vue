<template>
  <div id="app">
    <Home />
  </div>
</template>

<script lang="ts">
import Home from './pages/Home.vue';

export default {
  name: 'App',
  components: {
    Home,
  },
  methods: {
    clickMe() {
      alert('yes');
    },
  },
};
</script>


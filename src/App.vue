<template>
  <div id="app">
    The App
    <router-view></router-view>
    <Home />
  </div>
</template>

<script lang="ts">
import Home from './Home.vue';

export default {
  components: {
    Home,
  },
  name: 'App',
};
</script>


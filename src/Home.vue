<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>

  <ul v-if="users.length > 0">
    <li v-for="u in users" :key="u.id">
      {{u.email}}
    </li>
  </ul>
  <p v-else>No user</p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import HelloWorld from './components/HelloWorld.vue'
import isSSR from './_base/isSSR';

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld
  },
  setup() {
    const users = ref([]);

    const fetch = async () => {
      console.log('fetching ...');

      const { data } = await axios.get('https://reqres.in/api/users?page=2');

      users.value.splice(0, users.value.length, ...data.data);
    };

    if (!isSSR) {
      fetch();
    }

    return {
      users,
      fetch,
    };
  },
  async serverPrefetch() {
    await this.fetch();
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

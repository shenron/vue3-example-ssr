<template>
  <img alt="Vue logo" src="../assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App" />

  <ul v-if="users.length > 0">
    <li v-for="u in users" :key="u.id">
      {{ u.email }}
    </li>
  </ul>
  <p v-else>No user</p>
</template>

<script lang="ts">
import axios from 'axios';
import { computed, defineComponent } from 'vue';
import useStore from '../store/useVuexStore';
import HelloWorld from '../components/HelloWorld.vue';

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
  setup() {
    const store = useStore();

    const users = computed(() => store.state.users);

    const _fetch = async () => {
      console.log('fetching ...');

      const { data: res } = await axios.get('https://reqres.in/api/users?page=2');

      store.commit('setUsers', res.data);
    };

    if (!users.value.length) {
      _fetch();
    }

    return {
      users,
      _fetch,
    };
  },
  async serverPrefetch() {
    await this._fetch();
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

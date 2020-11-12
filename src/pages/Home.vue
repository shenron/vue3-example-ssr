<template>
  <img alt="Vue logo" src="../assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App" />

  <ul v-if="users.length > 0">
    <li v-for="u in users" :key="u.id">
      {{ u.email }}
    </li>

    <button @click="clicked">A button</button>
  </ul>
  <p v-else>No user</p>
</template>

<script lang="ts">
import axios from 'axios';
import HelloWorld from '../components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  mounted() {
    console.log(this.$store.state);
  },
  data() {
    return {
    };
  },
  computed: {
    users() {
      return this.$store.state.users;
    }
  },
  methods: {
    async fetch() {
      console.log('fetching ...');

      const { data } = await axios.get('https://reqres.in/api/users?page=2');

      this.$store.commit('setUsers', data.data);
    },
    clicked() {
      console.log('clicked');
    },
  },
  async serverPrefetch() {
    await this.fetch();
  },
};
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

import { createStore } from 'vuex'

const _createStore = () => createStore({
  state() {
    return {
      users: [],
    };
  },
  mutations: {
    setUsers(state, users) {
      state.users.splice(0, state.users.length)
      users.forEach((u) => {
        state.users.push(u)
      })
    }
  }
})

const vuexStore = _createStore();

export default vuexStore;

const useStore = () => {
  return {
    store: vuexStore,
    state: vuexStore.state,
  }
}

export {
  useStore,
}

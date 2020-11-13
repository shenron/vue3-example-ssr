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

const store = _createStore();

export default store;

const useStore = () => {
  return {
    store,
    state: store.state,
  }
}

export {
  useStore,
}

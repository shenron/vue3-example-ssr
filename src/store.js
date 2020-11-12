import { createStore } from 'vuex'

export default function () {
  return createStore({
    state() {
      return {
        count: 1,
        users: [],
      }
    },
    mutations: {
      setUsers(state, users) {
        users.forEach((u) => {
          state.users.push(u)
        })
      }
    }
  })
}

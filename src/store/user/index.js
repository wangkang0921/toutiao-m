import { getToken, setToken } from '@/utils/storage'

export default {
  namespaced: true,

  state: {
    token: getToken()
  },

  getters: {
  },

  mutations: {
    getUserToken (state, payload) {
      state.token = payload
      // 存入本地
      setToken(payload)
    }
  },

  actions: {
  }
}

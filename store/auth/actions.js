export default {
  async login({ commit, dispatch }, { userName, password }) {
    await this.$axios
      .$post('auth/login', { userName, password })
      .then((response) => {
        const user = response.user
        const token = response.token
        const expires = response.expires

        commit('setUser', user)
        commit('setToken', token)
        commit('setExpires', expires)

        this.$router.push('/chat')
      })
      .catch(() => {})
  },

  logout({ commit, state }) {
    commit('logout')
  },
}

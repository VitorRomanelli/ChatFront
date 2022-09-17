export default {
  async login({ commit, dispatch }, { userName, password }) {
    await this.$axios.$post(
      'auth/login',
      { userName, password }
    ).then((response) => {
      const user = response.content.user
      const token = response.content.token
      const expires = response.content.expires

      commit('setUser', user);
      commit('setToken', token);
      commit('setExpires', expires);

      this.$router.push('/chat')
    }).catch(() => { })
  },

  logout({ commit, state }) {
    commit('logout')
  },
}

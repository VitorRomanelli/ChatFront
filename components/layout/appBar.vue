<template>
  <v-app-bar elevation="0" app color="background">
    <v-btn to="/chat" text style="text-transform: none" nuxt link plain>
      <v-app-bar-nav-icon>
        <v-img src="bubble-chat.png" max-height="28" contain></v-img>
      </v-app-bar-nav-icon>
      <div class="t1">Chat.io</div>
    </v-btn>

    <v-spacer></v-spacer>

    <v-menu transition="scroll-y-transition" offset-y>
      <template #activator="{ on, attrs }">
        <v-avatar
          color="syswhite"
          class="ml-3"
          size="50"
          v-bind="attrs"
          v-on="on"
        >
          <v-img v-if="user.pic" :src="env + user.pic"></v-img>
          <v-icon v-else color="sysgrey">mdi-account-outline</v-icon>
        </v-avatar>
      </template>

      <v-card class="pa-4 pt-6 text-center" elevation="0">
        <v-avatar color="background" size="60">
          <v-img v-if="user.pic" :src="env + user.pic"></v-img>
          <v-icon v-else color="sysgrey">mdi-account-outline</v-icon>
        </v-avatar>

        <br />

        <strong class="my-2">{{ `${user.userName}` }}</strong>
        <v-divider class="ma-2"></v-divider>
        <span class="label">{{ user.name }}</span>
        <br />
        <p class="label">{{ user.email }}</p>

        <div>
          <v-btn style="text-transform: none" text nuxt to="/user">
            Perfil
          </v-btn>
        </div>

        <div>
          <v-btn style="text-transform: none" text @click="logout">Sair</v-btn>
        </div>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar',

  data() {
    return {
      env: '',
    }
  },

  computed: {
    user() {
      return this.$store.state.auth.user !== null
        ? this.$store.state.auth.user
        : {}
    },
  },

  created() {
    this.env = process.env.API_KEY
  },

  methods: {
    logout() {
      this.$router.push('/')
      this.$store.dispatch('auth/logout')
    },
  },
}
</script>

<style lang="sss" scoped></style>

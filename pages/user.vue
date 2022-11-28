<template>
  <v-row class="ma-0 flex-row-reverse flex-sm-row">
    <v-col cols="12">
      <h1 class="text-start t2 ml-2">Informações:</h1>
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field
        v-model="user.name"
        label="Nome"
        background-color="syswhite"
        filled
        rounded
        hide-details
        class="mb-4"
      >
      </v-text-field>

      <v-text-field
        v-model="user.userName"
        label="Nome de usuário"
        disabled
        background-color="syswhite"
        filled
        rounded
        hide-details
        class="mb-4"
      >
      </v-text-field>

      <v-text-field
        v-model="user.email"
        label="E-mail"
        background-color="syswhite"
        filled
        rounded
        hide-details
        class="mb-4"
      >
      </v-text-field>

      <v-textarea
        v-model="user.biography"
        label="Biografia"
        background-color="syswhite"
        filled
        rounded
        no-resize
        hide-details
        class="mb-4"
      >
      </v-textarea>
    </v-col>
    <v-col cols="12" sm="6">
      <v-card elevation="0" class="text-center rounded-xl pa-4">
        <div class="d-flex justify-center mb-4">
          <v-avatar size="100" color="background">
            <v-icon x-large>mdi-account-outline</v-icon>
          </v-avatar>
        </div>

        <strong class="t2">{{ `${user.userName}` }}</strong>
        <v-divider class="my-4 mx-auto" style="max-width: 200px"></v-divider>
        <span class="label">{{ user.name }}</span>
        <br />
        <p class="label">{{ user.email }}</p>
      </v-card>

      <div class="mt-4 d-flex flex-wrap justify-end">
        <v-btn
          class="ma-1"
          rounded
          large
          depressed
          dark
          color="sysgrey"
          nuxt
          @click="$router.go(-1)"
        >
          Cancelar
        </v-btn>

        <v-btn
          class="ma-1"
          rounded
          large
          depressed
          color="secondary"
          nuxt
          :loading="$nuxt.$root.$loading ? $nuxt.$root.$loading.loading : false"
          @click="submit"
        >
          Atualizar
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'UserPage',

  computed: {
    user() {
      return this.$store.state.auth.user !== null
        ? this.$store.state.auth.user
        : {}
    },
  },

  methods: {
    submit() {},
  },
}
</script>

<style></style>

<template>
  <v-row class="ma-0 flex-row-reverse flex-sm-row">
    <v-col cols="12">
      <h1 class="text-start t2 ml-2">Informações:</h1>
    </v-col>
    <v-col cols="12" sm="6">
      <v-form ref="form">
        <v-text-field
          v-model="localUser.name"
          label="Nome"
          :rules="[(v) => !!v || 'Campo obrigatório']"
          background-color="syswhite"
          filled
          rounded
          hide-details="auto"
          class="mb-4"
        >
        </v-text-field>

        <v-text-field
          v-model="localUser.userName"
          label="Nome de usuário"
          disabled
          background-color="syswhite"
          filled
          rounded
          hide-details="auto"
          class="mb-4"
        >
        </v-text-field>

        <v-text-field
          v-model="localUser.email"
          :rules="[(v) => !!v || 'Campo obrigatório']"
          label="E-mail"
          background-color="syswhite"
          filled
          rounded
          hide-details="auto"
          class="mb-4"
        >
        </v-text-field>

        <v-textarea
          v-model="localUser.biography"
          label="Biografia"
          background-color="syswhite"
          filled
          rounded
          no-resize
          hide-details="auto"
          class="mb-4"
        >
        </v-textarea>
      </v-form>
    </v-col>
    <v-col cols="12" sm="6">
      <v-card elevation="0" class="text-center rounded-xl pa-4">
        <div class="d-flex justify-center mb-4">
          <v-hover v-slot="{ hover }">
            <v-avatar
              :class="{ 'on-hover': hover }"
              size="100"
              color="background"
              class="avatar"
            >
              <img
                v-if="localUser.pic"
                :src="localUser.pic"
                :alt="localUser.name"
                class="avatar"
                style="position: absolute; margin: 0 auto"
              />
              <v-icon
                v-if="!hover && !localUser.pic"
                x-large
                style="position: absolute; margin: 0 auto"
              >
                mdi-account-outline
              </v-icon>
              <v-slide-y-transition>
                <div
                  v-if="hover"
                  class="transition-fast-in-fast-out"
                  style="width: 100%; height: 100%; border-radius: 50%"
                  @click="openPicker"
                >
                  <v-icon v-if="hover" large style="transition: 0.3s">
                    mdi-pencil-outline
                  </v-icon>
                </div>
              </v-slide-y-transition>
            </v-avatar>
          </v-hover>

          <v-file-input
            id="file-input"
            class="d-none"
            accept="image/png, image/jpeg, image/bmp"
            @change="setImage"
          ></v-file-input>
        </div>

        <strong class="t2">{{ `${localUser.userName}` }}</strong>
        <v-divider class="my-4 mx-auto" style="max-width: 200px"></v-divider>
        <span class="label">{{ localUser.name }}</span>
        <br />
        <p class="label">{{ localUser.email }}</p>
        <p class="label">{{ localUser.biography }}</p>
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
          color="primary"
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

  data() {
    return {
      localUser: {},
    }
  },

  created() {
    const env = process.env.API_KEY
    this.localUser = { ...this.$store.state.auth.user }
    this.localUser.pic = this.localUser.pic ? env + this.localUser.pic : ''
  },

  methods: {
    openPicker() {
      document.getElementById('file-input').click()
    },

    setImage(image) {
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onload = () => {
        this.localUser.pic = reader.result
        this.localUser.picExtension = image.type.split('/')[1]
      }
    },

    submit() {
      if (this.$refs.form.validate()) {
        this.$axios.$put('user/edit', this.localUser).then((response) => {
          const updated = response
          this.$store.commit('auth/setUser', updated)
          this.$toast.success('Dados atualizados com sucesso!')
        })
      }
    },
  },
}
</script>

<style scoped>
.avatar {
  object-fit: cover;
  transition: opacity 0.4s ease-in-out;
}

.avatar:not(.on-hover) {
  opacity: 0.6;
}
</style>

<template>
  <v-container>
    <v-row class="ma-0" align="center">
      <v-col cols="12" sm="8">
        <AnimatedIntro />
      </v-col>
      <v-col>
        <v-card elevation="0" class="pa-6 rounded-xl">
          <div class="d-flex flex-column align-center">
            <v-img
              src="bubble-chat.png"
              max-height="50"
              max-width="50"
              contain
            ></v-img>
            <div class="t1">Chat.io</div>
          </div>

          <v-window v-model="tab" reverse>
            <v-window-item>
              <v-form ref="form">
                <div class="mt-4">
                  <v-text-field
                    v-model="user.userName"
                    label="Usuário"
                    :rules="[(v) => !!v || 'Usuário requerido']"
                    color="secondary"
                    background-color="background"
                    filled
                    rounded
                  >
                  </v-text-field>

                  <v-text-field
                    v-model="user.password"
                    autocomplete="Senha atual"
                    label="Senha"
                    :type="viewPass ? 'text' : 'password'"
                    :append-icon="
                      viewPass ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
                    "
                    prepend-inner-icon="mdi-lock-plus-outline"
                    color="secondary"
                    :rules="[(v) => !!v || 'Senha requerida']"
                    background-color="background"
                    filled
                    rounded
                    @keyup.enter="submit"
                    @click:append="viewPass = !viewPass"
                  >
                  </v-text-field>
                </div>
              </v-form>
            </v-window-item>

            <v-window-item>
              <v-form ref="form">
                <div class="mt-4">
                  <v-text-field
                    v-model="user.Name"
                    label="Nome"
                    color="secondary"
                    background-color="background"
                    :rules="[(v) => !!v || 'Nome requerido']"
                    filled
                    rounded
                  >
                  </v-text-field>

                  <v-text-field
                    v-model="user.userName"
                    label="Nome de usuário"
                    color="secondary"
                    :rules="[(v) => !!v || 'Nome de usuário requerido']"
                    background-color="background"
                    filled
                    rounded
                  >
                  </v-text-field>

                  <v-text-field
                    v-model="user.email"
                    label="E-mail"
                    :rules="[(v) => !!v || 'E-mail requerido']"
                    color="secondary"
                    background-color="background"
                    filled
                    rounded
                  >
                  </v-text-field>

                  <v-text-field
                    v-model="user.password"
                    autocomplete="Nova senha"
                    label="Senha"
                    :type="viewPass ? 'text' : 'password'"
                    :append-icon="
                      viewPass ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
                    "
                    prepend-inner-icon="mdi-lock-plus-outline"
                    color="secondary"
                    :rules="[(v) => !!v || 'Senha requerida']"
                    background-color="background"
                    filled
                    rounded
                    @click:append="viewPass = !viewPass"
                  >
                  </v-text-field>

                  <v-text-field
                    v-model="user.passConfirm"
                    :type="viewPassConfirm ? 'text' : 'password'"
                    :append-icon="
                      viewPassConfirm
                        ? 'mdi-eye-outline'
                        : 'mdi-eye-off-outline'
                    "
                    label="Confirme a senha"
                    prepend-inner-icon="mdi-lock-check-outline"
                    :rules="[
                      (v) => !!v || 'Confirmação requerida',
                      (v) =>
                        v == user.password ||
                        'Confirmação deve ser igual a senha inserida acima',
                    ]"
                    autocomplete="Confirmação de senha"
                    color="secondary"
                    background-color="background"
                    filled
                    rounded
                    @click:append="viewPassConfirm = !viewPassConfirm"
                  >
                  </v-text-field>
                </div>
              </v-form>
            </v-window-item>
          </v-window>

          <div class="d-flex justify-end">
            <v-btn
              rounded
              large
              depressed
              color="secondary"
              nuxt
              :loading="
                $nuxt.$root.$loading ? $nuxt.$root.$loading.loading : false
              "
              @click="submit"
            >
              {{ tab == 0 ? 'Entrar' : 'Cadastrar' }}
            </v-btn>
          </div>

          <v-divider class="mt-4 mb-2 mx-6"></v-divider>

          <div class="d-flex justify-center">
            <v-btn
              link
              text
              color="secondary"
              style="text-transform: none"
              @click="tab == 0 ? (tab = 1) : (tab = 0)"
            >
              {{ tab == 0 ? 'Registre-se' : 'Voltar para login' }}
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',

  layout: 'external',

  data() {
    return {
      tab: 0,
      user: {},
      viewPass: false,
      viewPassConfirm: false,
    }
  },

  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        if (this.tab === 0) {
          await this.login()
        } else {
          await this.register()
        }
      }
    },

    async login() {
      await this.$store.dispatch('auth/login', this.user)
    },

    async register() {
      await this.$axios
        .$post('user/add', this.user)
        .then(() => {
          this.$toast.success('Cadastro efetuado!')
          this.tab = 0
        })
        .catch(() => {})
    },
  },
}
</script>

<style lang="sss" scoped></style>

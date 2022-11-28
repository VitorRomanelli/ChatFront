<template>
  <v-container>
    <v-dialog v-model="dialog" max-width="450">
      <ContactAdd />
    </v-dialog>

    <v-row class="ma-0" dense>
      <v-col cols="12" sm="4">
        <v-text-field
          placeholder="Pesquisar"
          background-color="syswhite"
          filled
          rounded
          hide-details
          class="mb-4"
        >
          <template #prepend-inner>
            <v-icon size="20" style="margin-top: 1px">mdi-magnify</v-icon>
          </template>
        </v-text-field>

        <v-card elevation="0" class="rounded-xl pa-2">
          <div v-for="i in contacts" :key="i">
            <ChatUserCard />
            <v-divider class="my-1" style="margin: 0 60px"></v-divider>
          </div>
          <v-card
            v-if="contacts.length == 0"
            class="rounded-xl text-center pa-3"
            elevation="0"
          >
            <span class="label"> Seus contatos apareceram aqui... </span>
          </v-card>
        </v-card>
      </v-col>

      <v-col cols="12" sm="8">
        <div class="mb-4 d-flex justify-end">
          <v-btn
            style="text-transform: none"
            rounded
            color="syswhite"
            height="56"
            depressed
            @click=";(dialogKey = !dialogKey), (dialog = true)"
          >
            Adicionar contato
          </v-btn>
          <!-- <v-menu left offset-y>
            <template #activator="{ on, attrs }">
              <v-btn
                fab
                depressed
                v-bind="attrs"
                color="syswhite"
                height="56"
                v-on="on"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list> </v-list>
          </v-menu> -->
        </div>

        <v-card elevation="0" class="rounded-xl pa-4 d-flex flex-column">
          <div
            v-if="!chatId"
            class="py-8 d-flex flex-column justify-center align-center"
          >
            <img
              style="max-height: 100px"
              alt="chat"
              src="bubble-chat.png"
              contain
            />
            <h1 class="t2">Bem vindo ao Chat.io!</h1>
          </div>

          <template v-else>
            <ChatLeftMessage />

            <ChatRightMessage />

            <div class="d-flex align-center mt-4">
              <v-text-field
                placeholder="Mensagem"
                background-color="background"
                filled
                rounded
                hide-details
              >
                <template #prepend-inner>
                  <v-menu
                    v-model="menu"
                    top
                    offset-y
                    :close-on-content-click="false"
                  >
                    <template #activator="{ on, attrs }">
                      <v-icon class="mr-2 emoji-icon" v-bind="attrs" v-on="on">
                        mdi-sticker-emoji
                      </v-icon>
                    </template>

                    <VEmojiPicker @select="emoji" />
                  </v-menu>
                </template>
              </v-text-field>
              <v-btn elevation="0" fab color="primary" class="ml-4">
                <v-icon>mdi-send</v-icon>
              </v-btn>
            </div>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ChatPage',

  data() {
    return {
      emojimessage: '',
      chatId: '',
      menu: false,
      dialog: false,
      dialogKey: false,
      contacts: [],
    }
  },

  methods: {
    emoji(emoji) {
      this.emojimessage = emoji.data
      this.menu = false
    },
  },
}
</script>

<style scoped>
.emoji-icon:hover {
  color: var(--v-secondary-base) !important;
}
</style>

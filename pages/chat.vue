<template>
  <v-container>
    <v-dialog v-model="dialog" max-width="450">
      <ContactAdd @confirm=";(dialog = false), getChats()" />
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
          <div v-for="i in chats" :key="i.id">
            <ChatUserCard
              :contact="i.contact"
              @use="
                ;(chatId = i.id), (selectedContact = i.contact), getMessages()
              "
            />
            <v-divider class="my-1" style="margin: 0 60px"></v-divider>
          </div>
          <v-card
            v-if="chats.length == 0"
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
            <div class="pb-2">
              <ChatUserCard :contact="selectedContact" />
            </div>

            <div
              v-if="messages.length > 0"
              class="d-flex flex-column justify-space-between messages"
            >
              <ChatLeftMessage
                v-for="recMes in messages.filter(
                  (x) => x.senderUserId != user.id
                )"
                :key="recMes.id"
                :message="recMes.content"
                :time="recMes.createdAt"
              />

              <ChatRightMessage
                v-for="senderMes in messages.filter(
                  (x) => x.senderUserId == user.id
                )"
                :key="senderMes.id"
                :message="senderMes.content"
                :time="senderMes.createdAt"
              />
            </div>

            <div
              v-else
              class="ma-auto my-4 py-2 d-flex flex-column justify-center align-center background text-center primary2--text rounded-lg"
              style="max-width: 300px"
            >
              <h3>Diga Olá!</h3>
              Ainda não há mensagens registradas nesse chat!
            </div>

            <v-form ref="form">
              <div class="d-flex align-center mt-4">
                <v-text-field
                  v-model="message"
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
                        <v-icon
                          class="mr-2 emoji-icon"
                          v-bind="attrs"
                          v-on="on"
                        >
                          mdi-sticker-emoji
                        </v-icon>
                      </template>

                      <VEmojiPicker @select="emoji" />
                    </v-menu>
                  </template>
                </v-text-field>
                <v-btn
                  elevation="0"
                  fab
                  color="primary"
                  class="ml-4"
                  @click="send"
                >
                  <v-icon>mdi-send</v-icon>
                </v-btn>
              </div>
            </v-form>
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
      message: '',
      messages: [],
      emojimessage: '',
      chatId: '',
      menu: false,
      dialog: false,
      dialogKey: false,
      chats: [],
      page: 1,
      selectedContact: {},
      filter: {
        page: 1,
        pageSize: 6,
        name: '',
      },
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
    this.getChats()
  },

  methods: {
    send() {
      const model = {
        chatId: this.chatId,
        isToGroup: false,
        groupId: null,
        senderUserId: this.user.id,
        recipientUserId: this.selectedContact.id,
        message: this.message,
        type: 0,
      }
      this.$axios.$post('chat/message', model).then((response) => {
        this.$refs.form.reset()
      })
    },

    getMessages() {
      this.$axios
        .$get(`chat/message?chatId=${this.chatId}&page=${this.page}`)
        .then((response) => {
          this.messages = response.data
        })
    },

    getChats() {
      this.filter.userId = this.user.id

      this.$axios.$post('chat/paginated', this.filter).then((response) => {
        this.chats = response.data
      })
    },

    emoji(emoji) {
      this.emojimessage = emoji.data
      this.menu = false
    },
  },
}
</script>

<style scoped>
.messages {
  overflow-y: auto;
  max-height: 50vh;
  padding-right: 40px;
}

.messages::-webkit-scrollbar {
  width: 8px;
  border-radius: 6px;
  background: var(--v-background-base);
}

.messages::-webkit-scrollbar-thumb {
  width: 8px;
  border-radius: 6px;
  background: var(--v-sysgrey-base);
}

.emoji-icon:hover {
  color: var(--v-primary-base) !important;
}
</style>

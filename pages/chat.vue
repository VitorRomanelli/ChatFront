<template>
  <v-container>
    <v-dialog v-model="dialog" max-width="450">
      <ContactAdd @confirm=";(dialog = false), getChats()" />
    </v-dialog>

    <v-row class="ma-0" dense>
      <v-col cols="12" sm="4">
        <v-text-field
          v-model="filter.name"
          placeholder="Pesquisar"
          background-color="syswhite"
          filled
          rounded
          hide-details="auto"
          hint="Pressione ENTER para pesquisar"
          class="mb-4"
          @keyup.enter="getChats"
        >
          <template #prepend-inner>
            <v-icon size="20" style="margin-top: 1px">mdi-magnify</v-icon>
          </template>
        </v-text-field>

        <v-card elevation="0" class="rounded-xl pa-2">
          <div v-for="i in chats" :key="i.id">
            <ChatUserCard
              :contact="i.contact"
              :unseen-count="i.unseenCount"
              :last-message="i.lastMessage"
              @use="
                ;(chatId = i.id),
                  (selectedContact = i.contact),
                  (page = 1),
                  messageSocket(),
                  getMessages(),
                  visualize()
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

            <div v-if="messages.length > 0" id="messages" class="messages">
              <v-card v-if="showIntersecCard" v-intersect="getMoreMessages">
              </v-card>

              <div
                v-for="(mes, i) in messages"
                :key="mes.id + i"
                class="d-flex flex-column justify-space-between"
              >
                <ChatLeftMessage
                  v-if="mes.senderUserId != user.id"
                  :key="mes.id"
                  :type="mes.type"
                  :message="mes.content"
                  :visualized="mes.visualized"
                  :time="mes.createdAt"
                />

                <ChatRightMessage
                  v-if="mes.senderUserId == user.id"
                  :key="mes.id"
                  :message="mes.content"
                  :type="mes.type"
                  :visualized="mes.visualized"
                  :time="mes.createdAt"
                />
              </div>
            </div>

            <div
              v-else
              class="ma-auto my-4 py-2 d-flex flex-column justify-center align-center background text-center primary2--text rounded-lg"
              style="max-width: 300px"
            >
              <h3>Diga Olá!</h3>
              Ainda não há mensagens registradas nesse chat!
            </div>

            <v-form ref="form" on-submit="return false;" @submit.prevent="send">
              <div class="d-flex align-center mt-4">
                <v-text-field
                  v-model="message"
                  placeholder="Mensagem"
                  background-color="background"
                  filled
                  rounded
                  hide-details
                  @submit.prevent=""
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
      showIntersecCard: false,
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

  fetch() {
    this.getChats()
    this.userSocket()
  },

  computed: {
    user() {
      return this.$store.state.auth.user !== null
        ? this.$store.state.auth.user
        : {}
    },
  },

  watch: {
    'filter.name': {
      deep: true,
      handler() {
        if (this.filter.name === '') {
          this.getChats()
        }
      },
    },
  },

  methods: {
    visualize() {
      this.$axios.post(
        `chat/visualize?chatId=${this.chatId}&userId=${this.user.id}`
      )
    },

    messageSocket() {
      this.socketInstance = new WebSocket(
        `${process.env.API_KEY_SOCKET}?chatId=${this.chatId}&userId=${this.user.id}`
      )
      const $context = this
      this.socketInstance.onmessage = async function (e) {
        const socketMessage = await JSON.parse(e.data)
        if (socketMessage.messageId) {
          $context.messages.push(socketMessage.message)

          setTimeout(() => {
            const element = document.getElementById('messages')
            element.scrollTop = element.scrollHeight
          }, 50)
        }
      }
    },

    userSocket() {
      this.socketInstance = new WebSocket(
        `${process.env.API_KEY_SOCKET}?chatId=${this.user.id}&userId=${this.user.id}`
      )

      const $context = this

      this.socketInstance.onmessage = async function (e) {
        const socketMessage = await JSON.parse(e.data)
        if (socketMessage.isAdding) {
          $context.chats.push(socketMessage.chat)
        } else {
          $context.getChats()
        }
      }
    },

    send() {
      if (this.$refs.form.validate()) {
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
          const foundIdx = this.chats.findIndex((el) => el.id === this.chatId)
          const found = this.chats.find((el) => el.id === this.chatId)
          this.chats.splice(foundIdx, 1)
          this.chats.unshift(found)
        })
      }
    },

    getMoreMessages(entries, observer) {
      if (entries[0].isIntersecting) {
        this.page++
        this.$axios
          .$get(`chat/message?chatId=${this.chatId}&page=${this.page}`)
          .then((response) => {
            this.messages.unshift(...response.data)
            this.showIntersecCard = false

            setTimeout(() => {
              this.showIntersecCard = true
            }, 1000)
          })
      }
    },

    getMessages() {
      this.$axios
        .$get(`chat/message?chatId=${this.chatId}&page=${this.page}`)
        .then((response) => {
          this.messages = response.data.reverse()

          setTimeout(() => {
            const element = document.getElementById('messages')
            if (element) {
              element.scrollTop = element.scrollHeight
            }
          }, 20)

          setTimeout(() => {
            this.showIntersecCard = true
          }, 1000)
        })
    },

    getChats() {
      this.filter.userId = this.user.id

      this.$axios.$post('chat/paginated', this.filter).then((response) => {
        this.chats = response.data
        this.chats.sort(
          (a, b) =>
            new Date(b.lastMessage.createdAt) -
            new Date(a.lastMessage.createdAt)
        )
      })
    },

    emoji(emoji) {
      this.emojimessage = emoji.data
      this.menu = false

      const model = {
        chatId: this.chatId,
        isToGroup: false,
        groupId: null,
        senderUserId: this.user.id,
        recipientUserId: this.selectedContact.id,
        message: emoji.data,
        type: 1,
      }
      this.$axios.$post('chat/message', model).then((response) => {
        this.$refs.form.reset()
        const foundIdx = this.chats.findIndex((el) => el.id === this.chatId)
        const found = this.chats.find((el) => el.id === this.chatId)
        this.chats.splice(foundIdx, 1)
        this.chats.unshift(found)
      })
    },
  },
}
</script>

<style scoped>
.messages {
  overflow-y: auto;
  max-height: 50vh;
  padding-right: 40px;
  scroll-snap-type: y proximity;
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

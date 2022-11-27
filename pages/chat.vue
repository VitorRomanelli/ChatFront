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
          <div v-for="i in 4" :key="i">
            <ChatUserCard />
            <v-divider class="my-1" style="margin: 0 60px"></v-divider>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="8">
        <div class="mb-4 d-flex justify-end">
          <v-menu left offset-y>
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
            <v-list>
              <v-list-item link @click="dialog = true">
                <v-list-item-title>Adicionar contato</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <v-card elevation="0" class="rounded-xl pa-4 d-flex flex-column">
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
      menu: false,
      dialog: false,
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

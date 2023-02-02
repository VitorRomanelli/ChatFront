<template>
  <v-card
    class="user-card rounded-xl d-flex align-center pa-4"
    elevation="0"
    @click="$emit('use')"
  >
    <v-avatar>
      <v-img v-if="pic" :src="pic"></v-img>
      <v-icon v-else color="sysgrey">mdi-account-outline</v-icon>
    </v-avatar>
    <div class="no-wrap mx-2">
      <strong class="t3">{{ title }}</strong>
      <br />
      <span class="label">
        {{ message }}
      </span>
    </div>
    <v-spacer></v-spacer>
    <v-btn
      depressed
      fab
      color="secondary"
      small
      :loading="$nuxt.$root.$loading ? $nuxt.$root.$loading.loading : false"
      @click="add"
    >
      <v-icon class="ml-1" small>mdi-send</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
export default {
  name: 'ChatUserCard',

  props: {
    contactId: {
      type: String,
      default: '{Name}',
    },
    title: {
      type: String,
      default: '{Name}',
    },
    message: {
      type: String,
      default: '{Message}',
    },
    pic: {
      type: String,
      default: '{Message}',
    },
  },

  computed: {
    user() {
      return this.$store.state.auth.user !== null
        ? this.$store.state.auth.user
        : {}
    },
  },

  methods: {
    add() {
      const model = {
        senderUserId: this.user.id,
        recipientUserId: this.contactId,
      }

      this.$axios.$post('chat/add', model).then((response) => {
        this.$emit('confirm', response.chatId)
      })
    },
  },
}
</script>

<style lang="sass" scoped></style>

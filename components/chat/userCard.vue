<template>
  <v-card
    class="user-card rounded-xl d-flex pa-4"
    elevation="0"
    @click="$emit('use')"
  >
    <v-badge
      bordered
      bottom
      color="primary"
      offset-x="11"
      offset-y="11"
      :dot="unseenCount == 0"
      :content="unseenCount"
    >
      <v-avatar>
        <v-img v-if="contact.pic" :src="env + contact.pic"></v-img>
        <v-icon v-else color="sysgrey">mdi-account-outline</v-icon>
      </v-avatar>
    </v-badge>
    <div class="no-wrap mx-2">
      <strong class="t3">{{ contact.name }}</strong>
      <br />
      <span class="label">
        {{
          lastMessage
            ? lastMessage.content
            : contact.biography
            ? contact.biography
            : 'Olá, estou usando o Chat.io'
        }}
      </span>
    </div>

    <v-spacer></v-spacer>

    <strong class="t4">{{
      lastMessage ? $getHours(lastMessage.createdAt) : ''
    }}</strong>
  </v-card>
</template>

<script>
export default {
  name: 'ChatUserCard',
  props: {
    unseenCount: {
      type: Number,
      default: () => {},
    },
    lastMessage: {
      type: Object,
      default: () => {},
    },
    contact: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      env: '',
    }
  },

  created() {
    this.env = process.env.API_KEY
  },
}
</script>

<style lang="sass" scoped></style>

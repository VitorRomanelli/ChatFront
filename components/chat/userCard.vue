<template>
  <v-card
    class="user-card rounded-xl d-flex pa-4"
    elevation="0"
    @click="$emit('use')"
  >
    <v-badge bordered bottom color="primary" dot offset-x="10" offset-y="10">
      <v-avatar>
        <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
      </v-avatar>
    </v-badge>
    <div class="no-wrap mx-2">
      <strong class="t3">{{ contact.name }}</strong>
      <br />
      <span class="label">
        {{
          contact.biography ? contact.biography : 'Olá! estou usando Chat.io!'
        }}
      </span>
    </div>
    <strong class="t4"></strong>
  </v-card>
</template>

<script>
export default {
  name: 'ChatUserCard',
  props: {
    contact: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="sass" scoped></style>

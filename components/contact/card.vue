<template>
  <v-card
    class="user-card rounded-xl d-flex align-center pa-4"
    elevation="0"
    @click="$emit('use')"
  >
    <v-avatar>
      <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
    </v-avatar>
    <div class="no-wrap mx-2">
      <strong class="t3">{{ title }}</strong>
      <br />
      <span class="label">
        {{ message }}
      </span>
    </div>
    <v-spacer></v-spacer>
    <v-btn depressed fab color="primary" small>
      <v-icon class="ml-1" small>mdi-send</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
export default {
  name: 'ChatUserCard',

  props: {
    title: {
      type: String,
      default: '{Name}',
    },
    message: {
      type: String,
      default: '{Message}',
    },
  },
}
</script>

<style lang="sass" scoped></style>

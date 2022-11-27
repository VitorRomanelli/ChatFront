<template>
  <v-card
    class="user-card rounded-xl d-flex justify-space-between align-center pa-4"
    elevation="0"
    @click="$emit('use')"
  >
    <v-avatar>
      <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
    </v-avatar>
    <div class="no-wrap mx-2">
      <strong class="t3">Nome</strong>
      <br />
      <span class="label">
        Exemplo de mensagem de texto Exemplo de mensagem de texto
      </span>
    </div>
    <v-btn depressed fab color="primary" small>
      <v-icon class="ml-1" small>mdi-send</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
export default {
  name: 'ChatUserCard',
}
</script>

<style lang="sass" scoped></style>

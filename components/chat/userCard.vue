<template>
  <v-card
    class="user-card rounded-xl d-flex justify-space-between pa-4"
    elevation="0"
    @click="$emit('use')"
  >
    <v-badge bordered bottom color="primary" dot offset-x="10" offset-y="10">
      <v-avatar>
        <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
      </v-avatar>
    </v-badge>
    <div class="no-wrap mx-2">
      <strong class="t3">Nome</strong>
      <br />
      <span class="label">
        Exemplo de mensagem de texto Exemplo de mensagem de texto
      </span>
    </div>
    <strong class="t4">09:00</strong>
  </v-card>
</template>

<script>
export default {
  name: 'ChatUserCard',
}
</script>

<style lang="sass" scoped>
</style>
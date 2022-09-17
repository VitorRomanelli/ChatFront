<template>
  <div class="d-flex">
    <div class="text-center">
      <v-avatar size="70">
        <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
      </v-avatar>
      <br />
      <strong class="t4">09:00</strong>
    </div>
    <div>
      <v-card
        v-for="i in 2"
        :key="i"
        class="rounded-xl rounded-tl-0 pa-4 ma-2 text-center label"
        color="background"
        elevation="0"
      >
        Exemplo de mensagem de texto Exemplo de mensagem de texto
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatLeftMessage',
}
</script>

<style lang="sass" scoped>
</style>
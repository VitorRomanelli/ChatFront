<template>
  <v-app style="background: var(--v-background-base) !important">
    <v-app-bar elevation="0" app color="background">
      <v-app-bar-nav-icon>
        <v-img src="bubble-chat.png" max-height="28" contain></v-img>
      </v-app-bar-nav-icon>
      <div class="t1">Chat.io</div>
    </v-app-bar>

    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'ExternalLayout',
}
</script>

<style lang="scss" scoped>
</style>
<template>
  <v-app style="background: var(--v-background-base) !important">
    <v-container class="d-flex justify-center">
      <v-card
        elevation="0"
        class="pa-6 text-center rounded-xl flex-grow-1"
        max-width="500"
      >
        <h1>Ops...</h1>
        <h1 v-if="error.statusCode === 404">
          {{ pageNotFound }}
        </h1>
        <h1 v-else>
          {{ otherError }}
        </h1>
        <NuxtLink to="/"> Voltar ao site </NuxtLink>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'external',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: 'Página não encontrada!',
      otherError: 'Ocorreu um erro!',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>

<template>
  <v-card class="pa-4" color="background">
    <div class="text-center my-2">
      <strong class="t3">Contatos</strong>
    </div>

    <div>
      <v-text-field
        v-model="filter.name"
        placeholder="Pesquisar por nome de usuário"
        background-color="white"
        filled
        rounded
        class="mb-4"
        hint="Pressione ENTER para pesquisar"
        @keyup.enter="fetchData"
      >
        <template #prepend-inner>
          <v-icon size="20" style="margin-top: 1px">mdi-magnify</v-icon>
        </template>
      </v-text-field>
    </div>

    <div class="cards-div">
      <v-card
        v-if="contacts.length == 0"
        class="rounded-xl text-center pa-3"
        elevation="0"
      >
        <span class="label">
          Os contatos encontrados seram exibidos aqui...
        </span>
      </v-card>
      <div v-for="i in contacts" v-else :key="i.id" class="my-2">
        <ContactCard />
      </div>

      <v-card
        v-if="contacts.length >= 10"
        v-intersect="infiniteScrolling"
      ></v-card>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'ContactAdd',

  data() {
    return {
      filter: {
        name: '',
        page: 1,
        pageSize: 10,
      },
      contacts: [],
    }
  },

  methods: {
    fetchData() {
      this.$axios.$post('user/paginated', this.filter).then((response) => {
        this.contacts = response.users
      })
    },

    infiniteScrolling() {
      setTimeout(() => {
        this.filter.page++
        this.$axios.$post('user/paginated', this.filter).then((response) => {
          this.contacts.push(response)
        })
      }, 500)
    },
  },
}
</script>

<style scoped>
.cards-div {
  max-height: 400px;
  overflow-y: auto;
  padding-right: 10px;
}

.cards-div::-webkit-scrollbar {
  width: 10px;
  background-color: var(--v-background-base);
}

.cards-div::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: var(--v-sysgrey-base);
}
</style>

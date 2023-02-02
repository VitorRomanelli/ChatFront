<template>
  <div class="d-flex" style="align-self: end">
    <div>
      <v-card
        class="rounded-xl rounded-tr-0 pa-4 ma-2 text-center label background--text pb-6"
        style="position: relative"
        color="terciary"
        elevation="0"
      >
        {{ message }}

        <strong
          class="t6"
          style="position: absolute; bottom: 5px; right: 20px"
          >{{ $getHours(time) }}</strong
        >
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatRightMessage',

  props: {
    message: {
      type: String,
      default: '',
    },
    time: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="sass" scoped></style>

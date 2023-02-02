<template>
  <div class="d-flex">
    <div>
      <v-card
        class="rounded-xl rounded-tl-0 pa-4 ma-2 text-center label pb-6"
        style="position: relative"
        color="background"
        elevation="0"
      >
        <strong
          class="t6"
          style="position: absolute; bottom: 5px; left: 20px"
          >{{ $getHours(time) }}</strong
        >

        {{ message }}
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatLeftMessage',

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

<template>
  <div class="d-flex" style="align-self: end">
    <div>
      <v-card
        class="rounded-xl rounded-tr-0 pa-4 ma-2 text-center label background--text pb-6"
        style="position: relative"
        color="terciary"
        elevation="0"
      >
        <div
          :style="
            type == 0
              ? ''
              : 'font-size: 40px; padding-top: 10px; padding-bottom: 5px'
          "
        >
          {{ message }}
        </div>

        <strong class="t6" style="position: absolute; bottom: 3px; right: 14px">
          {{ $getHours(time) }}
          <!-- <v-icon
            :color="visualized ? 'success' : 'sysgrey'"
            :x-small="!visualized"
            :small="visualized"
          >
            mdi-check-all
          </v-icon> -->
        </strong>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatRightMessage',

  props: {
    visualized: {
      type: Boolean,
      default: false,
    },
    type: {
      type: Number,
      default: 0,
    },
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

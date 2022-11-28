<template>
  <div v-if="loading" class="loading-page">
    <img class="loading" alt="chat" src="bubble-chat.png" contain />
  </div>
</template>
<script>
export default {
  name: 'AnimatedLoading',

  data: () => ({
    loading: false,
  }),

  methods: {
    start() {
      this.loading = true
    },

    finish() {
      this.loading = false
    },
  },
}
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem;
  text-align: center;
  font-size: 3rem;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading {
  max-height: 48px;
  animation: spin 1s ease-in-out alternate infinite;
}

@keyframes spin {
  to {
    opacity: 0.3;
  }
}
</style>

<script setup lang="ts">
  type Props = {
    height: number;
  };

  defineProps<Props>();
</script>

<template>
  <div class="card" :style="{ height: height + 'rem' }"></div>
</template>

<style lang="scss" scoped>
  .card {
    position: relative;
    overflow: hidden;
    background: var(--medium-gray-color);
    border-radius: 0.625rem;

    &::before {
      position: absolute;
      top: -20%;
      width: 10%;
      height: 200%;
      content: '';
      background-color: var(--light-color);
      filter: blur(0.625rem);
      opacity: 0.2;
      transform: rotate(20deg);
      animation: translate 1100ms linear infinite;
    }
  }

  @keyframes translate {
    0% {
      left: -40%;
    }

    100% {
      left: 100%;
    }
  }
</style>

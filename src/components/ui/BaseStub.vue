<script setup lang="ts">
  type Props = {
    title?: string;
    subtitle?: string;
  };

  defineProps<Props>();

  // Мб оставить только слот
</script>

<template>
  <section class="panel">
    <h1 v-if="title" class="title">{{ title }}</h1>
    <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
    <slot name="button"></slot>
  </section>
</template>

<style lang="scss" scoped>
  .panel {
    text-align: center;
  }

  .title {
    margin-bottom: 1rem;
    font-weight: 700;
    font-size: 1.75rem;
    line-height: 2.25rem;
    color: var(--dark-gray-color);
  }

  .subtitle {
    color: var(--dark-gray-color);
    max-width: 28.125rem;
    margin-right: auto;
    margin-bottom: 2.125rem;
    margin-left: auto;
    font-size: 1.125rem;
    line-height: 150%;
  }
</style>

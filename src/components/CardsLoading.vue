<script setup lang="ts">
  import { PER_PAGE } from '@/constants';
  import BaseEmptyCard from './ui/BaseEmptyCard.vue';

  type Props = {
    height?: number;
    perPage?: number;
  };

  withDefaults(defineProps<Props>(), {
    height: 25,
    perPage: PER_PAGE,
  });
</script>

<template>
  <ul class="list">
    <li v-for="index of perPage" :key="index">
      <BaseEmptyCard :height="height" />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  .list {
    display: flex;
    flex-direction: column;
    gap: 0.9375rem;
    padding-left: 0;
    list-style: none;
  }
</style>

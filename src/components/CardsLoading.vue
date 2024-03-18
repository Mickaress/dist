<script setup lang="ts">
  import BaseEmptyCard from './ui/BaseEmptyCard.vue';
  import { PER_PAGE } from '@/constants';

  const perPage = PER_PAGE;
</script>

<template>
  <ul class="list">
    <li v-for="index of perPage" :key="index">
      <BaseEmptyCard />
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

<script setup lang="ts">
  import type { VacancyType } from '@/models/Vacancy';
  import VacancyListCard from './VacancyListCard.vue';

  type Props = {
    vacancyList?: VacancyType[];
  };

  defineProps<Props>();
</script>

<template>
  <ul class="list">
    <li v-for="vacancy of vacancyList" :key="vacancy.id">
      <VacancyListCard :vacancy="vacancy" />
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

<script setup lang="ts">
  import { MINI_PER_PAGE, PER_PAGE } from '@/constants';
  import CardsLoading from './CardsLoading.vue';
  import BasePagination from './ui/BasePagination.vue';
  import BaseStub from './ui/BaseStub.vue';

  type Props = {
    isLoading: boolean;
    isMini?: boolean;
    isError: boolean;
    emptyTitle: string;
    emptySubtitle: string;
    totalItems: number;
  };

  withDefaults(defineProps<Props>(), {
    isMini: true,
  });
</script>

<template>
  <CardsLoading v-if="isLoading" :is-mini="isMini" />
  <BaseStub
    v-if="isError"
    title="Ошибка сервера"
    subtitle="В данный момент сервер не отвечает"
  ></BaseStub>
  <template v-if="!isLoading && !isError">
    <BaseStub v-if="totalItems === 0" :title="emptyTitle" :subtitle="emptySubtitle">
      <slot name="empty-button"></slot>
    </BaseStub>
    <template v-else>
      <ul class="list">
        <slot name="list"> </slot>
      </ul>
      <BasePagination
        v-if="!isLoading"
        :totalItems="totalItems"
        :page-size="isMini ? MINI_PER_PAGE : PER_PAGE"
      />
    </template>
  </template>
</template>

<style lang="scss" scoped>
  .list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>

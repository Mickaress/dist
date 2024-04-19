<script setup lang="ts">
  import { useGetSupervisorProjectVacanciesQuery } from '@/api/SupervisorApi/hooks/useGetSupervisorProjectVacanciesQuery';
  import BasePagination from '@/components/ui/BasePagination.vue';
  import BaseStub from '@/components/ui/BaseStub.vue';
  import VacancyList from '@/components/vacancy/VacancyList.vue';
  import { computed, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  const router = useRouter();
  const route = useRoute();

  const page = computed<number>(() => Number(route.query.page));

  const { data } = useGetSupervisorProjectVacanciesQuery();

  const changePage = (newPage: number) => {
    router.replace({ ...route, query: { page: newPage } });
    window.scrollTo({
      top: 0,
    });
  };

  watch(
    () => route.query.page,
    () => {
      router.replace({ ...route, query: { page: 1 } });
    },
    { immediate: true },
  );
  // TODO: Лучше протестировать, добавить больше вакансий
</script>

<template>
  <template v-if="data">
    <BaseStub v-if="data.vacancyCount === 0" title="У данного НИОКР нет вакансий"></BaseStub>
    <template v-else>
      <VacancyList :vacancy-list="data.vacancies" />
      <BasePagination
        :total-items="data.vacancyCount"
        :current-page="page"
        :set-page="changePage"
      />
    </template>
  </template>
</template>

<style lang="scss" scoped></style>

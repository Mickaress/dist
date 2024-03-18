<script setup lang="ts">
  import { useGetVacancyListWithFiltersQuery } from '@/api/VacancyApi/hooks/useGetVacancyListWithFiltersQuery';
  import CardsLoading from '@/components/CardsLoading.vue';
  import SidebarLayout from '@/components/layout/SidebarLayout.vue';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import BasePagination from '@/components/ui/BasePagination.vue';
  import BaseStub from '@/components/ui/BaseStub.vue';
  import VacancyList from '@/components/vacancy/VacancyList.vue';
  import VacancyListFilter from '@/components/vacancy/VacancyListFilter.vue';
  import VacancySearch from '@/components/vacancy/VacancySearch.vue';
  import { useVacancyFilterStore } from '../stores/vacancyFilter/useVacancyFilterStore';

  const vacancyListQuery = useGetVacancyListWithFiltersQuery();

  const vacancyFilterStore = useVacancyFilterStore();

  const setPage = (page: number) => {
    vacancyFilterStore.updateFilters({ page: page });
    window.scrollTo({
      top: 0,
    });
  };
</script>

<template>
  <header class="header">
    <h1 class="title">Все вакансии</h1>
    <p class="subtitle">На этой странице размещены открытые вакансии в НИОКР</p>
  </header>
  <aside class="header-controls">
    <VacancySearch />
  </aside>
  <SidebarLayout>
    <template #sidebar>
      <VacancyListFilter />
    </template>
    <template #main>
      <CardsLoading v-if="vacancyListQuery.isLoading.value" />
      <BaseStub
        v-if="vacancyListQuery.isError.value"
        title="Ошибка сервера"
        subtitle="В данный момент сервер не отвечает"
      >
      </BaseStub>
      <BaseStub
        v-if="vacancyListQuery.data.value?.vacancyCount === 0"
        title="Вакансии не найдены"
        subtitle="Пока нет ни одной вакансии с введённым названием и/или выбранными фильтрами"
      >
        <template #button>
          <BaseButton @click="vacancyFilterStore.clearFilter()">
            Сбросить фильтры
          </BaseButton>
        </template>
      </BaseStub>
      <template v-else>
        <VacancyList :vacancyList="vacancyListQuery.data.value?.vacancies" />
        <BasePagination
          :total-items="vacancyListQuery.data.value?.vacancyCount || 1"
          :setPage="setPage"
          :currentPage="vacancyFilterStore.page"
        />
      </template>
    </template>
  </SidebarLayout>
</template>

<style lang="scss" scoped>
  .header {
    margin-top: 4.75rem;
    margin-bottom: 2.8125rem;
  }
  .title {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 0.6875rem;
  }
  .subtitle {
    font-size: 1.125rem;
    font-weight: normal;
  }
  .header-controls {
    margin-bottom: 1.125rem;
  }
</style>

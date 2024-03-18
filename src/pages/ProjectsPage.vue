<script setup lang="ts">
  import { useGetProjectListWithFiltersQuery } from '@/api/ProjectApi/hooks/useGetProjectListWithFiltersQuery';
  import CardsLoading from '@/components/CardsLoading.vue';
  import SidebarLayout from '@/components/layout/SidebarLayout.vue';
  import ProjectList from '@/components/project/ProjectList.vue';
  import ProjectListFilter from '@/components/project/ProjectListFilter.vue';
  import ProjectSearch from '@/components/project/ProjectSearch.vue';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import BasePagination from '@/components/ui/BasePagination.vue';
  import BaseStub from '@/components/ui/BaseStub.vue';
  import { useProjectFilterStore } from '@/stores/projectFilter/useProjectFilterStore';

  const projectListQuery = useGetProjectListWithFiltersQuery();

  const projectFilterStore = useProjectFilterStore();

  const setPage = (page: number) => {
    projectFilterStore.updateFilters({ page: page });
    window.scrollTo({
      top: 0,
    });
  };
  // TODO: Вынести ProjectSearch в header
</script>

<template>
  <header class="header">
    <h1 class="title">Все НИОКР</h1>
    <p class="subtitle">На этой странице размещены все НИОКР</p>
  </header>
  <aside class="header-controls">
    <ProjectSearch />
  </aside>
  <SidebarLayout>
    <template #sidebar>
      <ProjectListFilter />
    </template>
    <template #main>
      <CardsLoading v-if="projectListQuery.isLoading.value" />
      <BaseStub
        v-if="projectListQuery.isError.value"
        title="Ошибка сервера"
        subtitle="В данный момент сервер не отвечает"
      >
      </BaseStub>
      <template v-if="projectListQuery.data.value">
        <BaseStub
          v-if="projectListQuery.data.value?.projectsCount === 0"
          title="НИОКР не найдены"
          subtitle="Пока нет ни одного НИОКР с введённым названием и/или выбранными фильтрами"
        >
          <template #button>
            <BaseButton @click="projectFilterStore.clearFilter()">
              Сбросить фильтры
            </BaseButton>
          </template>
        </BaseStub>
        <template v-else>
          <ProjectList :projectList="projectListQuery.data.value?.projects" />
          <BasePagination
            :total-items="projectListQuery.data.value?.projectsCount || 1"
            :setPage="setPage"
            :currentPage="projectFilterStore.page"
          />
        </template>
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

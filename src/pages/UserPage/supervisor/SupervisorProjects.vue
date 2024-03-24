<script setup lang="ts">
  import { useGetSupervisorProjectsQuery } from '@/api/SupervisorApi/hooks/useGetSupervisorProjectsQuery';
  import CardsLoading from '@/components/CardsLoading.vue';
  import ProjectList from '@/components/project/ProjectList.vue';
  import BasePagination from '@/components/ui/BasePagination.vue';
  import BaseStub from '@/components/ui/BaseStub.vue';
  import { useSupervisorProjectFilterStore } from '@/stores/supervisorProjectFilter/useProjectFilterStore';

  const {
    data: projectsData,
    isLoading,
    isError,
  } = useGetSupervisorProjectsQuery();

  const supervisorProjectFilterStore = useSupervisorProjectFilterStore();

  const setPage = (newPage: number) => {
    supervisorProjectFilterStore.updateFilters({ page: newPage });
    window.scrollTo({
      top: 0,
    });
  };
</script>

<template>
  <CardsLoading v-if="isLoading" />
  <BaseStub
    v-if="isError"
    title="Ошибка сервера"
    subtitle="В данный момент сервер не отвечает"
  >
  </BaseStub>
  <BaseStub
    v-if="projectsData?.projectsCount === 0"
    title="НИОКР не найдены"
    subtitle="Пока нет ни одного НИОКР с введённым названием и/или выбранными фильтрами"
  >
  </BaseStub>
  <template v-else-if="projectsData">
    <ProjectList :projectList="projectsData.projects" />
    <BasePagination
      :total-items="projectsData.projectsCount || 1"
      :setPage="setPage"
      :currentPage="supervisorProjectFilterStore.page"
    />
  </template>
</template>

<style lang="scss" scoped></style>

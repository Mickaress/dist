<script setup lang="ts">
  import { useGetSupervisorProjectsQuery } from '@/api/SupervisorApi/hooks/useGetSupervisorProjectsQuery';
  import CardsLoading from '@/components/CardsLoading.vue';
  import ProjectList from '@/components/project/ProjectList.vue';
  import BasePagination from '@/components/ui/BasePagination.vue';
  import BaseStub from '@/components/ui/BaseStub.vue';
  import { useSupervisorProjectFilterStore } from '@/stores/supervisorProjectFilter/useProjectFilterStore';

  const supervisorProjectsQuery = useGetSupervisorProjectsQuery();

  const supervisorProjectFilterStore = useSupervisorProjectFilterStore();

  const setPage = (newPage: number) => {
    supervisorProjectFilterStore.updateFilters({ page: newPage });
    console.log(newPage);
    window.scrollTo({
      top: 0,
    });
  };
</script>

<template>
  <CardsLoading v-if="supervisorProjectsQuery.isLoading.value" />
  <BaseStub
    v-if="supervisorProjectsQuery.isError.value"
    title="Ошибка сервера"
    subtitle="В данный момент сервер не отвечает"
  >
  </BaseStub>
  <BaseStub
    v-if="supervisorProjectsQuery.data.value?.projectsCount === 0"
    title="НИОКР не найдены"
    subtitle="Пока нет ни одного НИОКР с введённым названием и/или выбранными фильтрами"
  >
  </BaseStub>
  <template v-if="supervisorProjectsQuery.data.value">
    <ProjectList :projectList="supervisorProjectsQuery.data.value?.projects" />
    <BasePagination
      :total-items="supervisorProjectsQuery.data.value?.projectsCount || 1"
      :setPage="setPage"
      :currentPage="supervisorProjectFilterStore.page"
    />
  </template>
</template>

<style lang="scss" scoped></style>

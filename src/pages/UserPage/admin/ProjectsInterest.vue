<script setup lang="ts">
  import { useGetProjectsInterestQuery } from '@/api/AdminApi/hooks/useGetProjectsInterestQuery';
  import CardsLoading from '@/components/CardsLoading.vue';
  import BaseStub from '@/components/ui/BaseStub.vue';
  import ProjectsInterestList from '@/components/user/admin/ProjectsInterestList.vue';

  const { data: projects, isLoading, isError } = useGetProjectsInterestQuery();
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
    v-if="projects?.length === 0"
    title="НИОКР не найдены"
    subtitle="Пока нет ни одного НИОКР с введённым названием и/или выбранными фильтрами"
  >
  </BaseStub>
  <template v-else-if="projects">
    <ProjectsInterestList :projectList="projects" />
  </template>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
  import { useGetSingleProjectQuery } from '@/api/ProjectApi/hooks/useGetSingleProjectQuery';
  import ProjectTabs from '@/components/project/ProjectTabs.vue';
  import BaseBreadcrumbs from '@/components/ui/BaseBreadcrumbs.vue';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import BaseStub from '@/components/ui/BaseStub.vue';
  import { RouteNames } from '@/router/types/routeNames';
  import { RouterView, useRoute } from 'vue-router';

  const route = useRoute();

  const projectId = Number(route.params.id);
  const {
    data: project,
    isFetching,
    isError,
  } = useGetSingleProjectQuery(projectId);
</script>

<template>
  <BaseStub v-if="isFetching" title="Загрузка..." class="status"></BaseStub>
  <BaseStub v-if="isError" title="Ошибка сервера" class="status"></BaseStub>
  <template v-if="project">
    <header class="header">
      <BaseBreadcrumbs
        :breadcrumbs="[
          { title: 'Все НИОКР', to: { name: RouteNames.PROJECTS } },
          { title: project.title || '' },
        ]"
      />
      <h1>{{ project.title }}</h1>
    </header>
    <ProjectTabs />
    <RouterView />
  </template>
  <footer class="footer">
    <BaseButton
      variant="text"
      @click="$router.push({ name: RouteNames.PROJECTS })"
    >
      Назад к списку
    </BaseButton>
  </footer>
</template>

<style lang="scss" scoped>
  .status {
    margin-top: 2rem;
  }

  .header {
    margin-top: 2rem;

    h1 {
      font-size: 2.25rem;
      font-weight: bold;
      margin-top: 1.6875rem;
      margin-bottom: 1.875rem;
    }
  }

  .footer {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.25rem;
  }
</style>

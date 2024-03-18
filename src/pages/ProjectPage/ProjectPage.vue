<script setup lang="ts">
  import { useGetSingleProjectQuery } from '@/api/ProjectApi/hooks/useGetSingleProjectQuery';
  import ProjectTabs from '@/components/project/ProjectTabs.vue';
  import BaseBreadcrumbs from '@/components/ui/BaseBreadcrumbs.vue';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import { RouteNames } from '@/router/types/routeNames';
  import { useRoute } from 'vue-router';
  import { RouterView } from 'vue-router';

  const route = useRoute();

  const projectId = Number(route.params.id);
  const projectQuery = useGetSingleProjectQuery(projectId);
</script>

<template>
  <header class="header">
    <BaseBreadcrumbs
      :breadcrumbs="[
        { title: 'Все НИОКР', to: { name: RouteNames.PROJECTS } },
        { title: projectQuery.data.value?.title || '' },
      ]"
    />
    <h1>{{ projectQuery.data.value?.title }}</h1>
  </header>
  <ProjectTabs v-if="projectQuery.data.value" />
  <RouterView />
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
  .header {
    margin-top: 2rem;

    h1 {
      font-size: 2.25rem;
      font-weight: 700;
      margin-top: 1.6875rem;
      margin-bottom: 1.875rem;
    }
  }
  .info {
    h1 {
      font-weight: 400;
      font-size: 1.125rem;
      margin-bottom: 0.625rem;
    }
    p {
      font-size: 1.125rem;
      font-weight: 700;
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

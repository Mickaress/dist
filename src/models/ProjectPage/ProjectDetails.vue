<script setup lang="ts">
  import { useGetSingleProjectQuery } from '@/api/ProjectApi/hooks/useGetSingleProjectQuery';
  import AppList from '@/components/ui/AppList.vue';
  import BasePanel from '@/components/ui/BasePanel.vue';
  import GridLayout from '@/components/ui/GridLayout.vue';
  import TagList from '@/components/ui/TagList.vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const projectId = Number(route.params.id);
  const projectQuery = useGetSingleProjectQuery(projectId);
</script>

<template>
  <BasePanel v-if="projectQuery.data.value">
    <GridLayout cols="1fr 1fr">
      <AppList
        :items="[
          {
            title: 'Научный руководитель',
            content: projectQuery.data.value.supervisor.fio,
          },
          {
            title: 'Сроки реализации',
            content: projectQuery.data.value.period,
          },
        ]"
      />
      <div class="info">
        <h1>Условия труда</h1>
        <p>{{ projectQuery.data.value.conditions }}</p>
      </div>
    </GridLayout>
  </BasePanel>
  <BasePanel v-if="projectQuery.data.value">
    <AppList
      :items="[
        {
          title: 'Описание',
          content: `${projectQuery.data.value.description}`,
        },
        {
          title: 'Ожидаемые результаты',
          content: `${projectQuery.data.value.goal}`,
        },
      ]"
    />
    <div class="skills">
      <h1>Требуемые навыки</h1>
      <TagList isVisible :tag-list="projectQuery.data.value.skills" />
    </div>
  </BasePanel>
</template>

<style lang="scss" scoped>
  .info {
    h1 {
      font-size: 1.125rem;
      margin-bottom: 0.625rem;
    }
    p {
      font-size: 1.125rem;
      font-weight: bold;
    }
  }
  .skills {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
    h1 {
      min-width: 16rem;
      font-size: 1.125rem;
    }
  }
</style>

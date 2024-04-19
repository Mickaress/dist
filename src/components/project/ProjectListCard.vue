<script setup lang="ts">
  import { useGetUserInfoQuery } from '@/api/UserApi/hooks/useGetUserInfoQuery';
  import BaseBadge from '@/components/ui/BaseBadge.vue';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import type { ProjectType } from '@/models/Project';
  import { StateClass } from '@/models/State';
  import { createVacancyRoute, projectRoute } from '@/router/utils/route';
  import BasePanel from '../ui/BasePanel.vue';
  import SkillList from '../ui/SkillList.vue';

  type Props = {
    project: Omit<ProjectType, 'conditions' | 'vacancies'>;
  };

  defineProps<Props>();

  const { data: userData } = useGetUserInfoQuery();
</script>

<template>
  <BasePanel>
    <header class="header">
      <RouterLink :to="projectRoute(project.id)">
        <h1>
          {{ project.title }}
        </h1>
      </RouterLink>
      <BaseBadge :class="StateClass[project.state.id]">
        {{ project.state.state }}
      </BaseBadge>
      <p>
        {{ project.supervisor.fio }}
      </p>
    </header>
    <div class="divider"></div>
    <main class="main">
      <p>
        Описание:
        <span>{{ project.description }}</span>
      </p>
      <p>
        Цель:
        <span>{{ project.goal }}</span>
      </p>
      <p>
        Период работы:
        <span> {{ project.period }} </span>
      </p>
    </main>
    <footer class="footer">
      <SkillList :skill-ids="project.skills" />
      <div class="buttons">
        <BaseButton
          v-if="project.supervisor.id === userData?.id && project.state.id !== 2"
          is="router-link"
          variant="outlined"
          :to="createVacancyRoute(project.id)"
        >
          Добавить вакансию
        </BaseButton>
        <BaseButton is="router-link" :to="projectRoute(project.id)"> Подробнее </BaseButton>
      </div>
    </footer>
  </BasePanel>
</template>

<style lang="scss" scoped>
  .header {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: start;
    gap: 1rem;
    margin-bottom: 0.75rem;
    h1 {
      font-size: 1.5rem;
      margin-bottom: 0.75rem;

      &:hover {
        text-decoration: underline;
      }
    }
    p {
      font-weight: normal;
      grid-column: 1 / -1;
    }
  }
  .divider {
    width: 100%;
    height: 0.125rem;
    background-color: var(--medium-gray-color);
    margin-bottom: 0.875rem;
  }
  .main {
    p {
      font-weight: bold;
      margin-bottom: 1rem;
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    gap: 0.25rem;
    align-items: end;
  }
  .buttons {
    display: flex;
    gap: 8px;
  }
</style>

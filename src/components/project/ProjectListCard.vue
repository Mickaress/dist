<script setup lang="ts">
  import BaseBadge from '@/components/ui/BaseBadge.vue';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import TagList from '@/components/ui/TagList.vue';
  import type { ProjectType } from '@/models/Project';
  import { StateClass } from '@/models/State';
  import { projectRoute } from '@/router/utils/route';
  import BasePanel from '../ui/BasePanel.vue';

  type Props = {
    project: Omit<ProjectType, 'conditions' | 'vacancies'>;
  };

  defineProps<Props>();
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
      <TagList :tag-list="project.skills" />
      <BaseButton is="router-link" :to="projectRoute(project.id)">
        Подробнее
      </BaseButton>
    </footer>
  </BasePanel>
</template>

<style lang="scss" scoped>
  .header {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: start;
    gap: 1rem;
    h1 {
      font-size: 1.5rem;
      margin-bottom: 0.75rem;

      &:hover {
        text-decoration: underline;
      }
    }
    p {
      font-weight: normal;
      margin-bottom: 0.75rem;
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
      font-weight: 700;
      margin-bottom: 1rem;
    }
  }
  .footer {
    display: flex;
    gap: 0.25rem;
  }
</style>

<script setup lang="ts">
  import BaseBadge from '@/components/ui/BaseBadge.vue';
  import TagList from '@/components/ui/TagList.vue';
  import type { ProjectType } from '@/models/Project';
  import { StateClass } from '@/models/State';
  import { projectRoute } from '@/router/utils/route';

  type Props = {
    project?: Omit<ProjectType, 'conditions' | 'vacancies'>;
  };

  defineProps<Props>();
  // TODO: Можно заменить на BasePanel
</script>

<template>
  <article v-if="project" class="card">
    <header class="header">
      <div class="flex">
        <RouterLink :to="projectRoute(project.id)">
          <h1>
            {{ project.title }}
          </h1>
        </RouterLink>
        <BaseBadge :class="StateClass[project.state.id]">{{
          project.state.state
        }}</BaseBadge>
      </div>
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
    </main>
    <footer class="footer">
      <TagList :tag-list="project.skills" />
      <p class="views">Просмотров: {{ project.views }}</p>
    </footer>
  </article>
</template>

<style lang="scss" scoped>
  .card {
    width: 100%;
    background-color: var(--light-color);
    border-radius: 0.625rem;
    padding: 1.375rem;
    box-shadow: 0 0 0.3125rem rgb(0 0 0 / 18%);
  }
  .flex {
    display: flex;
    gap: 12px;
    justify-content: space-between;
    align-items: start;
  }
  .header {
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
  .views {
    white-space: nowrap;
  }
</style>

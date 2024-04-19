<script setup lang="ts">
  import BaseBadge from '@/components/ui/BaseBadge.vue';
  import type { ProjectType } from '@/models/Project';
  import { StateClass, StateType } from '@/models/State';
  import BasePanel from '../ui/BasePanel.vue';

  type Props = {
    project: Omit<ProjectType, 'conditions' | 'vacancies'>;
    title: String;
    state: StateType;
  };

  defineProps<Props>();

  // TODO: вряд ли нужен
</script>

<template>
  <BasePanel>
    <header class="header">
      <div class="wrapper">
        <h1>{{ title }}</h1>
        <BaseBadge :class="StateClass[state.id]">{{ state.state }}</BaseBadge>
      </div>
      <slot name="header"> </slot>
    </header>
    <div class="divider"></div>
    <main class="main">
      <slot name="main"> </slot>
    </main>
    <footer class="footer">
      <slot name="footer"></slot>
    </footer>
  </BasePanel>
</template>

<style lang="scss" scoped>
  .header {
  }
  .wrapper {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: center;
  }
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

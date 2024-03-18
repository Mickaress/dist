<script setup lang="ts">
  import type { ProjectType } from '@/models/Project';
  import ProjectListCard from './ProjectListCard.vue';

  type Props = {
    projectList?: ProjectType[];
  };

  defineProps<Props>();
</script>

<template>
  <ul class="list">
    <li v-for="project of projectList" :key="project.id">
      <ProjectListCard :project="project" />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  .list {
    display: flex;
    flex-direction: column;
    gap: 0.9375rem;
  }
</style>

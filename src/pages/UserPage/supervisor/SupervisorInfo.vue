<script setup lang="ts">
  import AppList from '@/components/ui/AppList.vue';
  import { SupervisorType } from '@/models/User';

  type Props = {
    userInfo: SupervisorType;
  };

  defineProps<Props>();
</script>

<template>
  <h1>Контактная информация</h1>
  <AppList
    class="app-list"
    :items="[
      {
        title: 'E-Mail:',
        content: `${userInfo.email}`,
      },
      {
        title: 'Телефон:',
        content: `${userInfo.phone}`,
      },
    ]"
  />
</template>

<style lang="scss" scoped>
  h1 {
    font-size: 1.125rem;
    font-weight: bold;
    margin-bottom: 1.0625rem;
  }
  .app-list {
    &:deep(h1) {
      color: var(--dark-gray-color);
    }
  }
</style>

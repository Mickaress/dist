<script setup lang="ts">
  import SidebarLayout from '@/components/layout/SidebarLayout.vue';
  import UserTabs from '@/components/user/UserTabs.vue';
  import { RouterView } from 'vue-router';
</script>

<template>
  <header class="header">
    <h1>Профиль пользователя</h1>
  </header>
  <SidebarLayout>
    <template #sidebar>
      <UserTabs />
    </template>
    <template #main>
      <RouterView />
    </template>
  </SidebarLayout>
</template>

<style lang="scss" scoped>
  .header {
    margin-top: 2rem;

    h1 {
      font-size: 2.25rem;
      font-weight: bold;
      margin-top: 1.6875rem;
      margin-bottom: 1.875rem;
    }
  }
</style>

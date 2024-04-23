<script setup lang="ts">
  import { useGetUserInfoQuery } from '@/api/UserApi/hooks/useGetUserInfoQuery';
  import SidebarLayout from '@/components/layout/SidebarLayout.vue';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import UserTabs from '@/components/user/UserTabs.vue';
  import { CandidateType, SupervisorType } from '@/models/User';
  import { RouteNames } from '@/router/types/routeNames';
  import { RouterView } from 'vue-router';

  const { data } = useGetUserInfoQuery();

  // TODO: Костыль
  const CandidateData = data.value as CandidateType;
  const SupervisorData = data.value as SupervisorType;

  const isAdmin = !(CandidateData.birthday || SupervisorData.phone);
</script>

<template>
  <SidebarLayout>
    <template #header>
      <div class="user__header">
        <h1>Профиль пользователя</h1>
        <BaseButton v-if="isAdmin" is="router-link" :to="{ name: RouteNames.ADMIN_PROJECT_CREATE }">
          Создать НИОКР
        </BaseButton>
      </div>
    </template>
    <template #sidebar>
      <UserTabs />
    </template>
    <template #main>
      <RouterView />
    </template>
  </SidebarLayout>
</template>

<style lang="scss" scoped>
  .user__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;

    h1 {
      font-size: 2.5rem;
      font-weight: bold;
    }
  }
</style>

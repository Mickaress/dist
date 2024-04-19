<script setup lang="ts">
  import { useGetUserInfoQuery } from '@/api/UserApi/hooks/useGetUserInfoQuery';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import BasePanel from '@/components/ui/BasePanel.vue';
  import { AdminType, CandidateType, SupervisorType } from '@/models/User';
  import AdminInfo from './admin/AdminInfo.vue';
  import CandidateInfo from './candidate/CandidateInfo.vue';
  import SupervisorInfo from './supervisor/SupervisorInfo.vue';

  const { data } = useGetUserInfoQuery();

  // TODO: Костыль
  const CandidateData = data.value as CandidateType;
  const SupervisorData = data.value as SupervisorType;
  const AdminData = data.value as AdminType;
</script>

<template>
  <BasePanel v-if="data" class="info">
    <h1 class="fio">{{ data.fio }}</h1>
    <CandidateInfo v-if="CandidateData.institute" :user-info="CandidateData" />
    <SupervisorInfo v-else-if="SupervisorData.phone" :user-info="SupervisorData" />
    <AdminInfo v-else :user-info="AdminData" />
    <BaseButton variant="outlined" is="a" href="https://int.istu.edu/" target="_blank">
      Редактировать профиль
    </BaseButton>
  </BasePanel>
</template>

<style lang="scss" scoped>
  .info {
    display: flex;
    flex-direction: column;
    h1 {
      font-size: 1.875rem;
      font-weight: bold;
      margin-bottom: 1.5rem;
      padding-bottom: 1.5rem;
    }
    a {
      align-self: flex-end;
      margin-top: 1.5rem;
    }
  }
</style>

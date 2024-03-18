<script setup lang="ts">
  import { useGetUserInfoQuery } from '@/api/UserApi/hooks/useGetUserInfoQuery';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import BasePanel from '@/components/ui/BasePanel.vue';
  import {
    AdminType,
    EmployeeCandidateType,
    StudentCandidateType,
    SupervisorType,
  } from '@/models/User';
  import AdminInfo from './admin/AdminInfo.vue';
  import EmployeeCandidateInfo from './candidate/EmployeeCandidateInfo.vue';
  import StudentCandidateInfo from './candidate/StudentCandidateInfo.vue';
  import SupervisorInfo from './supervisor/SupervisorInfo.vue';

  const { data } = useGetUserInfoQuery();

  // TODO: Костыль
  const StudentCandidateData = data.value as StudentCandidateType;
  const EmployeeCandidateData = data.value as EmployeeCandidateType;
  const SupervisorData = data.value as SupervisorType;
  const AdminData = data.value as AdminType;
</script>

<template>
  <BasePanel class="info">
    <h1 class="fio">{{ data?.fio }}</h1>
    <StudentCandidateInfo
      v-if="StudentCandidateData.birthday"
      :user-info="StudentCandidateData"
    />
    <EmployeeCandidateInfo
      v-else-if="EmployeeCandidateData.post"
      :user-info="EmployeeCandidateData"
    />
    <SupervisorInfo
      v-else-if="SupervisorData.phone"
      :user-info="SupervisorData"
    />
    <AdminInfo v-else :user-info="AdminData" />
    <BaseButton
      variant="outlined"
      is="a"
      href="https://int.istu.edu/"
      target="_blank"
    >
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
      font-weight: 700;
      margin-bottom: 1.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--medium-gray-color);
    }
    a {
      align-self: flex-end;
      margin-top: 1.5rem;
    }
  }
</style>

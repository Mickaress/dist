<script setup lang="ts">
  import AppList from '@/components/ui/AppList.vue';
  import GridLayout from '@/components/ui/GridLayout.vue';
  import CandidateCompetencies from '@/components/user/candidate/CandidateCompetencies.vue';
  import CandidateSkills from '@/components/user/candidate/CandidateSkills.vue';
  import { EmployeeCandidateType } from '@/models/User';

  type Props = {
    userInfo: EmployeeCandidateType;
  };

  defineProps<Props>();
  // TODO: объединить candidate
</script>

<template>
  <GridLayout cols="1fr 1fr">
    <div>
      <section class="section">
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
      </section>
      <section class="section">
        <h1>Дополнительная информация</h1>
        <AppList
          :items="[
            {
              title: 'Институт:',
              content: `${userInfo.institute}`,
            },
            {
              title: 'Должность:',
              content: `${userInfo.post}`,
            },
          ]"
        />
      </section>
    </div>
    <div>
      <CandidateSkills />
      <CandidateCompetencies />
    </div>
  </GridLayout>
</template>

<style lang="scss" scoped>
  .section {
    margin-bottom: 3.125rem;
    h1 {
      font-size: 1.125rem;
      font-weight: 700;
      margin-bottom: 1.0625rem;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  .app-list {
    &:deep(.info-list-title) {
      color: var(--dark-gray-color);
    }
  }
</style>

<script setup lang="ts">
  import { useGetUserInfoQuery } from '@/api/UserApi/hooks/useGetUserInfoQuery';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import { SharedCandidateType } from '@/models/User';
  import { computed, ref } from 'vue';
  import CompetenciesEditModal from './CompetenciesEditModal.vue';

  const { data: userData } = useGetUserInfoQuery();

  const candidateData = computed(() => userData.value as SharedCandidateType);

  const isShowModal = ref<boolean>(false);
</script>

<template>
  <section class="section">
    <div class="title">
      <h1>Компетенции</h1>
      <BaseButton variant="text" @click="isShowModal = true">
        Изменить
      </BaseButton>
      <CompetenciesEditModal
        :competencies="candidateData.competencies"
        v-model:isShow="isShowModal"
      />
    </div>
    <p>{{ candidateData.competencies }}</p>
  </section>
</template>

<style lang="scss" scoped>
  .section {
    margin-bottom: 3.125rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.0625rem;
    h1 {
      font-size: 1.125rem;
      font-weight: bold;
    }
  }
</style>

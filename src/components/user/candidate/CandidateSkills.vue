<script setup lang="ts">
  import { useGetUserInfoQuery } from '@/api/UserApi/hooks/useGetUserInfoQuery';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import TagList from '@/components/ui/TagList.vue';
  import { SharedCandidateType } from '@/models/User';
  import { computed, ref } from 'vue';
  import SkillsEditModal from './SkillsEditModal.vue';
  const { data: userData } = useGetUserInfoQuery();

  const candidateData = computed(() => userData.value as SharedCandidateType);

  const userSkillIds = computed(() =>
    candidateData.value.skills.map((skill) => skill.id),
  );

  const isShowModal = ref<boolean>(false);
</script>

<template>
  <section v-if="candidateData.skills" class="section">
    <div class="title">
      <h1>Навыки</h1>
      <BaseButton variant="text" @click="isShowModal = true">
        Изменить
      </BaseButton>
    </div>
    <p v-if="candidateData.skills.length === 0">Навыки не выбраны</p>
    <TagList v-else :tag-list="candidateData.skills" />
  </section>
  <SkillsEditModal :userSkillIds="userSkillIds" v-model:isShow="isShowModal" />
</template>

<style lang="scss" scoped>
  .section {
    margin-bottom: 1.625rem;
    p {
      color: var(--dark-gray-color);
    }
  }
  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.0625rem;
    h1 {
      font-size: 1.125rem;
      font-weight: 700;
    }
  }
</style>

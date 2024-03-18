<template>
  <BaseModal :is-show="isShow" @close="onCloseModal">
    <h1>Редактирование компетенций</h1>
    <div class="content">
      <BaseTextarea
        placeholder="Например, Теория вероятностей"
        v-model="input"
        height="360px"
      />
      <BaseButton class="button" @click="saveCompetencies()">
        Сохранить
      </BaseButton>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
  import { useUpdateCompetenciesMutation } from '@/api/CandidateApi/hooks/useUpdateCompetenciesMutation';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import BaseModal from '@/components/ui/BaseModal.vue';
  import BaseTextarea from '@/components/ui/BaseTextarea.vue';
  import { ref, watch } from 'vue';

  type Props = {
    isShow: boolean;
    competencies: string;
  };
  const props = defineProps<Props>();

  type Emits = {
    (event: 'update:isShow', isShow: boolean): void;
  };
  const emit = defineEmits<Emits>();

  function onCloseModal() {
    emit('update:isShow', false);
  }

  const input = ref(props.competencies);

  watch(
    () => props.isShow,
    () => {
      input.value = props.competencies;
    },
  );

  const { mutate: updateCompetencies } = useUpdateCompetenciesMutation();

  const saveCompetencies = () => {
    updateCompetencies(input.value);
    onCloseModal();
  };
</script>

<style scoped lang="scss">
  h1 {
    font-size: 1.875rem;
    margin-bottom: 20px;
  }
  .content {
    min-width: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
      margin-top: 1rem;
    }
  }
</style>

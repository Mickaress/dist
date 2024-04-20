<script setup lang="ts">
  import BaseButton from '../BaseButton.vue';
  import BaseModal from './BaseModal.vue';

  type Props = {
    isShow: boolean;
    question: string;
    agreeAnswer: string;
    disagreeAnswer: string;
    agreeAction: () => void;
  };
  const props = defineProps<Props>();

  type Emits = {
    (event: 'update:isShow', isShow: boolean): void;
  };
  const emit = defineEmits<Emits>();

  function onCloseModal() {
    emit('update:isShow', false);
  }

  const onSubmit = () => {
    props.agreeAction();
    onCloseModal();
  };
</script>

<template>
  <BaseModal :is-show="isShow" @close="onCloseModal">
    <div class="content">
      <h1>{{ question }}</h1>
      <div class="buttons">
        <BaseButton @click="onSubmit" variant="outlined" color="red">
          {{ agreeAnswer }}
        </BaseButton>
        <BaseButton @click="onCloseModal">{{ disagreeAnswer }}</BaseButton>
      </div>
    </div>
  </BaseModal>
</template>

<style lang="scss" scoped>
  .content {
    width: 40rem;
    margin: 2.5rem 0 2.5rem;
    h1 {
      font-size: 2.5rem;
      max-width: 31.25rem;
      text-align: center;
      margin: auto;
      font-weight: bold;
      margin-bottom: 3.125rem;
    }
  }
  .buttons {
    display: flex;
    justify-content: center;
    gap: 1.25rem;
  }
</style>

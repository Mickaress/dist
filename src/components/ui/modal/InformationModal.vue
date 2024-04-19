<script setup lang="ts">
  import BaseButton from '../BaseButton.vue';
  import BaseModal from './BaseModal.vue';

  type Props = {
    isShow: boolean;
    title: String;
    text: String;
  };
  defineProps<Props>();

  type Emits = {
    (event: 'update:isShow', isShow: boolean): void;
  };
  const emit = defineEmits<Emits>();

  function onCloseModal() {
    emit('update:isShow', false);
  }
</script>

<template>
  <BaseModal :is-show="isShow" @close="onCloseModal">
    <div class="content">
      <h1>{{ title }}</h1>
      <p>{{ text }}</p>
      <div class="button">
        <BaseButton @click="onCloseModal">Хорошо</BaseButton>
      </div>
    </div>
  </BaseModal>
</template>

<style lang="scss" scoped>
  .content {
    width: 40rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    h1 {
      font-size: 1.5rem;
      font-weight: bold;
    }
    p {
      font-size: 1.125rem;
      font-weight: normal;
    }
  }
  .button {
    display: flex;
    justify-content: center;
  }
</style>

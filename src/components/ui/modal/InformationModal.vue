<script setup lang="ts">
  import BaseButton from '../BaseButton.vue';
  import BaseModal from './BaseModal.vue';

  type Props = {
    isShow: boolean;
    title: String;
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
      <main class="main">
        <slot></slot>
      </main>
      <div class="button">
        <BaseButton @click="onCloseModal">Хорошо</BaseButton>
      </div>
    </div>
  </BaseModal>
</template>

<style lang="scss">
  .content {
    width: 40rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    h1 {
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
  .main {
    display: flex;
    flex-direction: column;
    gap: 8px;
    p {
      font-size: 1.125rem;
      font-weight: bold;
      span {
        font-size: 1.125rem;
      }
    }
  }
  .button {
    display: flex;
    justify-content: center;
  }
</style>

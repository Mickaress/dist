<template>
  <div v-if="isShow" class="modal-background" @click="closeModal">
    <BasePanel class="modal" @click.stop>
      <button class="close-btn" @click="closeModal">
        <img :src="closeIconUrl" alt="x" />
      </button>
      <slot></slot>
    </BasePanel>
  </div>
</template>

<script setup lang="ts">
  import closeIconUrl from '@/assets/icons/close.svg?url';
  import BasePanel from './BasePanel.vue';
  type Emits = {
    (e: 'close'): void;
  };
  const emit = defineEmits<Emits>();

  function closeModal() {
    emit('close');
  }

  type Props = {
    isShow: boolean;
  };

  defineProps<Props>();
</script>

<style lang="scss" scoped>
  .modal {
    position: relative;
    max-width: 62.5rem;
  }

  .modal-background {
    position: fixed;
    inset: 0;
    z-index: 100000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 0;
    background-color: rgb(0 0 0 / 40%);
  }

  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1.125rem;
    width: 3rem;
    height: 3rem;
    cursor: pointer;
  }

  .close-btn:hover {
    opacity: 0.8;
  }
</style>

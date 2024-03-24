<script setup lang="ts">
  import { useAuthMutation } from '@/api/UserApi/hooks/useAuthMutation';
  import BaseButton from '../BaseButton.vue';
  import BaseModal from './BaseModal.vue';

  type Props = {
    isShow: boolean;
  };
  defineProps<Props>();

  type Emits = {
    (event: 'update:isShow', isShow: boolean): void;
  };
  const emit = defineEmits<Emits>();

  const { mutate: auth } = useAuthMutation();

  function onCloseModal() {
    emit('update:isShow', false);
  }
</script>

<template>
  <BaseModal :is-show="isShow" @close="onCloseModal">
    <div class="content">
      <h1>Вы не авторизованы</h1>
      <p>
        Чтобы откликаться на вакансии, вам необходимо авторизоваться через
        систему «Кампус ИРНИТУ»
      </p>
      <BaseButton @click="auth()">Войти через Кампус</BaseButton>
    </div>
  </BaseModal>
</template>

<style lang="scss" scoped>
  .content {
    width: 40rem;
    margin: 3.75rem 0 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    align-items: center;
    h1 {
      font-size: 2.5rem;
      font-weight: bold;
    }
    p {
      max-width: 30rem;
      font-size: 18px;
      font-weight: normal;
      text-align: center;
    }
  }
</style>

<script setup lang="ts">
  import BaseButton from '@/components/ui/BaseButton.vue';
  import BaseTextarea from '@/components/ui/BaseTextarea.vue';
  import BaseModal from '@/components/ui/modal/BaseModal.vue';
  import { ref, watch } from 'vue';

  type Props = {
    isShow: boolean;
    title: string;
    baseText: string;
    placeholder: string;
    submitFunction: (text: string) => void;
    submitText: string;
  };

  const props = defineProps<Props>();

  type Emits = {
    (event: 'update:isShow', isShow: boolean): void;
  };
  const emit = defineEmits<Emits>();

  const onCloseModal = () => {
    emit('update:isShow', false);
  };

  const input = ref(props.baseText);

  watch(
    () => props.isShow,
    () => {
      input.value = props.baseText;
    },
  );

  const onSubmit = () => {
    props.submitFunction(input.value);
    onCloseModal();
  };
</script>

<template>
  <BaseModal :is-show="isShow" @close="onCloseModal">
    <h1>{{ title }}</h1>
    <div class="content">
      <BaseTextarea :placeholder="placeholder" v-model="input" :height="20" />
      <BaseButton class="button" @click="onSubmit"> {{ submitText }} </BaseButton>
    </div>
  </BaseModal>
</template>

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

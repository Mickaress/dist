<script setup lang="ts">
  import { StateClass, StateType } from '@/models/State';
  import { ref } from 'vue';
  import BaseBadge from './BaseBadge.vue';
  import BaseButton from './BaseButton.vue';
  import BasePanel from './BasePanel.vue';
  import InformationModal from './modal/InformationModal.vue';
  import InputModal from './modal/InputModal.vue';

  type Props = {
    title: String;
    state: StateType;
    approve?: () => void;
    reject?: () => void;
    commentReject?: (comment: string) => void;
  };

  const props = defineProps<Props>();

  const isShowInfoModal = ref<boolean>(false);
  const isShowRejectModal = ref<boolean>(false);

  const onCommentReject = (comment: string) => {
    if (props.commentReject) props.commentReject(comment);
  };
</script>

<template>
  <BasePanel>
    <div class="header">
      <h1>{{ title }}</h1>
      <BaseBadge :class="StateClass[state.id]">{{ state.state }}</BaseBadge>
    </div>
    <div class="wrapper">
      <div>
        <slot name="main"></slot>
      </div>
      <div class="buttons">
        <BaseButton variant="outlined" v-if="approve && state.id !== 4" @click="approve">
          Одобрить
        </BaseButton>
        <BaseButton
          variant="outlined"
          color="red"
          v-if="(reject || commentReject) && state.id !== 5"
          @click="commentReject ? (isShowRejectModal = true) : reject"
        >
          Отклонить
        </BaseButton>
        <BaseButton @click="isShowInfoModal = true">Подробнее</BaseButton>
        <InformationModal :title="title" v-model:is-show="isShowInfoModal">
          <slot name="info"></slot>
        </InformationModal>
        <InputModal
          v-model:is-show="isShowRejectModal"
          title="Причина отклонения"
          placeholder="Например, Ошибка в обязанностях"
          :submit-function="(comment) => onCommentReject(comment)"
          submit-text="Отправить"
        />
      </div>
    </div>
  </BasePanel>
</template>

<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    h1 {
      font-size: 30px;
      font-weight: bold;
    }
  }
  .wrapper {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: end;
  }
  .buttons {
    display: flex;
    justify-content: end;
    gap: 4px;
  }
</style>

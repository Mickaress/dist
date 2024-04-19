<script setup lang="ts">
  import { StateClass, StateType } from '@/models/State';
  import BaseBadge from './BaseBadge.vue';
  import BaseButton from './BaseButton.vue';
  import BasePanel from './BasePanel.vue';

  type Props = {
    title: String;
    state: StateType;
    approve?: () => void;
    reject?: () => void;
    openModal?: () => void;
  };

  defineProps<Props>();
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
        <BaseButton variant="outlined" color="red" v-if="reject && state.id !== 5" @click="reject"
          >Отклонить</BaseButton
        >
        <BaseButton v-if="openModal" @click="openModal">Подробнее</BaseButton>
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

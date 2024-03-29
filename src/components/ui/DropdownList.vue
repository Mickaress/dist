<template>
  <BaseDropdown
    :is-open="props.isOpen"
    :handle-node="props.handleNode"
    :position="props.position"
    @update:is-open="(value) => emit('update:isOpen', value)"
  >
    <ul>
      <li v-for="item in props.itemList" :key="item.content" class="item">
        <template v-if="item.type === 'link'">
          <RouterLink v-if="item.location" class="action" :to="item.location">
            {{ item.content }}
          </RouterLink>
          <a v-else :href="item.href" class="action">{{ item.content }}</a>
        </template>
        <button
          v-else-if="item.type === 'button'"
          class="action"
          @click="item.action"
        >
          {{ item.content }}
        </button>
      </li>
    </ul>
  </BaseDropdown>
</template>

<script setup lang="ts">
  import { DropdownItem } from '@/models/components/DropdownItem';
  import { RouterLink } from 'vue-router';
  import BaseDropdown, { Position } from './BaseDropdown.vue';

  type Props = {
    isOpen: boolean;
    itemList: DropdownItem[];
    handleNode?: HTMLElement;
    position?: Position;
  };
  type Emits = {
    (e: 'update:isOpen', isOpen: boolean): void;
  };

  const props = withDefaults(defineProps<Props>(), {
    itemList: () => [],
    position: () => ({}),
    handleNode: undefined,
  });
  const emit = defineEmits<Emits>();
</script>

<style scoped>
  .item {
    list-style: none;
  }

  .item:not(:last-child) {
    border-bottom: 1px solid var(--medium-gray-color);
  }

  .action {
    display: inline-block;
    width: 100%;
    padding: 0.625rem 1.3125rem;
    font-family: Mont, Arial, Helvetica, sans-serif;
    font-size: 1rem;
    font-style: normal;
    line-height: 1.25rem;
    color: var(--text-color);
    text-align: left;
    text-decoration: none;
    cursor: pointer;
    background-color: transparent;
    border: none;
  }

  .action:hover {
    background-color: var(--medium-gray-color);
  }
</style>

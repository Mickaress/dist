<script setup lang="ts"></script>

<template>
  <section class="panel">
    <header class="header">
      <slot name="header"></slot>
    </header>
    <div class="content">
      <slot name="default"></slot>
    </div>
  </section>
</template>

<style scoped lang="scss">
  .panel {
    display: flex;
    flex-direction: column;
    padding-bottom: 0.2rem;
    background: var(--gray-color-4);
    border: 1px solid var(--gray-color-1);
    border-radius: 0.3125rem;
  }

  .header {
    margin-bottom: 0.3125rem;
  }

  .content {
    overflow: auto;
    scrollbar-color: var(--dark-gray-color) transparent;
    scrollbar-width: thin;
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: var(--dark-gray-color);
    }
  }
</style>

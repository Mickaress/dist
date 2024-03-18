<template>
  <div
    class="row"
    :style="{
      gridTemplateColumns: getGridTemplateColumns(props.cols),
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  type Props = {
    cols: number | string;
  };
  const props = defineProps<Props>();

  function getGridTemplateColumns(cols: number | string): string {
    if (typeof cols === 'string') return cols;
    return '1fr '.repeat(cols).trim();
  }
</script>

<style lang="scss" scoped>
  .row {
    display: grid;

    & > :deep(*:not(:last-child)) {
      padding-right: 1.875rem;
      margin-right: 1.875rem;
      border-right: 0.0625rem solid var(--medium-gray-color);
    }
  }
</style>

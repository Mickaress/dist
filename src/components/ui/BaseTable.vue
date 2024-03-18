<script setup lang="ts">
  type Props = {
    headers: string[];
  };

  defineProps<Props>();
</script>

<template>
  <table class="table">
    <tr>
      <template v-for="header in headers" :key="header">
        <th>{{ header }}</th>
      </template>
    </tr>
    <slot></slot>
  </table>
</template>

<style lang="scss" scoped>
  .table {
    width: 100%;
    text-align: left;
    border-collapse: collapse;

    &:deep(th) {
      font-weight: 400;
      color: var(--dark-gray-color);
      font-size: 18px;
    }

    &:deep(td) {
      font-weight: 700;
      font-size: 18px;
    }

    &:deep(a) {
      font-weight: 700;
      font-size: 18px;
      &:hover {
        text-decoration: underline;
      }
    }

    &:deep(td),
    &:deep(th) {
      padding: 1.25rem 1rem;
      border-bottom: 1px solid var(--medium-gray-color);
    }

    &:deep(tr:last-child > td) {
      border-bottom: none;
    }
  }
</style>

<script setup lang="ts">
  // TODO: Возможно стоит вынести в хук
  import searchIconUrl from '@/assets/icons/search.svg?url';
  import BaseInput from '@/components/ui/BaseInput.vue';
  import { useProjectFilterStore } from '@/stores/projectFilter/useProjectFilterStore';
  import { debounce } from 'lodash';
  import { ref, watch } from 'vue';

  const projectFilterStore = useProjectFilterStore();

  const searchText = ref(projectFilterStore.title);

  const titleChange = () => {
    if (projectFilterStore.title !== searchText.value)
      projectFilterStore.updateFilters({ title: searchText.value, page: 1 });
  };
  const debouncedInput = debounce(titleChange, 1000);

  watch(
    () => projectFilterStore.title,
    (title) => {
      searchText.value = title;
    },
  );

  watch(
    () => searchText.value,
    () => {
      debouncedInput();
    },
  );
</script>

<template>
  <BaseInput
    v-model="searchText"
    :icon="searchIconUrl"
    placeholder="Поиск по НИОКР..."
    class="search-input"
    type="text"
    inputmode="email"
    maxlength="100"
  />
</template>

<style lang="scss" scoped>
  .search-input {
    max-width: 43.375rem;
  }
</style>

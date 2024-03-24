<script setup lang="ts">
  // TODO: Возможно стоит вынести в хук
  import searchIconUrl from '@/assets/icons/search.svg?url';
  import BaseInput from '@/components/ui/BaseInput.vue';
  import { useVacancyFilterStore } from '@/stores/vacancyFilter/useVacancyFilterStore';
  import { debounce } from 'lodash';
  import { ref, watch } from 'vue';

  const vacancyFilterStore = useVacancyFilterStore();

  const searchText = ref(vacancyFilterStore.title);

  const titleChange = () => {
    if (vacancyFilterStore.title !== searchText.value)
      vacancyFilterStore.updateFilters({ title: searchText.value, page: 1 });
  };
  const debouncedInput = debounce(titleChange, 1000);

  watch(
    () => vacancyFilterStore.title,
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
    placeholder="Поиск по вакансиям..."
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

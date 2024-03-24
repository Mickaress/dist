<script setup lang="ts">
  import { useGetAllSkillsQuery } from '@/api/SkillApi/hooks/useGetAllSkillsQuery';
  import type { FilterType } from '@/models/Filters';
  import { useVacancyFilterStore } from '@/stores/vacancyFilter/useVacancyFilterStore';
  import VMultiselect from '@vueform/multiselect';
  import { ref, watch } from 'vue';
  import BaseButton from '../ui/BaseButton.vue';
  import BaseCheckbox from '../ui/BaseCheckbox.vue';

  const skillListQuery = useGetAllSkillsQuery();

  const vacancyFilterStore = useVacancyFilterStore();
  const filters = ref<FilterType>({ ...vacancyFilterStore });
  watch(
    () => vacancyFilterStore.$state,
    (storeFilters) => {
      filters.value = { ...storeFilters };
    },
    { deep: true, immediate: true },
  );

  const updateFilters = () => {
    vacancyFilterStore.updateFilters({ ...filters.value, page: 1 });
  };
</script>

<template>
  <form class="filters" @submit.prevent="updateFilters()">
    <div>
      <h1 class="title">Оплата проекта</h1>
      <BaseCheckbox :value="true" v-model="filters.payment">
        С оплатой
      </BaseCheckbox>
      <BaseCheckbox :value="false" v-model="filters.payment">
        Без оплаты
      </BaseCheckbox>
    </div>
    <div class="divider"></div>
    <div>
      <h1 class="title">Навыки</h1>
      <VMultiselect
        v-model="filters.skills"
        mode="tags"
        placeholder="Введите навык"
        no-results-text="Навык не найдена"
        no-options-text="Навыки не найдены"
        class="miltiselect"
        :close-on-select="false"
        :searchable="true"
        :options="skillListQuery.data.value"
        :disabled="skillListQuery.isFetching.value"
        :loading="skillListQuery.isFetching.value"
        label="name"
        track-by="name"
        value-prop="id"
      />
    </div>
    <div class="divider"></div>
    <footer class="footer">
      <BaseButton full-width type="submit"> Найти </BaseButton>
      <BaseButton
        variant="text"
        type="button"
        @click="vacancyFilterStore.clearFilter()"
        full-width
      >
        Сбросить фильтры
      </BaseButton>
    </footer>
  </form>
</template>

<style lang="scss" scoped>
  .filters {
    background-color: var(--light-color);
    padding: 1.25rem;
    border-radius: 0.625rem;
    border: 0.0625rem solid var(--medium-gray-color);
  }
  .title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  .divider {
    width: 100%;
    background: var(--medium-gray-color);
    height: 0.0625rem;
    margin: 1.25rem 0;
  }
  .label:not(:last-child) {
    margin-bottom: 0.8125rem;
  }
  .footer {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }
</style>

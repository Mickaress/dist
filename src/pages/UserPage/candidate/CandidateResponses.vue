<script setup lang="ts">
  import { useGetCandidateResponsesQuery } from '@/api/CandidateApi/hooks/useGetCandidateResponsesQuery';
  import BaseBadge from '@/components/ui/BaseBadge.vue';
  import BasePanel from '@/components/ui/BasePanel.vue';
  import BaseStub from '@/components/ui/BaseStub.vue';
  import BaseTable from '@/components/ui/BaseTable.vue';
  import { StateClass } from '@/models/State';
  import { projectRoute, vacancyRoute } from '@/router/utils/route';
  import { RouterLink } from 'vue-router';

  const { data: responses, isFetching, isError } = useGetCandidateResponsesQuery();
</script>

<template>
  <BaseStub v-if="isFetching" title="Загрузка..."></BaseStub>
  <BaseStub v-if="isError" title="Ошибка сервера"></BaseStub>
  <BaseStub v-if="responses?.length === 0" title="Нет откликов"></BaseStub>
  <BasePanel v-else-if="responses" class="panel">
    <BaseTable :headers="['Вакансия', 'НИОКР', 'Дата подачи отклика', 'Статус']">
      <tr v-for="row in responses" :key="row.id">
        <td class="data">
          <RouterLink :to="vacancyRoute(row.vacancy.id)">
            {{ row.vacancy.title }}
          </RouterLink>
        </td>
        <td class="data">
          <RouterLink :to="projectRoute(row.vacancy.project.id)">
            {{ row.vacancy.project.title }}
          </RouterLink>
        </td>
        <td class="data">{{ row.date }}</td>
        <td class="data">
          <BaseBadge :class="StateClass[row.state.id]">
            {{ row.state.state }}
          </BaseBadge>
        </td>
      </tr>
    </BaseTable>
  </BasePanel>
</template>

<style lang="scss" scoped>
  .data {
    padding: 1.25rem 1rem;
    border-top: 1px solid var(--medium-gray-color);
    font-weight: bold;
    font-size: 18px;
    a {
      font-weight: bold;
      text-decoration: none;
      font-size: 18px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>

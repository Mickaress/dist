<script setup lang="ts">
  import { useGetCandidateResponsesQuery } from '@/api/CandidateApi/hooks/useGetCandidateResponsesQuery';
  import BaseBadge from '@/components/ui/BaseBadge.vue';
  import BasePanel from '@/components/ui/BasePanel.vue';
  import BaseTable from '@/components/ui/BaseTable.vue';
  import { StateClass } from '@/models/State';
  import { projectRoute, vacancyRoute } from '@/router/utils/route';
  import { RouterLink } from 'vue-router';

  const responsesQuery = useGetCandidateResponsesQuery();
</script>

<template>
  <BasePanel class="panel">
    <BaseTable
      v-if="responsesQuery.data.value"
      :headers="['Вакансия', 'НИОКР', 'Дата подачи отклика', 'Статус']"
    >
      <tr v-for="row in responsesQuery.data.value" :key="row.id">
        <td>
          <RouterLink :to="vacancyRoute(row.vacancy.id)">
            {{ row.vacancy.title }}
          </RouterLink>
        </td>
        <td>
          <RouterLink :to="projectRoute(row.vacancy.project.id)">
            {{ row.vacancy.project.title }}
          </RouterLink>
        </td>
        <td>{{ row.date }}</td>
        <td>
          <BaseBadge :class="StateClass[row.state.id]">
            {{ row.state.state }}
          </BaseBadge>
        </td>
      </tr>
    </BaseTable>
  </BasePanel>
</template>

<style lang="scss" scoped>
  .panel {
    padding-top: 0;
    padding-bottom: 0;
  }
</style>

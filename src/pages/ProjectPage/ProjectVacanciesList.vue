<script setup lang="ts">
  import { useGetSingleProjectQuery } from '@/api/ProjectApi/hooks/useGetSingleProjectQuery';
  import { useGetUserInfoQuery } from '@/api/UserApi/hooks/useGetUserInfoQuery';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import BasePanel from '@/components/ui/BasePanel.vue';
  import BaseStub from '@/components/ui/BaseStub.vue';
  import BaseTable from '@/components/ui/BaseTable.vue';
  import { VacancyType } from '@/models/Vacancy';
  import { vacancyRoute } from '@/router/utils/route';
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const projectId = Number(route.params.id);

  const projectQuery = useGetSingleProjectQuery(projectId);

  const sortedVacancies = computed<
    Pick<VacancyType, 'id' | 'title' | 'salary' | 'responsibilities'>[]
  >(() => {
    if (!projectQuery.data.value) return [];
    const vacancies = projectQuery.data.value.vacancies;
    return [...vacancies].sort((a, b) => a.title.localeCompare(b.title));
  });

  const { data: userData } = useGetUserInfoQuery();
</script>

<template>
  <BasePanel>
    <BaseStub v-if="sortedVacancies.length === 0" title="У данного НИОКР нет вакансий"></BaseStub>
    <BaseTable v-else class="table" :headers="['Название вакансии', 'Обязанности', 'Зарплата', '']">
      <tr v-for="row in sortedVacancies" :key="row.id">
        <td>{{ row.title }}</td>
        <td>{{ row.responsibilities }}</td>
        <td>{{ row.salary === 0 ? 'Без оплаты' : `${row.salary} ₽` }}</td>
        <td>
          <div class="buttons">
            <BaseButton v-if="userData" is="button" variant="outlined">Откликнуться</BaseButton>
            <BaseButton is="router-link" :to="vacancyRoute(row.id)"> Подробнее </BaseButton>
          </div>
        </td>
      </tr>
    </BaseTable>
  </BasePanel>
</template>

<style lang="scss" scoped>
  .buttons {
    display: flex;
    gap: 0.3125rem;
    justify-content: end;
  }
</style>

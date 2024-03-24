<script setup lang="ts">
  import { useGetSingleProjectQuery } from '@/api/ProjectApi/hooks/useGetSingleProjectQuery';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import BasePanel from '@/components/ui/BasePanel.vue';
  import BaseStub from '@/components/ui/BaseStub.vue';
  import BaseTable from '@/components/ui/BaseTable.vue';
  import { VacancyType } from '@/models/Vacancy';
  import { vacancyRoute } from '@/router/utils/route';
  import { computed } from 'vue';
  import { RouterLink, useRoute } from 'vue-router';

  const route = useRoute();
  const projectId = Number(route.params.id);

  const { data: project } = useGetSingleProjectQuery(projectId);

  const sortedVacancies = computed<
    Pick<VacancyType, 'id' | 'title' | 'salary' | 'responsibilities'>[]
  >(() => {
    if (!project.value) return [];
    const vacancies = [...project.value.vacancies].sort((a, b) =>
      a.title.localeCompare(b.title),
    );
    return vacancies;
  });
</script>

<template>
  <BasePanel>
    <BaseStub
      v-if="project?.vacancies.length === 0"
      title="У этого НИОКР нет вакансий"
    ></BaseStub>
    <BaseTable
      v-else-if="project"
      class="table"
      :headers="['Название вакансии', 'Обязанности', 'Зарплата', '']"
    >
      <tr v-for="row in sortedVacancies" :key="row.id">
        <td class="data">
          <RouterLink :to="vacancyRoute(row.id)">
            {{ row.title }}
          </RouterLink>
        </td>
        <td class="data">{{ row.responsibilities }}</td>
        <td class="data">
          {{ row.salary === 0 ? 'Бесплатно' : `${row.salary} ₽` }}
        </td>
        <td>
          <div class="buttons">
            <BaseButton variant="outlined">Откликнуться</BaseButton>
            <BaseButton is="router-link" :to="vacancyRoute(row.id)">
              Подробнее
            </BaseButton>
          </div>
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
      font-size: 18px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .buttons {
    display: flex;
    gap: 0.3125rem;
    justify-content: end;
    padding: 1.25rem 1rem;
    border-top: 1px solid var(--medium-gray-color);
  }
</style>

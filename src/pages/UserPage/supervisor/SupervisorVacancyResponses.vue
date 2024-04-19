<script setup lang="ts">
  import { useGetVacancyResponsesQuery } from '@/api/SupervisorApi/hooks/useGetVacancyResponsesQuery';
  import { useReviewResponseMutation } from '@/api/SupervisorApi/hooks/useReviewResponseMutation';
  import { useGetSingleVacancyQuery } from '@/api/VacancyApi/hooks/useGetSingleVacancyQuery';
  import CardsLoading from '@/components/CardsLoading.vue';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import BasePagination from '@/components/ui/BasePagination.vue';
  import BaseStub from '@/components/ui/BaseStub.vue';
  import ProposalCard from '@/components/ui/ProposalCard.vue';
  import SkillList from '@/components/ui/SkillList.vue';
  import { FilterProposalsBy } from '@/models/Proposal';
  import { RouteNames } from '@/router/types/routeNames';
  import { computed, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  const router = useRouter();
  const route = useRoute();

  const page = computed(() => Number(route.query.page));

  watch(
    () => route.params.filterBy,
    (filterBy) => {
      if (!filterBy && route.name === RouteNames.SUPERVISOR_VACANCY_RESPONSES) {
        router.replace({
          ...route,
          params: { filterBy: FilterProposalsBy.Review },
        });
      }
    },
    { immediate: true },
  );

  const responsesQuery = useGetVacancyResponsesQuery();
  const vacancyQuery = useGetSingleVacancyQuery(Number(route.query.vacancyId));

  const { mutate: reviewResponse } = useReviewResponseMutation();

  const changePage = (page: number) => {
    router.replace({
      ...route,
      query: { page: page },
    });
  };
</script>

<template>
  <BaseStub v-if="vacancyQuery.isLoading.value" title="Загрузка"></BaseStub>
  <template v-if="vacancyQuery.data.value">
    <div class="header">
      <h1>{{ vacancyQuery.data.value.title }}</h1>
      <BaseButton variant="outlined" color="red">Закрыть вакансию</BaseButton>
    </div>
    <div class="wrapper">
      <RouterLink class="tab" :to="{ ...route, params: { filterBy: FilterProposalsBy.Review } }">
        Новые
      </RouterLink>
      <RouterLink class="tab" :to="{ ...route, params: { filterBy: FilterProposalsBy.Approved } }">
        Одобренные
      </RouterLink>
      <RouterLink class="tab" :to="{ ...route, params: { filterBy: FilterProposalsBy.Rejected } }">
        Отклонённые
      </RouterLink>
    </div>
    <CardsLoading v-if="responsesQuery.isLoading.value" :height="10" :per-page="10" />
    <template v-if="responsesQuery.data.value">
      <BaseStub v-if="responsesQuery.data.value.count === 0" title="Нет откликов"></BaseStub>
      <template v-else>
        <ul class="list">
          <li v-for="response of responsesQuery.data.value.responses" :key="response.id">
            <ProposalCard
              :title="response.candidate.fio"
              :state="response.state"
              :approve="() => reviewResponse({ responseId: response.id, stateId: 4 })"
              :reject="() => reviewResponse({ responseId: response.id, stateId: 5 })"
            >
              <template #main>
                <p v-if="response.candidate.post">
                  Должность: <span>{{ response.candidate.post }}</span>
                </p>
                <p v-if="response.candidate.group">
                  Группа: <span>{{ response.candidate.group }}</span>
                </p>
                <div class="skills">
                  <p>Навыки:</p>
                  <SkillList :skill-ids="response.candidate.skills" />
                </div>
              </template>
            </ProposalCard>
          </li>
        </ul>
        <BasePagination
          :total-items="responsesQuery.data.value.count"
          :current-page="page"
          :set-page="changePage"
        />
      </template>
    </template>
  </template>
</template>

<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
      font-size: 2.5rem;
      font-weight: bold;
    }
  }
  .wrapper {
    display: flex;
    gap: 0.5rem;
    margin: 1rem 0;
  }
  .tab {
    background-color: white;
    text-transform: uppercase;
    padding: 0.75rem 1rem;
    border: 0.0625rem solid var(--medium-gray-color);
    border-radius: 0.625rem;
  }
  .tab.router-link-exact-active {
    background-color: var(--accent-color);
    color: var(--light-color);
    border: none;
  }
  .list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  p {
    font-size: 1.125rem;
    span {
      font-size: 1.125rem;
      font-weight: bold;
    }
  }
  .skills {
    display: flex;
    align-items: center;
    margin-top: 0.75rem;
    gap: 0.5rem;
  }
</style>

<script setup lang="ts">
  import { useGetVacancyOffersQuery } from '@/api/AdminApi/hooks/useGetVacancyOffersQuery';
  import { useReviewVacancyMutation } from '@/api/AdminApi/hooks/useReviewVacancyMutation';
  import CardsLoading from '@/components/CardsLoading.vue';
  import AppList from '@/components/ui/AppList.vue';
  import BasePagination from '@/components/ui/BasePagination.vue';
  import BaseStub from '@/components/ui/BaseStub.vue';
  import ProposalCard from '@/components/ui/ProposalCard.vue';
  import { computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  const router = useRouter();
  const route = useRoute();

  const page = computed(() => Number(route.query.page) || 1);

  const vacancyOffersQuery = useGetVacancyOffersQuery();

  const { mutate: reviewVacancy } = useReviewVacancyMutation();

  const changePage = (page: number) => {
    router.replace({
      ...route,
      query: { page: page },
    });
  };
</script>

<template>
  <CardsLoading v-if="vacancyOffersQuery.isLoading.value" :height="10" :per-page="10" />
  <template v-if="vacancyOffersQuery.data.value">
    <BaseStub
      v-if="vacancyOffersQuery.data.value.count === 0"
      title="Нет заявок на вакансии"
    ></BaseStub>
    <template v-else>
      <ul class="list">
        <li v-for="vacancy of vacancyOffersQuery.data.value.vacancies" :key="vacancy.id">
          <ProposalCard
            :title="vacancy.title"
            :state="vacancy.state"
            :approve="() => reviewVacancy({ vacancyId: vacancy.id, stateId: 1, comment: '' })"
            :comment-reject="
              (comment) => reviewVacancy({ vacancyId: vacancy.id, stateId: 5, comment: comment })
            "
          >
            <template #main>
              <p>
                НИОКР: <span>{{ vacancy.project.title }}</span>
              </p>
              <p>
                Руководитель: <span>{{ vacancy.project.supervisor.fio }}</span>
              </p>
            </template>
            <template #info>
              <AppList
                :width="10"
                :items="[
                  {
                    title: 'НИОКР',
                    content: vacancy.project.title,
                  },
                  {
                    title: 'Оплата',
                    content: vacancy.salary === 0 ? 'Без оплаты' : `${vacancy.salary} ₽`,
                  },
                  {
                    title: 'Период работы',
                    content: `${vacancy.period}`,
                  },
                  {
                    title: 'Обязанности',
                    content: vacancy.responsibilities,
                  },
                  {
                    title: 'Требования',
                    content: vacancy.requirements,
                  },
                  {
                    title: 'Условия труда',
                    content: `${vacancy.conditions}`,
                  },
                ]"
              />
            </template>
          </ProposalCard>
        </li>
      </ul>
      <BasePagination
        :total-items="vacancyOffersQuery.data.value.count"
        :current-page="page"
        :page-size="10"
        :set-page="changePage"
      />
    </template>
  </template>
</template>

<style lang="scss" scoped>
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
</style>

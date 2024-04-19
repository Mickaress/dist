<script setup lang="ts">
  import { useGetSkillOffersQuery } from '@/api/AdminApi/hooks/useGetSkillOffersQuery';
  import { useReviewSkillMutation } from '@/api/AdminApi/hooks/useReviewSkillMutation';
  import CardsLoading from '@/components/CardsLoading.vue';
  import BasePagination from '@/components/ui/BasePagination.vue';
  import BaseStub from '@/components/ui/BaseStub.vue';
  import ProposalCard from '@/components/ui/ProposalCard.vue';
  import { computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  const router = useRouter();
  const route = useRoute();

  const page = computed(() => Number(route.query.page) || 1);

  const skillsQuery = useGetSkillOffersQuery();

  const { mutate: reviewSkill } = useReviewSkillMutation();

  const changePage = (page: number) => {
    router.replace({
      ...route,
      query: { page: page },
    });
  };
</script>

<template>
  <CardsLoading v-if="skillsQuery.isLoading.value" :height="10" :per-page="10" />
  <template v-if="skillsQuery.data.value">
    <BaseStub v-if="skillsQuery.data.value.count === 0" title="Нет заявок на навыки"></BaseStub>
    <template v-else>
      <ul class="list">
        <li v-for="skill of skillsQuery.data.value.skills" :key="skill.id">
          <ProposalCard
            :title="skill.name"
            :state="skill.state"
            :approve="() => reviewSkill({ skillId: skill.id, stateId: 1 })"
            :reject="() => reviewSkill({ skillId: skill.id, stateId: 5 })"
          >
          </ProposalCard>
        </li>
      </ul>
      <BasePagination
        :total-items="skillsQuery.data.value.count"
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
</style>

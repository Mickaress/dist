<script setup lang="ts">
  import { useCreateResponseMutation } from '@/api/CandidateApi/hooks/useCreateResponseMutation';
  import { useGetUserInfoQuery } from '@/api/UserApi/hooks/useGetUserInfoQuery';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import TagList from '@/components/ui/TagList.vue';
  import type { VacancyType } from '@/models/Vacancy';
  import { vacancyRoute } from '@/router/utils/route';
  import { ref } from 'vue';
  import BasePanel from '../ui/BasePanel.vue';
  import AuthModal from '../ui/modal/AuthModal.vue';

  type Props = {
    vacancy: VacancyType;
  };

  defineProps<Props>();

  const { mutate: createResponse } = useCreateResponseMutation();

  const { data } = useGetUserInfoQuery();

  const isShowModal = ref<boolean>(false);

  const response = (id: number) => {
    if (!data.value) {
      isShowModal.value = true;
      return;
    }

    createResponse(id);
  };
</script>

<template>
  <BasePanel>
    <header class="header">
      <RouterLink :to="vacancyRoute(vacancy.id)">
        <h1>
          {{ vacancy.title }}
        </h1>
      </RouterLink>
      <h2>
        {{ vacancy.project.title }}
      </h2>
      <p>
        {{ vacancy.project.supervisor.fio }}
      </p>
    </header>
    <div class="divider"></div>
    <main class="main">
      <p>
        Обязанности:
        <span>{{ vacancy.responsibilities }}</span>
      </p>
      <p>
        Требования:
        <span>{{ vacancy.requirements }}</span>
      </p>
      <p>
        Период работы:
        <span> {{ vacancy.period }} </span>
      </p>
      <p>
        Оплата:
        <span>{{
          vacancy.salary === 0 ? 'Бесплатно' : `${vacancy.salary} ₽`
        }}</span>
      </p>
    </main>
    <footer class="footer">
      <TagList :tag-list="vacancy.skills" />
      <BaseButton variant="outlined" @click="response(vacancy.id)">
        Откликнуться
      </BaseButton>
      <BaseButton is="router-link" :to="vacancyRoute(vacancy.id)">
        Подробнее
      </BaseButton>
    </footer>
  </BasePanel>
  <AuthModal v-model:is-show="isShowModal" />
</template>

<style lang="scss" scoped>
  .header {
    h1 {
      font-size: 1.5rem;
      margin-bottom: 0.75rem;

      &:hover {
        text-decoration: underline;
      }
    }
    h2 {
      font-size: 1.25rem;
      font-weight: normal;
      margin-bottom: 0.5rem;
    }
    p {
      font-weight: normal;
      margin-bottom: 0.75rem;
    }
  }
  .divider {
    width: 100%;
    height: 0.125rem;
    background-color: var(--medium-gray-color);
    margin-bottom: 0.875rem;
  }
  .main {
    p {
      font-weight: bold;
      margin-bottom: 1rem;
    }
  }
  .footer {
    display: flex;
    gap: 0.25rem;
  }
</style>

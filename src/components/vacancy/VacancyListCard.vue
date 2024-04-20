<script setup lang="ts">
  import { useCreateResponseMutation } from '@/api/CandidateApi/hooks/useCreateResponseMutation';
  import { useCloseVacancyMutation } from '@/api/SupervisorApi/hooks/useCloseVacancyMutation';
  import { useGetUserInfoQuery } from '@/api/UserApi/hooks/useGetUserInfoQuery';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import { StateClass, StateID } from '@/models/State';
  import type { VacancyType } from '@/models/Vacancy';
  import { createVacancyRoute, toVacancyResponses, vacancyRoute } from '@/router/utils/route';
  import { ref } from 'vue';
  import BaseBadge from '../ui/BaseBadge.vue';
  import BasePanel from '../ui/BasePanel.vue';
  import SkillList from '../ui/SkillList.vue';
  import AuthModal from '../ui/modal/AuthModal.vue';
  import ConfirmModal from '../ui/modal/ConfirmModal.vue';
  import InformationModal from '../ui/modal/InformationModal.vue';

  type Props = {
    vacancy: VacancyType;
  };

  defineProps<Props>();

  const { mutate: createResponse } = useCreateResponseMutation();

  const { data: userData } = useGetUserInfoQuery();

  const isShowAuthModal = ref<boolean>(false);
  const isShowCommentModal = ref<boolean>(false);
  const isShowDeleteModal = ref<boolean>(false);

  const response = (id: number) => {
    if (!userData.value) {
      isShowAuthModal.value = true;
      return;
    }

    createResponse(id);
  };

  const { mutate: closeVacancy } = useCloseVacancyMutation();
</script>

<template>
  <BasePanel>
    <header class="header">
      <RouterLink :to="vacancyRoute(vacancy.id)">
        <h1>
          {{ vacancy.title }}
        </h1>
      </RouterLink>
      <BaseBadge :class="StateClass[vacancy.state.id]">
        {{ vacancy.state.state }}
      </BaseBadge>
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
        <span>{{ vacancy.salary === 0 ? 'Без оплаты' : `${vacancy.salary} ₽` }}</span>
      </p>
    </main>
    <footer class="footer">
      <SkillList :skill-ids="vacancy.skills" />
      <div class="buttons">
        <template v-if="userData">
          <template v-if="userData.id === vacancy.project.supervisor.id">
            <BaseButton
              v-if="vacancy.state.id === StateID.Active"
              @click="isShowDeleteModal = true"
              variant="outlined"
              color="red"
            >
              Закрыть вакансию
            </BaseButton>
            <BaseButton
              v-if="vacancy.state.id === StateID.Rejected"
              @click="isShowDeleteModal = true"
              variant="outlined"
              color="red"
            >
              Удалить
            </BaseButton>
            <ConfirmModal
              v-model:is-show="isShowDeleteModal"
              question="Вы уверены, что хотите удалить вакансию?"
              :agree-action="
                () => closeVacancy({ vacancyId: vacancy.id, projectId: vacancy.project.id })
              "
              agree-answer="Удалить"
              disagree-answer="Отмена"
            />
            <BaseButton
              v-if="vacancy.state.id === StateID.Active"
              variant="outlined"
              is="router-link"
              :to="toVacancyResponses(vacancy.id)"
            >
              Отклики
            </BaseButton>
            <template v-if="vacancy.state.id === StateID.Rejected">
              <BaseButton
                variant="outlined"
                is="router-link"
                :to="createVacancyRoute(vacancy.project.id, vacancy.id)"
              >
                Редактировать
              </BaseButton>
              <BaseButton color="red" @click="isShowCommentModal = true">Причина</BaseButton>
            </template>
          </template>
          <BaseButton v-else variant="outlined" @click="response(vacancy.id)">
            Откликнуться
          </BaseButton>
        </template>
        <BaseButton
          v-if="vacancy.state.id === StateID.Active"
          is="router-link"
          :to="vacancyRoute(vacancy.id)"
        >
          Подробнее
        </BaseButton>
      </div>
    </footer>
  </BasePanel>
  <AuthModal v-model:is-show="isShowAuthModal" />
  <InformationModal title="Причина отклонения заявки" v-model:is-show="isShowCommentModal">
    {{ vacancy.comment }}
  </InformationModal>
</template>

<style lang="scss" scoped>
  .header {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: start;
    gap: 1rem;
    margin-bottom: 0.75rem;
    h1 {
      font-size: 1.5rem;

      &:hover {
        text-decoration: underline;
      }
    }
    h2 {
      font-size: 1.25rem;
      font-weight: normal;
      grid-column: 1 / -1;
    }
    p {
      font-weight: normal;
      grid-column: 1 / -1;
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
    justify-content: space-between;
    gap: 0.25rem;
    align-items: end;
  }
  .buttons {
    display: flex;
    gap: 8px;
  }
</style>

<script setup lang="ts">
  import { useGetSingleProjectQuery } from '@/api/ProjectApi/hooks/useGetSingleProjectQuery';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import BaseInput from '@/components/ui/BaseInput.vue';
  import BasePanel from '@/components/ui/BasePanel.vue';
  import BaseTextarea from '@/components/ui/BaseTextarea.vue';
  import FormSection from '@/components/ui/FormSection.vue';
  import TagList from '@/components/ui/TagList.vue';
  import SkillsEditModal from '@/components/user/candidate/SkillsEditModal.vue';
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const projectId = Number(route.params.id);

  const { data: project } = useGetSingleProjectQuery(projectId);
  const skills = ref<number[]>([]);
  const isShowModal = ref<boolean>(false);

  // TODO: Изменение навыков так и не работает, надо подумать как пофиксить
</script>

<template>
  <BasePanel v-if="project" class="panel">
    <FormSection tag="1" title="НИОКР" divider>
      <h1 class="header">Название НИОКР</h1>
      <BaseTextarea disabled :modelValue="project.title" />
    </FormSection>
    <FormSection tag="2" title="Данные о вакансии" divider>
      <div class="block">
        <div>
          <h1 class="header">Название вакансии</h1>
          <BaseTextarea placeholder="Например, UI/UX-дизайнер" />
        </div>
        <div>
          <h1 class="header">Оплата</h1>
          <div class="payment">
            <BaseInput placeholder="0" />
            <span>₽</span>
          </div>
        </div>
        <div>
          <h1 class="header">Период работы</h1>
          <div class="date">
            <input type="date" name="" id="" />
            <span>—</span>
            <input type="date" name="" id="" />
          </div>
        </div>
      </div>
    </FormSection>
    <FormSection tag="3" title="Обязанности, требования и условия" divider>
      <div class="block">
        <div>
          <h1 class="header">Обязанности</h1>
          <BaseTextarea
            placeholder="Например, создать платформу (страничку) для рекламы олимпиад."
          />
        </div>
        <div>
          <h1 class="header">Требования</h1>
          <BaseTextarea
            placeholder="Например, знание основ верстки и дизайна веб-страниц."
          />
        </div>
        <div>
          <h1 class="header">Условия</h1>
          <BaseTextarea
            placeholder="Например, полный день, полная занятость."
          />
        </div>
      </div>
    </FormSection>
    <FormSection tag="4" title="Навыки">
      <h1 class="header">Навыки</h1>
      <TagList :tag-list="[]" />
      <BaseButton variant="tag" @click="isShowModal = true">
        Редактировать навыки +
      </BaseButton>
    </FormSection>
  </BasePanel>
  <div class="buttons">
    <BaseButton variant="outlined" color="red">Сбросить и выйти</BaseButton>
    <BaseButton>Подать заявку</BaseButton>
  </div>
  <SkillsEditModal :skillIds="skills" v-model:isShow="isShowModal" />
</template>

<style lang="scss" scoped>
  .panel {
    margin-top: 3.625rem;
  }
  .block {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .header {
    font-weight: bold;
    font-size: 1.125rem;
    line-height: 2.375rem;
  }
  .input {
    max-width: 10%;
    text-align: right;
    padding-right: 0.5rem;
  }
  .payment {
    span {
      font-size: 1.25rem;
      margin-left: 0.5rem;
    }
  }
  .date {
    display: flex;
    gap: 8px;
    align-items: center;
    input {
      font-size: 18px;
      border: 1px solid var(--medium-gray-color);
      border-radius: 0.3125rem;
      padding: 12px;
      outline: none;
      &:focus {
        border-color: var(--accent-color);
      }
    }
  }
  .buttons {
    display: flex;
    justify-content: end;
    gap: 1rem;
    margin-top: 40px;
  }
</style>

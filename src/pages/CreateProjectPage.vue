<script setup lang="ts">
  import BaseButton from '@/components/ui/BaseButton.vue';
  import BaseInput from '@/components/ui/BaseInput.vue';
  import BasePanel from '@/components/ui/BasePanel.vue';
  import BaseTextarea from '@/components/ui/BaseTextarea.vue';
  import FormSection from '@/components/ui/FormSection.vue';
</script>

<template>
  <BasePanel class="panel">
    <FormSection tag="1" title="Данные о НИОКР" divider>
      <div class="block">
        <div>
          <h1 class="header">Название НИОКР</h1>
          <BaseTextarea placeholder="Например, Разработка интерактивных веб-приложений" />
        </div>
        <div>
          <h1 class="header">Руководитель</h1>
          <BaseInput
            placeholder="Выберите руководителя НИОКР"
            class="search-input"
            type="text"
            inputmode="email"
            maxlength="100"
          />
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
    <FormSection tag="2" title="Описание, ожидаемые результаты и условия">
      <div class="block">
        <div>
          <h1 class="header">Описание</h1>
          <BaseTextarea
            placeholder="Например, в этом проекте вы будете заниматься разработкой интерактивных веб-приложений. Это отличная возможность применить свои навыки веб-разработки и создать увлекательные веб-приложения."
          />
        </div>
        <div>
          <h1 class="header">Ожидаемые результаты</h1>
          <BaseTextarea
            placeholder="Например, разработать интерактивные веб-приложения, которые предоставят пользователю уникальный и привлекательный опыт."
          />
        </div>
        <div>
          <h1 class="header">Условия</h1>
          <BaseTextarea placeholder="Например, полный день, полная занятость." />
        </div>
      </div>
    </FormSection>
  </BasePanel>
  <div class="buttons">
    <BaseButton variant="outlined" color="red">Сбросить и выйти</BaseButton>
    <BaseButton>Подать заявку</BaseButton>
  </div>
</template>

<style lang="scss" scoped>
  .panel {
    margin-top: 3.625rem;
  }
  .search-input {
    max-width: 50%;
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

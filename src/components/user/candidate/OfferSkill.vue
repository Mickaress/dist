<template>
  <div>
    <h1>Предложите новый навык</h1>
    <section class="block">
      <h2>Название навыка</h2>
      <form>
        <BaseTextarea placeholder="Например, Теория вероятностей" />
        <BaseButton variant="outlined"> Добавить навык </BaseButton>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
  import BaseButton from '@/components/ui/BaseButton.vue';
  import BaseTextarea from '@/components/ui/BaseTextarea.vue';
</script>

<style scoped lang="scss">
  h1 {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
  }
  .block {
    background-color: var(--gray-color);
    width: 25rem;
    padding: 0.875rem;
    border: 1px solid var(--medium-gray-color);
    border-radius: 0.3125rem;
    h2 {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 0.75rem;
  }
</style>

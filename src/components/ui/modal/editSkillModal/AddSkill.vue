<script setup lang="ts">
  import searchIconUrl from '@/assets/icons/search.svg?url';
  import BaseInput from '@/components/ui/BaseInput.vue';
  import ScrollablePanel from '@/components/ui/ScrollablePanel.vue';
  import { SkillType } from '@/models/Filters';
  import { computed, ref } from 'vue';

  type Props = {
    skills?: SkillType[];
    addSkillFunc: (id: number) => void;
  };

  const props = defineProps<Props>();

  const searchText = ref('');

  const filteredSkills = computed(() =>
    searchText.value
      ? props.skills?.filter(
          (skill) =>
            searchText.value &&
            skill.name.toLowerCase().includes(searchText.value.toLowerCase()),
        )
      : props.skills,
  );
  // TODO: заменить на TagList мб
</script>

<template>
  <div>
    <h1>Выберите навыки из списка</h1>
    <ScrollablePanel class="block">
      <template #header>
        <BaseInput
          v-model="searchText"
          :icon="searchIconUrl"
          placeholder="Поиск по навыкам..."
          type="text"
          inputmode="email"
          maxlength="100"
        />
      </template>
      <template #default>
        <ul class="list">
          <li v-for="skill of filteredSkills" :key="skill.id">
            <button @click="addSkillFunc(skill.id)">
              {{ skill.name }}
            </button>
          </li>
        </ul>
      </template>
    </ScrollablePanel>
  </div>
</template>

<style lang="scss" scoped>
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
    height: 32rem;
    display: flex;
    flex-direction: column;
  }
  .list {
    li {
      button {
        color: var(--dark-color);
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
      padding: 10px 0;
    }
  }
</style>

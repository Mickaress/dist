<script setup lang="ts">
  // TODO: сделать более общим и перенести в modal
  import { useGetAllSkillsQuery } from '@/api/SkillApi/hooks/useGetAllSkillsQuery';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import SkillList from '@/components/ui/SkillList.vue';
  import BaseModal from '@/components/ui/modal/BaseModal.vue';
  import { computed, ref, watch } from 'vue';
  import AddSkill from './AddSkill.vue';
  import OfferSkill from './OfferSkill.vue';

  type Props = {
    isShow: boolean;
    skillIds: number[];
    saveFunction: (skillIds: number[]) => void;
  };

  const props = defineProps<Props>();

  type Emits = {
    (event: 'update:isShow', isShow: boolean): void;
  };
  const emit = defineEmits<Emits>();

  function onCloseModal() {
    emit('update:isShow', false);
  }

  const selectedSkillIds = ref(props.skillIds);

  watch(
    () => props.isShow,
    () => {
      selectedSkillIds.value = props.skillIds;
    },
  );

  const { data: allSkills } = useGetAllSkillsQuery();

  const notUserSkills = computed(
    () => allSkills?.value?.filter((skill) => !selectedSkillIds.value.includes(skill.id)),
  );

  function deleteSkill(id: number) {
    selectedSkillIds.value = selectedSkillIds.value.filter((item) => item !== id);
  }

  function addSkill(id: number) {
    selectedSkillIds.value = [...selectedSkillIds.value, id];
  }

  const saveSkills = () => {
    props.saveFunction(selectedSkillIds.value);
    onCloseModal();
  };
</script>

<template>
  <BaseModal :is-show="isShow" @close="onCloseModal">
    <h1>Редактирование навыков</h1>
    <div class="skills">
      <h2>Выбранные навыки</h2>
      <SkillList
        v-if="selectedSkillIds?.length"
        :skill-ids="selectedSkillIds"
        :is-visible="true"
        deletable
        :deleteFunc="deleteSkill"
      />
      <p v-else>Навыки не выбраны</p>
    </div>
    <div class="cols">
      <AddSkill :skills="notUserSkills" :addSkillFunc="addSkill" />
      <OfferSkill />
    </div>
    <div class="btn">
      <BaseButton @click="saveSkills()">Сохранить</BaseButton>
    </div>
  </BaseModal>
</template>

<style scoped lang="scss">
  h1 {
    font-size: 1.875rem;
    margin-bottom: 20px;
  }
  .skills {
    h2 {
      margin-bottom: 8px;
    }
    p {
      font-size: 10px;
      text-transform: uppercase;
      color: var(--dark-gray-color);
    }
  }
  .cols {
    display: flex;
    gap: 5px;
    padding-top: 20px;
    margin-top: 30px;
    border-top: 1px solid var(--medium-gray-color);
  }
  .btn {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
</style>

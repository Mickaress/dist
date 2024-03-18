<script setup lang="ts">
  import { declOfNum } from '@/helpers/string';
  import { SkillType } from '@/models/Filters';
  import { computed, ref, withDefaults } from 'vue';
  import BaseButton from './BaseButton.vue';
  import BaseTag from './BaseTag.vue';

  type Props = {
    tagList: SkillType[];
    defaultVisible?: number;
    declWords?: [string, string, string];
    isVisible?: boolean;
    deletable?: boolean;
    deleteFunc?: (id: number) => void;
  };

  const props = withDefaults(defineProps<Props>(), {
    tagList: () => [],
    defaultVisible: 3,
    declWords: () => ['навык', 'навыка', 'навыков'],
    isVisible: false,
  });

  const isTagsVisible = ref(props.isVisible);

  const hiddenTagsCount = props.tagList.length - props.defaultVisible;
  const BtnText = computed(() =>
    isTagsVisible.value
      ? props.isVisible
        ? ''
        : 'Скрыть'
      : `+${hiddenTagsCount} ${declOfNum(hiddenTagsCount, props.declWords)}`,
  );

  const visibleTags = computed(() =>
    isTagsVisible.value
      ? props.tagList
      : props.tagList.slice(0, props.defaultVisible),
  );
</script>

<template>
  <ul v-if="visibleTags.length > 0" class="list">
    <li v-for="tag of visibleTags" :key="tag.id">
      <BaseTag
        :deletable="props.deletable"
        @click="props.deleteFunc && props.deleteFunc(tag.id)"
      >
        {{ tag.name }}
      </BaseTag>
    </li>
    <li v-if="hiddenTagsCount > 0" class="button">
      <BaseButton variant="text" @click="isTagsVisible = !isTagsVisible">
        {{ BtnText }}
      </BaseButton>
    </li>
  </ul>
</template>

<style scoped lang="scss">
  .list {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
  }
  .button {
    display: flex;
    align-items: center;
  }
</style>

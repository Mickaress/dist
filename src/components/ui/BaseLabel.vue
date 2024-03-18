<template>
  <component
    :is="props.is"
    :class="[$style.label, { [$style.disabled]: props.disabled }]"
  >
    <p v-if="props.label" :class="$style['label-text']">
      <slot name="label" :label="props.label" :required="props.required">
        {{ props.label }}
        <LabelRequiredIcon v-if="props.required" />
      </slot>
    </p>
    <slot name="default"></slot>
  </component>
</template>

<script setup lang="ts">
  import LabelRequiredIcon from './LabelRequiredIcon.vue';

  export type Is = 'label' | 'fieldset' | 'div';

  type Props = {
    label?: string;
    required?: boolean;
    disabled?: boolean;
    is?: Is;
  };

  const props = withDefaults(defineProps<Props>(), {
    required: false,
    disabled: false,
    label: undefined,
    is: 'label',
  });
</script>

<style module lang="scss">
  .label {
    padding: 0;
    border: none;
  }

  .label-text {
    margin-bottom: 0.625rem;
    font-size: 1.125rem;
    font-weight: 700;
    cursor: default;
  }

  .required {
    font-weight: bold;
    color: var(--red-color);
  }

  .disabled {
    color: var(--dark-gray-color);
  }
</style>

<template>
  <div :class="['card', `card--${color}`]">
    <h1 v-if="title">{{ title }}</h1>
    <slot />
  </div>
</template>

<script lang="ts">
import { Colors } from "@/resources/constants-types";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "BaseCard",
  props: {
    color: {
      type: String as PropType<Colors>,
      default: Colors.NEUTRAL,
      validator: (value: Colors) => Object.values(Colors).includes(value),
    },
    title: {
      type: String,
      required: false,
      default: undefined,
    },
  },
});
</script>

<style lang="scss" scoped>
.card {
  margin: 1rem;
  border: 1px solid;
  border-radius: 1rem;

  &--neutral {
    background-color: var(--neutral-foreground);
    color: var(--neutral-text);
    border-color: var(--neutral-detail);
  }

  &--cyan {
    background-color: var(--cyan-foreground);
    color: var(--cyan-text);
    border-color: var(--cyan-detail);
  }
}
</style>

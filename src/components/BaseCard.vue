<script lang="ts">
import { defineComponent, PropType } from "vue";

import { Colors } from "@/resources/constants-types";

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

<template>
  <div :class="['card', `card--${color}`]">
    <h1 v-if="title" class="card__top">{{ title }}</h1>
    <div class="card__center">
      <slot name="center" />
    </div>
    <div class="card__bottom">
      <slot name="left-corner" />
      <span class="card__bottom__center" />
      <slot name="right-corner" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin colorStyles {
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

  &--green {
    background-color: var(--green-foreground);
    color: var(--green-text);
    border-color: var(--green-detail);
  }

  &--purple {
    background-color: var(--purple-foreground);
    color: var(--purple-text);
    border-color: var(--purple-detail);
  }

  &--yellow {
    background-color: var(--yellow-foreground);
    color: var(--yellow-text);
    border-color: var(--yellow-detail);
  }
}

.card {
  margin: 1rem;
  border: 1px solid;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;

  @include colorStyles;

  &__top {
    flex: 0 0 auto;
  }

  &__center {
    flex: 1 0 0;
  }

  &__bottom {
    flex: 0 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &__center {
      flex: 1 0 0;
    }
  }
}
</style>

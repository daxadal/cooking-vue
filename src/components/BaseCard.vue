<script lang="ts">
import { defineComponent, PropType } from "vue";

import { Colors } from "@/resources/constants-types";

export default defineComponent({
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
    <h2 v-if="title" class="card__top">{{ title }}</h2>
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
@use "../styles/mixins.scss";

.card {
  margin: 1rem;
  border: 1px solid;
  border-radius: 1rem;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  @include mixins.colorStyles;

  &__top {
    flex: 1 0 auto;
  }

  &__center {
    flex: 0 0 auto;
    align-self: center;

    height: 96px;
    width: 96px;
    margin: 8px;
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

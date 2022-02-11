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
    leftCorner: {
      type: String,
      required: false,
      default: undefined,
    },
    rightCorner: {
      type: String,
      required: false,
      default: undefined,
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
      <slot />
    </div>
    <div class="card__bottom">
      <p class="card__bottom__corner" v-if="leftCorner">{{ leftCorner }}</p>
      <span class="card__bottom__center" />
      <p class="card__bottom__corner" v-if="rightCorner">{{ rightCorner }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  margin: 1rem;
  border: 1px solid;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;

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

    &__corner {
      flex: 0 0 auto;
    }

    &__center {
      flex: 1 0 0;
    }
  }
}
</style>

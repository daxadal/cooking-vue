<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Colors } from "@/resources/constants-types";

export default defineComponent({
  props: {
    tag: {
      type: String,
      default: "a",
      validator: (value: string) =>
        ["a", "button", "router-link", "submit", "label"].includes(value),
    },
    color: {
      type: String as PropType<Colors>,
      default: Colors.NEUTRAL,
      validator: (value: Colors) => Object.values(Colors).includes(value),
    },
    outlined: { type: Boolean },
    text: { type: Boolean },
  },
});
</script>

<template>
  <component
    :is="tag === 'submit' ? 'input' : tag"
    :type="tag === 'submit' ? 'submit' : undefined"
    :class="{
      button: true,
      'button--outlined': outlined,
      'button--text': text,
      [`button--${color}`]: color,
    }"
    v-bind="$attrs"
  >
    <span v-if="tag !== 'submit' && $slots.default" class="button__text">
      <slot />
    </span>
  </component>
</template>

<style lang="scss" scoped>
@use "../styles/mixins.scss";

.button {
  display: flex;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
  border: 1px solid;
  border-radius: 4px;
  box-shadow: none;

  max-width: 100%;
  padding: 6px 16px;

  font-family: inherit;
  line-height: 1;
  text-shadow: none;

  cursor: pointer;
  transition: all 0.2s;
  user-select: none;

  @include mixins.colorStyles;

  &--text {
    border: none;
  }

  &--text:not(:active, :hover),
  &--outlined:not(:active, :hover) {
    background: transparent;
  }

  &:hover,
  &:active {
    filter: brightness(85%);
  }

  &:focus {
    border: 1px solid var(--neutral-text);
  }
}
</style>

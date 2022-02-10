<script lang="ts">
import { computed, defineComponent } from "vue";
import { Colors } from "@/resources/constants-types";

export default defineComponent({
  props: {
    tag: {
      type: String,
      default: "a",
      validator(this: void, value: string) {
        return ["a", "button", "router-link", "submit", "label"].includes(
          value
        );
      },
    },
    type: {
      type: String,
      default: Colors.NEUTRAL,
      validator: (value: Colors) => Object.values(Colors).includes(value),
    },
    disabled: { type: Boolean },
    outlined: { type: Boolean },
    rounded: { type: Boolean },
    block: { type: Boolean },
    text: { type: Boolean },
    relatedId: { type: String },
  },
  setup(props, { slots }) {
    let innerText;
    // if (props.tag === "submit" && slots.default) {
    //   innerText = slots.default()?.[0]?.children?.toString().trim();
    // } else {
    innerText = undefined;
    // }
    const classes = computed(() => [
      {
        "button--empty": !slots.default,
        [`button--${props.type}--outlined`]: props.outlined,
        "button--rounded": props.rounded,
        "button--block": props.block,
        "button--text": props.text,
        [`button--${props.type || "neutral"}`]: props.type,
      },
    ]);
    return { classes, innerText };
  },
});
</script>

<template>
  <component
    :is="tag === 'submit' ? 'input' : tag"
    :type="tag === 'submit' ? 'submit' : undefined"
    :value="innerText"
    :disabled="disabled"
    class="button"
    :class="classes"
    :for="relatedId"
  >
    <span v-if="tag !== 'submit' && $slots.default" class="button__text">
      <slot />
    </span>
  </component>
</template>

<style lang="scss" scoped>
@mixin setButtonType($color) {
  background-color: $color;
  border: 1px solid $color;
  box-shadow: 0 2px 4px fade($color, 40%);

  &:hover {
    background-color: lighten($color, 16%);
    border: 1px solid lighten($color, 16%);
  }

  &:active {
    background-color: darken($color, 7%);
    border: 1px solid darken($color, 7%);
    box-shadow: none;
  }

  &:focus {
    box-shadow: 0 1px 2px fade-out($color, 0.8), 0 0 0 2px fade-out($color, 0.8);
  }

  &.button--text {
    color: $color;
    text-shadow: none;
    background: transparent;
    border: none;
    box-shadow: none;
  }

  &.button--text:hover {
    background-color: fade-out($color, 0.94);
  }

  &.button--text:focus {
    box-shadow: 0 0 0 3px fade-out($color, 0.8);
  }

  &.button--text:active {
    background-color: fade-out($color, 0.8);
    box-shadow: none;
  }
}

@mixin setOutlined($color) {
  color: $color;
  text-shadow: none;
  background-color: transparent;
  border: 1px solid $color;
  box-shadow: none;

  &:hover {
    background-color: fade-out($color, 0.93);
  }

  &:focus {
    box-shadow: 0 0 0 3px fade-out($color, 0.8);
  }

  &:active {
    top: 0;
    background-color: fade-out($color, 0.85) !important;
  }
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  max-width: 100%;
  padding: 6px 16px;
  font-family: inherit;
  line-height: 1;
  border: 0;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;

  &--text,
  > i {
    vertical-align: middle;
  }

  &--text {
    display: flex;

    &:empty {
      display: none;
    }
  }

  &--block {
    width: 100%;
  }

  &--rounded {
    border-radius: 16px !important;
  }

  &--neutral {
    box-sizing: border-box;
    color: var(--neutral-text);
    text-shadow: none;
    background-color: var(--background-color);
    border: 1px solid var(--soft-highlight);
    box-shadow: #e4e7eb 0 1px 1px 0;

    &:focus {
      border: 1px solid #a6b0bb;
      box-shadow: #e4e7eb 0 1px 1px 0, 0 0 0 1px fade-out(#a6b0bb, 0.8);
    }

    &.button--text {
      color: var(--neutral-text);
      text-shadow: none;
      background: transparent;
      border: none;
      box-shadow: none;
    }

    &.button--text:hover {
      background-color: fade-out(black, 0.94);
    }

    &.button--text:focus {
      box-shadow: 0 0 0 3px fade-out(#a6b0bb, 0.8);
    }

    &.button--text:active {
      background-color: fade-out(black, 0.8);
      box-shadow: none;
    }
  }

  &:disabled,
  &:disabled:hover,
  &:disabled:active {
    top: 0;
    color: var(--disabled-color);
    text-shadow: none;
    background-color: var(--disabled-color);
    border: 1px solid var(--disabled-color);
    box-shadow: none;
    cursor: not-allowed;
  }
}
</style>

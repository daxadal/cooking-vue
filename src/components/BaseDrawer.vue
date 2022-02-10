<script lang="ts">
import { defineComponent, PropType } from "vue";

export enum Positions {
  L = "left",
  R = "right",
}

export default defineComponent({
  name: "navigation-drawer",
  components: {},
  props: {
    isShowing: { type: Boolean, default: false },
    width: { type: String, default: "50vw" },
    closableMask: { type: Boolean, default: true },
    hideMask: Boolean,
    placement: {
      type: String as PropType<Positions>,
      default: Positions.R,
      validator: (value: Positions) => Object.values(Positions).includes(value),
    },
  },
  setup(props, { emit }) {
    function maskClick() {
      if (props.closableMask) {
        close();
      }
    }

    function close() {
      emit("update:isShowing", false);
    }

    return {
      maskClick,
      close,
    };
  },
});
</script>

<template>
  <teleport to="body">
    <aside class="drawer">
      <div
        v-show="isShowing && !hideMask"
        aria-label="mask"
        class="drawer__mask"
        tabindex="0"
        @click.self="maskClick"
      />
      <div
        class="drawer__body"
        aria-label="body"
        :class="`drawer__body--${placement}`"
        :style="{ width }"
        v-show="isShowing"
      >
        <slot />
      </div>
    </aside>
  </teleport>
</template>

<style lang="scss" scoped>
.drawer {
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;

  &__mask {
    position: fixed;
    top: 0;
    left: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.3);
  }

  &__body {
    position: fixed;
    display: flex;
    flex-direction: column;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    max-width: 100%;
    height: 100%;
    padding: 2rem;
    overflow: auto;
    background-color: var(--primary-green-color);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.07), 0 7px 14px rgba(50, 50, 93, 0.1),
      0 0 0 1px rgba(50, 50, 93, 0.05);
    transition: transform 0.2s ease-in-out;
    transition-delay: 1s;

    &--right {
      right: 0;
    }

    &--left {
      left: 0;
    }
  }
}
</style>

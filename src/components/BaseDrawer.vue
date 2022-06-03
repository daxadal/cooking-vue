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
    isShowing: { type: Boolean, required: true },
    width: { type: String, required: true },
    closeOnClickAway: { type: Boolean, required: true },
    hasMask: { type: Boolean, required: true },
    placement: {
      type: String as PropType<Positions>,
      required: true,
      validator: (value: Positions) => Object.values(Positions).includes(value),
    },
    topOffset: { type: Number, required: true },
  },
  setup(props, { emit }) {
    function maskClick() {
      if (props.closeOnClickAway) {
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
        v-show="isShowing && hasMask"
        class="drawer__mask"
        tabindex="0"
        @click.self="maskClick"
        :style="{ top: topOffset + 'px' }"
      />
      <div
        v-show="isShowing"
        class="drawer__body"
        :class="`drawer__body--${placement}`"
        :style="{ width, top: topOffset + 'px' }"
      >
        <slot />
      </div>
    </aside>
  </teleport>
</template>

<style lang="scss" scoped>
.drawer {
  &__mask {
    position: fixed;
    left: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgba(black, 0.5);
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
    background-color: var(--neutral-foreground);
    transition: transform 0.2s ease-in-out;
    transition-delay: 1s;
    border: 1px solid var(--neutral-detail);

    &--right {
      right: 0;
    }

    &--left {
      left: 0;
    }
  }
}
</style>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseToolbar",
  props: {
    height: { type: Number, required: true },
  },
});
</script>

<template>
  <header class="toolbar" :style="{ height: height + 'px' }">
    <nav class="toolbar__nav">
      <slot />
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@mixin display($vertical-align: center) {
  display: flex;
  flex-wrap: wrap;
  align-items: $vertical-align;
  justify-content: space-between;
}

.toolbar {
  box-sizing: border-box;
  position: fixed;
  top: 0;
  width: 100%;
  overflow: hidden;
  background-color: var(--neutral-foreground);
  border-bottom: 1px solid var(--neutral-detail);

  &__nav {
    @include display;

    padding: 1rem;
    width: 100%;
  }
}
</style>

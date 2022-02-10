<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseToolbar",
});
</script>

<template>
  <header class="toolbar">
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
  position: fixed;
  top: 0;
  width: 100%;
  overflow: hidden;
  background-color: var(--neutral-foreground);
  // box-shadow: 0 6px 24px -12px black;
  border-bottom: 1px solid var(--neutral-detail);

  &__nav {
    @include display;

    padding: 1rem;
  }
}
</style>

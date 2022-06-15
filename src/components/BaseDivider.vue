<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  props: { vertical: { type: Boolean } },
  setup(props) {
    const classes = computed(() => [
      "divider",
      props.vertical ? "divider--vertical" : "divider--horizontal",
    ]);
    return { classes };
  },
});
</script>

<template>
  <div :class="classes" role="separator" />
</template>

<style lang="scss" scoped>
.divider {
  background-color: var(--neutral-detail);
  margin: 16px;

  &--horizontal {
    display: block;
    clear: both;
    width: 100%;
    min-width: 100%;
    height: 1px;
    align-self: center;
  }

  &--vertical {
    display: inline-block;
    width: 1px;
  }
}
</style>

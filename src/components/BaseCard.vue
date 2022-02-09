<template>
  <div class="card">
    <h1 v-if="title" class="card__title">{{ title }}</h1>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseCard",
  props: {
    title: {
      type: String,
      required: false,
      default: undefined,
    },
  },
  setup() {},
});
</script>

<style lang="css" scoped>
.card {
  margin: 1rem;
  background-color: var(--neutral-foreground);
  border: 1px solid var(--neutral-detail);
  border-radius: 1rem;
}

.card__title {
  color: var(--neutral-text);
}
</style>
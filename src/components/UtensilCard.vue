<script lang="ts">
import { defineComponent, PropType } from "vue";

import BaseCard from "@/components/BaseCard.vue";

import { Colors, Utensil } from "@/resources/constants-types";

export default defineComponent({
  components: {
    BaseCard,
  },
  props: {
    utensil: {
      type: Object as PropType<Partial<Utensil>>,
      required: true,
    },
  },
  setup() {
    return { Colors };
  },
});
</script>

<template>
  <BaseCard :title="utensil.name || '(No name)'" :color="Colors.YELLOW">
    <template #center>
      <img src="@/assets/whisk.svg" />
    </template>
    <template #left-corner v-if="utensil.id">
      <p>ID: {{ utensil.id }}</p>
    </template>
    <template #right-corner>
      <p>{{ utensil.waitTimeInMillis || 0 }} ms</p>
    </template>
  </BaseCard>
</template>

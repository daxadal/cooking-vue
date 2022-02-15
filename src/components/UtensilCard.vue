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
      type: Object as PropType<Utensil>,
      required: true,
    },
  },
  setup() {
    return { Colors };
  },
});
</script>

<template>
  <BaseCard :title="utensil.name" :color="Colors.YELLOW">
    <template #center>
      <img src="@/assets/success.png" />
    </template>
    <template #left-corner>
      <p>ID: {{ utensil.id }}</p>
    </template>
    <template #right-corner>
      <p>{{ utensil.waitTimeInMillis }} ms</p>
    </template>
  </BaseCard>
</template>

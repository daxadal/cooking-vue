<script lang="ts">
import { defineComponent } from "vue";

import BaseCard from "@/components/BaseCard.vue";

import { Colors } from "@/resources/constants-types";

export default defineComponent({
  components: {
    BaseCard,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },
  setup() {
    return { Colors };
  },
});
</script>

<template>
  <BaseCard :title="title" :color="Colors.NEUTRAL">
    <template #center>
      <p>{{ count }}</p>
    </template>
  </BaseCard>
</template>

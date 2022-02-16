<script lang="ts">
import { defineComponent, PropType } from "vue";

import { DetailedStep } from "@/resources/constants-types";
import IngredientCard from "@/components/IngredientCard.vue";
import UtensilCard from "@/components/UtensilCard.vue";

export default defineComponent({
  components: {
    IngredientCard,
    UtensilCard,
  },
  props: {
    step: {
      type: Object as PropType<DetailedStep>,
      required: true,
    },
  },
});
</script>

<template>
  <div class="cards">
    <IngredientCard :ingredient="step.input" />
    <img src="@/assets/right-arrow.svg" />
    <UtensilCard :utensil="step.utensil" />
    <img src="@/assets/right-arrow.svg" />
    <IngredientCard :ingredient="step.input" />
  </div>
</template>

<style lang="scss" scoped>
.cards {
  display: flex;
  flex-direction: row;
}
</style>

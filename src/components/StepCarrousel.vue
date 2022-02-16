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
    <IngredientCard class="cards__card" :ingredient="step.input" />
    <img class="cards__arrow" src="@/assets/right-arrow.svg" />
    <UtensilCard class="cards__card" :utensil="step.utensil" />
    <img class="cards__arrow" src="@/assets/right-arrow.svg" />
    <IngredientCard class="cards__card" :ingredient="step.output" />
  </div>
</template>

<style lang="scss" scoped>
.cards {
  display: flex;
  flex-direction: row;
  align-items: center;

  &__card {
    flex: 1 0 auto;
  }

  &__arrow {
    flex: 0 1 100px;
    max-width: 100px;
    max-height: 100px;
    object-fit: contain;
    color: var(--neutral-detail);
  }
}
</style>

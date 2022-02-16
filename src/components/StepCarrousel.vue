<script lang="ts">
import { defineComponent, PropType } from "vue";

import { DetailedStep } from "@/resources/constants-types";
import IngredientCard from "@/components/IngredientCard.vue";
import UtensilCard from "@/components/UtensilCard.vue";
import IconRightArrow from "@/icons/IconRightArrow.vue";

export default defineComponent({
  components: {
    IngredientCard,
    UtensilCard,
    IconRightArrow,
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
    <IconRightArrow class="cards__arrow" />
    <UtensilCard class="cards__card" :utensil="step.utensil" />
    <IconRightArrow class="cards__arrow" />
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
    flex: 0 1 auto;
    fill: var(--neutral-detail);
  }
}
</style>

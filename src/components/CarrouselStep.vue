<script lang="ts">
import { defineComponent, PropType } from "vue";

import { DetailedStep } from "@/resources/constants-types";
import CardIngredient from "@/components/CardIngredient.vue";
import CardUtensil from "@/components/CardUtensil.vue";
import IconRightArrow from "@/icons/IconRightArrow.vue";

export default defineComponent({
  components: {
    CardIngredient,
    CardUtensil,
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
    <CardIngredient class="cards__card" :ingredient="step.input" />
    <IconRightArrow class="cards__arrow" />
    <CardUtensil class="cards__card" :utensil="step.utensil" />
    <IconRightArrow class="cards__arrow" />
    <CardIngredient class="cards__card" :ingredient="step.output" />
  </div>
</template>

<style lang="scss" scoped>
.cards {
  display: flex;
  flex-direction: row;
  align-items: stretch;

  &__card {
    flex: 1 0 0;
  }

  &__arrow {
    flex: 0 1 48px;
    min-width: 25px;
    fill: var(--neutral-detail);
  }
}
</style>

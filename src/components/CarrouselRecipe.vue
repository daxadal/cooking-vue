<script lang="ts">
import { defineComponent, PropType } from "vue";

import { DetailedRecipe } from "@/resources/constants-types";
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
    recipe: {
      type: Object as PropType<DetailedRecipe>,
      required: true,
    },
  },
});
</script>

<template>
  <div class="cards">
    <CardIngredient class="cards__card" :ingredient="recipe.input" />
    <IconRightArrow class="cards__arrow" />
    <CardUtensil class="cards__card" :utensil="recipe.utensil1" />
    <IconRightArrow class="cards__arrow" />
    <CardIngredient class="cards__card" :ingredient="recipe.mid1" />
    <template v-if="recipe.steps >= 2 && recipe.utensil2 && recipe.mid2">
      <IconRightArrow class="cards__arrow" />
      <CardUtensil class="cards__card" :utensil="recipe.utensil2" />
      <IconRightArrow class="cards__arrow" />
      <CardIngredient class="cards__card" :ingredient="recipe.mid2" />
      <template v-if="recipe.steps >= 3 && recipe.utensil3 && recipe.mid3">
        <IconRightArrow class="cards__arrow" />
        <CardUtensil class="cards__card" :utensil="recipe.utensil3" />
        <IconRightArrow class="cards__arrow" />
        <CardIngredient class="cards__card" :ingredient="recipe.mid3" />
        <template v-if="recipe.steps >= 4 && recipe.utensil4 && recipe.mid4">
          <IconRightArrow class="cards__arrow" />
          <CardUtensil class="cards__card" :utensil="recipe.utensil4" />
          <IconRightArrow class="cards__arrow" />
          <CardIngredient class="cards__card" :ingredient="recipe.mid4" />
          <template v-if="recipe.steps >= 5 && recipe.utensil5 && recipe.mid5">
            <IconRightArrow class="cards__arrow" />
            <CardUtensil class="cards__card" :utensil="recipe.utensil5" />
            <IconRightArrow class="cards__arrow" />
            <CardIngredient class="cards__card" :ingredient="recipe.mid5" />
          </template>
        </template>
      </template>
    </template>
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
    flex: 0 1 32px;
    min-width: 25px;
    fill: var(--neutral-detail);
  }
}
</style>

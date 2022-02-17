<template>
  <div class="cards">
    <BaseCard
      class="cards__card"
      :color="Colors.CYAN"
      title="Awesome card"
      leftCorner="cornerL"
      rightCorner="cornerR"
    >
      <template #center>
        <button>Click me!</button><button>No, click ME!</button>
      </template>
    </BaseCard>
    <BaseCard class="cards__card" title="Lorem ipsum" leftCorner="cornerL">
      <template #center>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempus
          orci mauris, nec volutpat libero convallis non. Curabitur sed sagittis
          nisi. Nullam elementum augue et urna placerat, pretium sollicitudin
          nulla gravida. Donec ac pellentesque dolor. Nulla commodo auctor
          purus, ultricies bibendum mi ultrices rutrum. Pellentesque facilisis,
          orci nec fringilla pretium, magna arcu ultricies odio, eget dapibus
          nulla ex nec risus. Suspendisse potenti
        </p>
      </template>
    </BaseCard>
    <BaseCard class="cards__card" rightCorner="cornerR">
      <template #center> <input placeholder="Type something" /> </template>
    </BaseCard>
  </div>
  <StepCarrousel
    :step="{
      input: { id: 101, name: 'Input', type: IngredientType.START },
      utensil: { id: 5, name: 'Utensil', waitTimeInMillis: 500 },
      output: { id: 102, name: 'Output', type: IngredientType.MID },
    }"
  />
  <RecipeCarrousel
    :recipe="{
      steps: 3,
      input: { id: 101, name: 'Liquid dough', type: IngredientType.START },
      utensil1: { id: 1, name: 'Stand mixer', waitTimeInMillis: 2000 },
      mid1: { id: 103, name: 'Raw muffin', type: IngredientType.MID },
      utensil2: { id: 4, name: 'Chocolate sprinkler', waitTimeInMillis: 1000 },
      mid2: { id: 105, name: 'Raw chocolate muffin', type: IngredientType.MID },
      utensil3: { id: 2, name: 'Oven', waitTimeInMillis: 5000 },
      mid3: { id: 110, name: 'Chocolate muffin', type: IngredientType.END },
      output: { id: 110, name: 'Chocolate muffin', type: IngredientType.END },
    }"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BaseCard from "@/components/BaseCard.vue";

import { Colors, IngredientType } from "@/resources/constants-types";
import StepCarrousel from "@/components/StepCarrousel.vue";
import RecipeCarrousel from "@/components/RecipeCarrousel.vue";

export default defineComponent({
  name: "Home",
  components: {
    BaseCard,
    StepCarrousel,
    RecipeCarrousel,
  },
  setup() {
    return {
      IngredientType,
      Colors,
    };
  },
});
</script>

<style>
.cards {
  display: flex;
  flex-direction: row;
}

.cards__card {
  flex: 1 0 0;
}
</style>

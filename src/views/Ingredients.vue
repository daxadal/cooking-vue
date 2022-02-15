<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";

import IngredientCard from "@/components/IngredientCard.vue";
import { Ingredient } from "@/resources/constants-types";
import { getAllIngredients } from "@/services/api/routes";

export default defineComponent({
  name: "Ingredients",
  components: { IngredientCard },
  setup() {
    const ingredients = ref<Ingredient[]>([]);

    onMounted(async () => {
      ingredients.value = await getAllIngredients();
    });

    return { ingredients };
  },
});
</script>

<template>
  <div class="cards">
    <IngredientCard
      v-for="ingredient in ingredients"
      :key="ingredient.id"
      :ingredient="ingredient"
      class="cards__card"
    />
    <UtensilCard
      class="cards__card"
      :utensil="{ id: 1, name: 'Shaker', waitTimeInMillis: 500 }"
    />
  </div>
</template>

<style scoped>
.cards {
  display: flex;
  flex-direction: row;
}

.cards__card {
  flex: 1 0 0;
}
</style>

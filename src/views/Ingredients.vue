<script lang="ts">
import { ref, onMounted, defineComponent, computed } from "vue";

import IngredientCard from "@/components/IngredientCard.vue";

import { Ingredient } from "@/resources/constants-types";
import { getAllIngredients } from "@/services/api/routes";
import { getScreenType, ScreenType } from "@/services/screen-size";

export default defineComponent({
  name: "Ingredients",
  components: { IngredientCard },
  setup() {
    const ingredients = ref<Ingredient[]>([]);

    const screenType = getScreenType();
    const columnStyle = computed(() =>
      screenType.value === ScreenType.DESKTOP ? "--columns: 4" : "--columns: 2"
    );

    onMounted(async () => {
      ingredients.value = await getAllIngredients();
    });

    return { columnStyle, ingredients };
  },
});
</script>

<template>
  <div class="cards" :style="columnStyle">
    <IngredientCard
      v-for="ingredient in ingredients"
      :key="ingredient.id"
      :ingredient="ingredient"
      class="cards__card"
    />
  </div>
</template>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  row-gap: 1rem;
}

.cards__card {
  flex: 1 0 0;
}
</style>

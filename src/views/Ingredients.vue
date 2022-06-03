<script lang="ts">
import { ref, onMounted, defineComponent, computed } from "vue";

import InformationModal from "@/components/InformationModal.vue";
import IngredientCard from "@/components/IngredientCard.vue";

import { Ingredient } from "@/resources/constants-types";
import { getAllIngredients } from "@/services/api/routes";
import { getScreenType, ScreenType } from "@/services/screen-size";

export default defineComponent({
  name: "Ingredients",
  components: { IngredientCard, InformationModal },
  setup() {
    const ingredients = ref<Ingredient[]>([]);

    const isInfoVisible = ref(false);
    const modalTitle = ref();
    const modalMessage = ref();
    const isError = ref(true);

    function showErrorModal(error: any) {
      isError.value = true;
      modalTitle.value = "Error";
      modalMessage.value =
        error?.message || error || "An unexpected error has occurred";
      isInfoVisible.value = true;
    }

    const screenType = getScreenType();
    const columnStyle = computed(() =>
      screenType.value === ScreenType.DESKTOP ? "--columns: 4" : "--columns: 2"
    );

    onMounted(async () => {
      try {
        ingredients.value = await getAllIngredients();
      } catch (error) {
        showErrorModal(error);
      }
    });

    return {
      columnStyle,
      ingredients,

      isInfoVisible,
      modalTitle,
      modalMessage,
      isError,
    };
  },
});
</script>

<template>
  <div class="title">
    <h1>Ingredients</h1>
  </div>
  <div class="cards" :style="columnStyle">
    <IngredientCard
      v-for="ingredient in ingredients"
      :key="ingredient.id"
      :ingredient="ingredient"
      class="cards__card"
    />
  </div>
  <InformationModal
    v-if="isInfoVisible"
    @update:isVisible="isInfoVisible = $event"
    :title="modalTitle"
    :message="modalMessage"
    :isError="isError"
  />
</template>

<style scoped>
.title {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cards {
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  row-gap: 1rem;
}

.cards__card {
  flex: 1 0 0;
}
</style>

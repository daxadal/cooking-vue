<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";

import InformationModal from "@/components/InformationModal.vue";
import RecipeCarrousel from "@/components/RecipeCarrousel.vue";

import { DetailedRecipe } from "@/resources/constants-types";
import { getAllDetailedRecipes } from "@/services/api/routes";

export default defineComponent({
  name: "Recipes",
  components: { RecipeCarrousel, InformationModal },
  setup() {
    const recipes = ref<DetailedRecipe[]>([]);

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

    onMounted(async () => {
      try {
        recipes.value = await getAllDetailedRecipes();
      } catch (error) {
        showErrorModal(error);
      }
    });

    return {
      recipes,

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
    <h1>Recipes</h1>
  </div>
  <div>
    <RecipeCarrousel
      v-for="recipe in recipes"
      :key="`${recipe.input.id}-${recipe.output.id}`"
      :recipe="recipe"
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
</style>

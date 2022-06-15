<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";

import ModalInformation, { ModalType } from "@/components/ModalInformation.vue";
import CarrouselRecipe from "@/components/CarrouselRecipe.vue";

import { DetailedRecipe } from "@/resources/constants-types";
import { getAllDetailedRecipes } from "@/services/api/routes";

export default defineComponent({
  components: { CarrouselRecipe, ModalInformation },
  setup() {
    const recipes = ref<DetailedRecipe[]>([]);

    const isInfoVisible = ref(false);
    const modalMessage = ref();

    function showErrorModal(error: any) {
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
      ModalType,

      recipes,

      isInfoVisible,
      modalMessage,
    };
  },
});
</script>

<template>
  <div class="title">
    <h1>Recipes</h1>
  </div>
  <div>
    <CarrouselRecipe
      v-for="recipe in recipes"
      :key="`${recipe.input.id}-${recipe.output.id}`"
      :recipe="recipe"
    />
  </div>

  <ModalInformation
    v-if="isInfoVisible"
    @close="isInfoVisible = false"
    :message="modalMessage"
    :type="ModalType.ERROR"
  />
</template>

<style lang="scss" scoped>
.title {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

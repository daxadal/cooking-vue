<script lang="ts">
import { ref, onMounted, defineComponent, computed } from "vue";
import { RouterLink } from "vue-router";

import InformationModal, { ModalType } from "@/components/InformationModal.vue";
import IngredientCard from "@/components/IngredientCard.vue";

import { Ingredient } from "@/resources/constants-types";
import { getAllIngredients } from "@/services/api/routes";
import { getScreenType, ScreenType } from "@/services/screen-size";
import BaseButton from "@/components/BaseButton.vue";

export default defineComponent({
  name: "Ingredients",
  components: { IngredientCard, InformationModal, BaseButton, RouterLink },
  setup() {
    const ingredients = ref<Ingredient[]>([]);

    const isInfoVisible = ref(false);
    const modalMessage = ref();

    function showErrorModal(error: any) {
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
      ModalType,

      columnStyle,
      ingredients,

      isInfoVisible,
      modalMessage,
    };
  },
});
</script>

<template>
  <div class="title">
    <h1>Ingredients</h1>
    <div class="title__buttons">
      <BaseButton tag="router-link" to="/ingredients/new">
        Create new
      </BaseButton>
    </div>
  </div>

  <div class="cards" :style="columnStyle">
    <RouterLink
      v-for="ingredient in ingredients"
      :key="ingredient.id"
      :to="`/ingredients/${ingredient.id}`"
      class="cards__link"
    >
      <IngredientCard :ingredient="ingredient" class="cards__card" />
    </RouterLink>
  </div>

  <InformationModal
    v-if="isInfoVisible"
    @update:isVisible="isInfoVisible = $event"
    :message="modalMessage"
    :type="ModalType.ERROR"
  />
</template>

<style lang="scss" scoped>
.title {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__buttons {
    box-sizing: border-box;
    width: 100%;
    padding: 0 32px;

    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
}

.cards {
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  row-gap: 1rem;

  &__link {
    display: flex;
  }

  &__card {
    flex: 1 0 0;
  }
}
</style>

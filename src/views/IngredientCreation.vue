<script lang="ts">
import { ref, defineComponent, computed } from "vue";

import InformationModal from "@/components/InformationModal.vue";
import IngredientCard from "@/components/IngredientCard.vue";

import { Ingredient, IngredientType } from "@/resources/constants-types";
import { createIngredient } from "@/services/api/routes";
import { getScreenType, ScreenType } from "@/services/screen-size";
import BaseButton from "@/components/BaseButton.vue";
import router from "@/services/router";

export default defineComponent({
  name: "ingredientData",
  components: { IngredientCard, InformationModal, BaseButton },
  setup() {
    const ingredientData = ref<Partial<Ingredient>>({});

    const isInfoVisible = ref(false);
    const modalTitle = ref();
    const modalMessage = ref();
    const isError = ref(true);

    function showErrorModal(error: any) {
      isError.value = true;
      modalTitle.value = "Error";
      modalMessage.value = error?.message || error || "Ha ocurrido un error";
      isInfoVisible.value = true;
    }

    const screenType = getScreenType();
    const columnStyle = computed(() =>
      screenType.value === ScreenType.DESKTOP ? "--columns: 4" : "--columns: 2"
    );

    async function submit() {
      try {
        const { name, type } = ingredientData.value;
        if (!name || !type) {
          showErrorModal("Rellena todos los campos");
          return;
        }
        const ingredient = await createIngredient({ name, type });
        router.push(`/ingredient/${ingredient.id}`);
      } catch (error) {
        showErrorModal(error);
      }
    }

    return {
      IngredientType,

      columnStyle,
      ingredientData,

      submit,

      isInfoVisible,
      modalTitle,
      modalMessage,
      isError,
    };
  },
});
</script>

<template>
  <div class="cards" :style="columnStyle">
    <IngredientCard :ingredient="ingredientData" class="cards__card" />
    <form @submit.prevent="submit">
      <label for="name">Name: </label>
      <input id="name" v-model="ingredientData.name" type="text" name="name" />
      <select id="type-selector" class="a-select" v-model="ingredientData.type">
        <option :value="undefined">(no type)</option>
        <option :value="IngredientType.START">Raw ingredient</option>
        <option :value="IngredientType.MID">Half-cooked food</option>
        <option :value="IngredientType.END">Finished product</option>
      </select>
      <BaseButton tag="submit" value="Create"></BaseButton>
    </form>
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
.cards {
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  row-gap: 1rem;
}

.cards__card {
  flex: 1 0 0;
}
</style>

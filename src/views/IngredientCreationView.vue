<script lang="ts">
import { ref, defineComponent, computed } from "vue";

import ModalInformation, { ModalType } from "@/components/ModalInformation.vue";
import CardIngredient from "@/components/CardIngredient.vue";

import { Ingredient, IngredientType } from "@/resources/constants-types";

import { createIngredient } from "@/services/api";
import { getScreenType, ScreenType } from "@/services/screen-size";
import router from "@/services/router";

import BaseButton from "@/components/BaseButton.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseSelector from "@/components/BaseSelector.vue";

export default defineComponent({
  components: {
    CardIngredient,
    ModalInformation,
    BaseButton,
    BaseInput,
    BaseSelector,
  },
  setup() {
    const ingredientData = ref<Partial<Ingredient>>({});

    const isInfoVisible = ref(false);
    const modalMessage = ref();

    function showErrorModal(error: any) {
      modalMessage.value =
        error?.message || error || "An unexpected error has occurred";
      isInfoVisible.value = true;
    }

    const screenType = getScreenType();
    const columnStyle = computed(() =>
      screenType.value === ScreenType.DESKTOP ? "width: 75%" : "width: 100%"
    );

    async function submit() {
      try {
        const { name, type } = ingredientData.value;
        if (!name || !type) {
          showErrorModal("Fill out all the fields");
          return;
        }
        const ingredient = await createIngredient({ name, type });
        router.push(`/ingredients/${ingredient.id}`);
      } catch (error) {
        showErrorModal(error);
      }
    }

    return {
      ModalType,
      IngredientType,

      columnStyle,
      ingredientData,

      submit,

      isInfoVisible,
      modalMessage,
    };
  },
});
</script>

<template>
  <div class="title">
    <h1>Ingredients</h1>
  </div>
  <div class="container" :style="columnStyle">
    <CardIngredient :ingredient="ingredientData" class="container__card" />

    <form class="container__form" @submit.prevent="submit">
      <BaseInput
        id="id"
        modelValue="(not set)"
        type="text"
        tag="ID: "
        disabled
      />
      <BaseInput
        id="name"
        v-model="ingredientData.name"
        type="text"
        tag="Name: "
      />
      <BaseSelector
        id="type-selector"
        v-model="ingredientData.type"
        tag="Type: "
      >
        <option value="" disabled>(Select an option)</option>
        <option :value="IngredientType.START">Raw ingredient</option>
        <option :value="IngredientType.MID">Half-cooked food</option>
        <option :value="IngredientType.END">Finished product</option>
      </BaseSelector>
      <BaseButton tag="submit" value="Create" />
    </form>
  </div>

  <ModalInformation
    v-if="isInfoVisible"
    :message="modalMessage"
    :type="ModalType.ERROR"
    @close="isInfoVisible = false"
  />
</template>

<style lang="scss" scoped>
.title {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container {
  display: flex;
  flex-direction: row;
  margin: auto;

  &__card {
    flex: 1 0 0;
  }
  &__form {
    flex: 1 0 0;
    margin: 16px;

    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}
</style>

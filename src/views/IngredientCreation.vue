<script lang="ts">
import { ref, defineComponent, computed } from "vue";

import InformationModal, { ModalType } from "@/components/InformationModal.vue";
import IngredientCard from "@/components/IngredientCard.vue";

import { Ingredient, IngredientType } from "@/resources/constants-types";

import { createIngredient } from "@/services/api/routes";
import { getScreenType, ScreenType } from "@/services/screen-size";
import router from "@/services/router";

import BaseButton from "@/components/BaseButton.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseSelector from "@/components/BaseSelector.vue";

export default defineComponent({
  components: {
    IngredientCard,
    InformationModal,
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
      screenType.value === ScreenType.DESKTOP ? "--columns: 4" : "--columns: 2"
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
  <div class="wrapper" :style="columnStyle">
    <IngredientCard :ingredient="ingredientData" class="wrapper__card" />

    <form @submit.prevent="submit" class="wrapper__form">
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
        tag="Type: "
        v-model="ingredientData.type"
      >
        <option value="">(Select an option)</option>
        <option :value="IngredientType.START">Raw ingredient</option>
        <option :value="IngredientType.MID">Half-cooked food</option>
        <option :value="IngredientType.END">Finished product</option>
      </BaseSelector>
      <BaseButton tag="submit" value="Create" />
    </form>
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
}

.wrapper {
  display: flex;
  flex-direction: row;

  &__card {
    flex: 1 0 0;
  }
  &__form {
    flex: calc(var(--columns) - 1) 0 0;
    margin: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}
</style>

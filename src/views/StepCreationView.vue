<script lang="ts">
import { ref, onMounted, defineComponent, computed } from "vue";

import ModalInformation, { ModalType } from "@/components/ModalInformation.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseSelector from "@/components/BaseSelector.vue";
import CarrouselStep from "@/components/CarrouselStep.vue";

import {
  Ingredient,
  IngredientType,
  SimpleStep,
  Utensil,
} from "@/resources/constants-types";

import { createStep, getAllIngredients, getAllUtensils } from "@/services/api";
import router from "@/services/router";

export default defineComponent({
  components: {
    BaseButton,
    BaseSelector,
    CarrouselStep,
    ModalInformation,
  },
  setup() {
    const ingredients = ref<Ingredient[]>([]);
    const utensils = ref<Utensil[]>([]);

    const ingredientMap = ref<{ [id: number]: Ingredient }>({});
    const utensilMap = ref<{ [id: number]: Utensil }>({});

    const isInfoVisible = ref(false);
    const modalMessage = ref();

    const step = ref<Partial<SimpleStep>>({});

    const detailedStep = computed(() => ({
      input: step.value.input
        ? ingredientMap.value[step.value.input]
        : undefined,

      utensil: step.value.utensil
        ? utensilMap.value[step.value.utensil]
        : undefined,

      output: step.value.output
        ? ingredientMap.value[step.value.output]
        : undefined,
    }));

    function showErrorModal(error: any) {
      modalMessage.value =
        error?.message || error || "An unexpected error has occurred";
      isInfoVisible.value = true;
    }

    onMounted(async () => {
      try {
        [ingredients.value, utensils.value] = await Promise.all([
          getAllIngredients(),
          getAllUtensils(),
        ]);

        ingredients.value.forEach((ingredient) => {
          ingredientMap.value[ingredient.id] = ingredient;
        });
        utensils.value.forEach((utensil) => {
          utensilMap.value[utensil.id] = utensil;
        });
      } catch (error) {
        showErrorModal(error);
      }
    });

    async function submit() {
      try {
        const { input, utensil, output } = step.value;
        if (!input || !utensil || !output) {
          showErrorModal("Fill out all the fields");
          return;
        }

        await createStep({
          input,
          utensil,
          output,
        });
        router.push(`/steps/${input}-${utensil}-${output}`);
      } catch (error) {
        showErrorModal(error);
      }
    }

    return {
      IngredientType,
      ModalType,

      ingredients,
      utensils,

      step,
      detailedStep,
      submit,

      isInfoVisible,
      modalMessage,
    };
  },
});
</script>

<template>
  <div class="title">
    <h1>Steps</h1>
  </div>
  <div>
    <CarrouselStep :step="detailedStep" />
  </div>

  <form @submit.prevent="submit">
    <div class="selectors">
      <BaseSelector
        id="input-selector"
        v-model="step.input"
        class="selectors__selector"
        tag="Input: "
      >
        <option value="" disabled>(Select an option)</option>
        <option
          v-for="ingredient in ingredients"
          :key="ingredient.id"
          :value="ingredient.id"
          :disabled="ingredient.type === IngredientType.END"
        >
          {{ ingredient.id }}: {{ ingredient.name }}
        </option>
      </BaseSelector>

      <div class="selectors__arrow" />

      <BaseSelector
        id="type-selector"
        v-model="step.utensil"
        class="selectors__selector"
        tag="Utensil: "
      >
        <option value="" disabled>(Select an option)</option>
        <option
          v-for="utensil in utensils"
          :key="utensil.id"
          :value="utensil.id"
        >
          {{ utensil.id }}: {{ utensil.name }}
        </option>
      </BaseSelector>

      <div class="selectors__arrow" />

      <BaseSelector
        id="type-selector"
        v-model="step.output"
        class="selectors__selector"
        tag="Output: "
      >
        <option value="" disabled>(Select an option)</option>
        <option
          v-for="ingredient in ingredients"
          :key="ingredient.id"
          :value="ingredient.id"
          :disabled="ingredient.type === IngredientType.START"
        >
          {{ ingredient.id }}: {{ ingredient.name }}
        </option>
      </BaseSelector>
    </div>
    <BaseButton class="button-create" tag="submit" value="Create" />
  </form>

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

.selectors {
  display: flex;
  flex-direction: row;
  align-items: stretch;

  &__selector {
    flex: 1 1 0;

    padding: 16px;
  }

  &__arrow {
    flex: 0 1 48px;
  }
}

.button-create {
  margin: auto;
}
</style>

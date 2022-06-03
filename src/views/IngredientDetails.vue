<script lang="ts">
import { ref, defineComponent, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import {
  Colors,
  Ingredient,
  IngredientType,
} from "@/resources/constants-types";

import {
  deleteIngredient,
  getIngredient,
  updateIngredient,
} from "@/services/api/routes";
import { getScreenType, ScreenType } from "@/services/screen-size";

import BaseButton from "@/components/BaseButton.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseSelector from "@/components/BaseSelector.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import InformationModal from "@/components/InformationModal.vue";
import IngredientCard from "@/components/IngredientCard.vue";

import router from "@/services/router";

export default defineComponent({
  components: {
    IngredientCard,
    InformationModal,
    BaseButton,
    BaseInput,
    BaseSelector,
    BaseDivider,
  },
  setup() {
    const ingredientData = ref<Partial<Ingredient>>({});

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

    function showInfoModal(message: string) {
      isError.value = false;
      modalTitle.value = "Info";
      modalMessage.value = message;
      isInfoVisible.value = true;
    }

    const screenType = getScreenType();
    const columnStyle = computed(() =>
      screenType.value === ScreenType.DESKTOP ? "--columns: 4" : "--columns: 2"
    );

    const id = Number(useRoute().params.id);

    onMounted(async () => {
      try {
        ingredientData.value = await getIngredient(id);
      } catch (error) {
        showErrorModal(error);
      }
    });

    async function update() {
      try {
        const { name, type } = ingredientData.value;
        if (!name || !type) {
          showErrorModal("Fill out all the fields");
          return;
        }
        ingredientData.value = await updateIngredient({ id, name, type });
        showInfoModal("Ingredient updated");
      } catch (error) {
        showErrorModal(error);
      }
    }

    async function destroy() {
      try {
        await deleteIngredient(id);
        router.push("/ingredient");
      } catch (error) {
        showErrorModal(error);
      }
    }

    return {
      Colors,
      IngredientType,

      columnStyle,
      ingredientData,

      update,
      destroy,

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
  <div class="wrapper" :style="columnStyle">
    <IngredientCard :ingredient="ingredientData" class="wrapper__card" />
    <div class="wrapper__right">
      <form @submit.prevent="update" class="wrapper__right__form">
        <BaseInput
          id="id"
          :modelValue="String(ingredientData.id)"
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
        <BaseButton tag="submit" value="Update" />
      </form>
      <BaseDivider class="wrapper__right__divider" />
      <BaseButton tag="button" :color="Colors.RED"> Delete </BaseButton>
    </div>
  </div>

  <InformationModal
    v-if="isInfoVisible"
    @update:isVisible="isInfoVisible = $event"
    :title="modalTitle"
    :message="modalMessage"
    :isError="isError"
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
  &__right {
    flex: calc(var(--columns) - 1) 0 0;
    margin: 16px;
    gap: 16px;

    display: flex;
    flex-direction: column;

    &__form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    &__divider {
      align-self: center;
    }
  }
}
</style>

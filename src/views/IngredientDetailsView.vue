<script lang="ts">
import { ref, defineComponent, computed, onMounted, watch } from "vue";
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
} from "@/services/api";
import { getScreenType, ScreenType } from "@/services/screen-size";

import BaseButton from "@/components/BaseButton.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseSelector from "@/components/BaseSelector.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import ModalConfirmation from "@/components/ModalConfirmation.vue";
import ModalInformation, { ModalType } from "@/components/ModalInformation.vue";
import CardIngredient from "@/components/CardIngredient.vue";

import router from "@/services/router";

type VoidOp = () => void;

export default defineComponent({
  components: {
    CardIngredient,
    ModalConfirmation,
    ModalInformation,
    BaseButton,
    BaseInput,
    BaseSelector,
    BaseDivider,
  },
  setup() {
    const route = useRoute();

    const ingredientData = ref<Partial<Ingredient>>({});

    const isInfoVisible = ref(false);
    const modalType = ref<ModalType>();
    const modalMessage = ref();
    const onCloseInfoModal = ref<VoidOp>(() => null);

    const isConfirmVisible = ref(false);

    function showErrorModal(error: any, onClose: VoidOp = () => null) {
      modalType.value = ModalType.ERROR;
      modalMessage.value =
        error?.message || error || "An unexpected error has occurred";
      isInfoVisible.value = true;
      onCloseInfoModal.value = onClose;
    }

    function showSuccessModal(message: string, onClose: VoidOp = () => null) {
      modalType.value = ModalType.SUCCESS;
      modalMessage.value = message;
      isInfoVisible.value = true;
      onCloseInfoModal.value = onClose;
    }

    const screenType = getScreenType();
    const columnStyle = computed(() =>
      screenType.value === ScreenType.DESKTOP ? "width: 75%" : "width: 100%"
    );

    onMounted(() => loadIngredient(route.params.id));
    watch(
      () => route.params,
      (params) => loadIngredient(params.id)
    );

    async function loadIngredient(id?: unknown) {
      try {
        ingredientData.value = await getIngredient(Number(id));
      } catch (error) {
        showErrorModal(error, () => router.push("/ingredients"));
      }
    }

    async function update() {
      try {
        const id = Number(route.params.id);
        const { name, type } = ingredientData.value;
        if (!name || !type) {
          showErrorModal("Fill out all the fields");
          return;
        }
        ingredientData.value = await updateIngredient({ id, name, type });
        showSuccessModal("Ingredient updated");
      } catch (error) {
        showErrorModal(error);
      }
    }

    async function destroy() {
      try {
        const id = Number(route.params.id);
        await deleteIngredient(id);

        showSuccessModal("Ingredient deleted", () =>
          router.push("/ingredients")
        );
      } catch (error) {
        showErrorModal(error);
      }
    }

    return {
      ModalType,
      Colors,
      IngredientType,

      columnStyle,
      ingredientData,

      update,
      destroy,

      onCloseInfoModal,

      isInfoVisible,
      modalType,
      modalMessage,

      isConfirmVisible,
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
    <div class="container__right">
      <form class="container__right__form" @submit.prevent="update">
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
          v-model="ingredientData.type"
          tag="Type: "
        >
          <option value="" disabled>(Select an option)</option>
          <option :value="IngredientType.START">Raw ingredient</option>
          <option :value="IngredientType.MID">Half-cooked food</option>
          <option :value="IngredientType.END">Finished product</option>
        </BaseSelector>
        <BaseButton tag="submit" value="Update" />
      </form>
      <BaseDivider />
      <BaseButton
        tag="button"
        :color="Colors.RED"
        @click="isConfirmVisible = true"
      >
        Delete
      </BaseButton>
    </div>
  </div>

  <ModalInformation
    v-if="isInfoVisible"
    :message="modalMessage"
    :type="modalType"
    @close="
      isInfoVisible = false;
      onCloseInfoModal();
    "
  />

  <ModalConfirmation
    v-if="isConfirmVisible"
    message="Are you sure you want to delete this ingredient?"
    @cancel="isConfirmVisible = false"
    @confirm="
      isConfirmVisible = false;
      destroy();
    "
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
  &__right {
    flex: 1 0 0;
    margin: 16px;
    gap: 16px;

    display: flex;
    flex-direction: column;

    &__form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  }
}
</style>

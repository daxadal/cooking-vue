<script lang="ts">
import { ref, defineComponent, computed } from "vue";

import InformationModal, { ModalType } from "@/components/InformationModal.vue";
import UtensilCard from "@/components/UtensilCard.vue";

import { Utensil } from "@/resources/constants-types";

import { createUtensil } from "@/services/api/routes";
import { getScreenType, ScreenType } from "@/services/screen-size";
import router from "@/services/router";

import BaseButton from "@/components/BaseButton.vue";
import BaseInput from "@/components/BaseInput.vue";

export default defineComponent({
  components: {
    UtensilCard,
    InformationModal,
    BaseButton,
    BaseInput,
  },
  setup() {
    const utensilData = ref<Partial<Utensil>>({});

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
        const { name, waitTimeInMillis } = utensilData.value;
        if (!name || !waitTimeInMillis) {
          showErrorModal("Fill out all the fields");
          return;
        }
        if (Number(waitTimeInMillis) <= 0) {
          showErrorModal("Wait time must be greater than 0");
          return;
        }
        const utensil = await createUtensil({ name, waitTimeInMillis });
        router.push(`/utensils/${utensil.id}`);
      } catch (error) {
        showErrorModal(error);
      }
    }

    return {
      ModalType,

      columnStyle,
      utensilData,

      submit,

      isInfoVisible,
      modalMessage,
    };
  },
});
</script>

<template>
  <div class="title">
    <h1>Utensils</h1>
  </div>
  <div class="container" :style="columnStyle">
    <UtensilCard :utensil="utensilData" class="container__card" />

    <form @submit.prevent="submit" class="container__form">
      <BaseInput
        id="id"
        modelValue="(not set)"
        type="text"
        tag="ID: "
        disabled
      />
      <BaseInput
        id="name"
        v-model="utensilData.name"
        type="text"
        tag="Name: "
      />
      <BaseInput
        id="name"
        v-model="utensilData.waitTimeInMillis"
        type="number"
        min="0"
        tag="Wait time (ms): "
      />
      <BaseButton tag="submit" value="Create" />
    </form>
  </div>

  <InformationModal
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

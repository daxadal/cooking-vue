<script lang="ts">
import { ref, defineComponent, computed } from "vue";

import ModalInformation, { ModalType } from "@/components/ModalInformation.vue";
import CardUtensil from "@/components/CardUtensil.vue";

import { Utensil } from "@/resources/constants-types";

import { createUtensil } from "@/services/api/routes";
import { getScreenType, ScreenType } from "@/services/screen-size";
import router from "@/services/router";

import BaseButton from "@/components/BaseButton.vue";
import BaseInput from "@/components/BaseInput.vue";

export default defineComponent({
  components: {
    CardUtensil,
    ModalInformation,
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
    <CardUtensil :utensil="utensilData" class="container__card" />

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

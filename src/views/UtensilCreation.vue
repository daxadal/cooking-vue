<script lang="ts">
import { ref, defineComponent, computed } from "vue";

import InformationModal from "@/components/InformationModal.vue";
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

    const screenType = getScreenType();
    const columnStyle = computed(() =>
      screenType.value === ScreenType.DESKTOP ? "--columns: 4" : "--columns: 2"
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
        router.push(`/utensil/${utensil.id}`);
      } catch (error) {
        showErrorModal(error);
      }
    }

    return {
      columnStyle,
      utensilData,

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
  <div class="wrapper" :style="columnStyle">
    <UtensilCard :utensil="utensilData" class="wrapper__card" />

    <form @submit.prevent="submit" class="wrapper__form">
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
    @update:isVisible="isInfoVisible = $event"
    :title="modalTitle"
    :message="modalMessage"
    :isError="isError"
  />
</template>

<style lang="scss" scoped>
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

<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";
import { RouterLink } from "vue-router";

import ModalInformation, { ModalType } from "@/components/ModalInformation.vue";
import BaseButton from "@/components/BaseButton.vue";
import CarrouselStep from "@/components/CarrouselStep.vue";

import { DetailedStep } from "@/resources/constants-types";
import { getAllDetailedSteps } from "@/services/api/routes";

export default defineComponent({
  components: { BaseButton, CarrouselStep, ModalInformation, RouterLink },
  setup() {
    const steps = ref<DetailedStep[]>([]);

    const isInfoVisible = ref(false);
    const modalMessage = ref();

    function showErrorModal(error: any) {
      modalMessage.value =
        error?.message || error || "An unexpected error has occurred";
      isInfoVisible.value = true;
    }

    onMounted(async () => {
      try {
        steps.value = await getAllDetailedSteps();
      } catch (error) {
        showErrorModal(error);
      }
    });

    return {
      ModalType,

      steps,

      isInfoVisible,
      modalMessage,
    };
  },
});
</script>

<template>
  <div class="title">
    <h1>Steps</h1>
    <div class="title__buttons">
      <BaseButton tag="router-link" to="/steps/new"> Create new </BaseButton>
    </div>
  </div>
  <div>
    <RouterLink
      v-for="step in steps"
      :key="`${step.input.id}-${step.utensil.id}-${step.output.id}`"
      :to="`/steps/${step.input.id}-${step.utensil.id}-${step.output.id}`"
    >
      <CarrouselStep :step="step" />
    </RouterLink>
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

  &__buttons {
    box-sizing: border-box;
    width: 100%;
    padding: 0 32px;

    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
}
</style>

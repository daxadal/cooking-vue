<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";

import ModalInformation, { ModalType } from "@/components/ModalInformation.vue";
import CarrouselStep from "@/components/CarrouselStep.vue";

import { DetailedStep } from "@/resources/constants-types";
import { getAllDetailedSteps } from "@/services/api/routes";

export default defineComponent({
  components: { CarrouselStep, ModalInformation },
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
  </div>
  <div>
    <CarrouselStep
      v-for="step in steps"
      :key="`${step.input.id}-${step.output.id}`"
      :step="step"
    />
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
</style>

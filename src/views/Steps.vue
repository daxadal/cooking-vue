<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";

import BaseDivider from "@/components/BaseDivider.vue";
import InformationModal from "@/components/InformationModal.vue";
import StepCarrousel from "@/components/StepCarrousel.vue";

import { DetailedStep } from "@/resources/constants-types";
import { getAllDetailedSteps } from "@/services/api/routes";

export default defineComponent({
  name: "Steps",
  components: { StepCarrousel, InformationModal, BaseDivider },
  setup() {
    const steps = ref<DetailedStep[]>([]);

    const isInfoVisible = ref(false);
    const modalTitle = ref();
    const modalMessage = ref();
    const isError = ref(true);

    function showErrorModal(error: any) {
      isError.value = true;
      modalTitle.value = "Error";
      modalMessage.value = error?.message || error || "Ha ocurrido un error";
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
      steps,

      isInfoVisible,
      modalTitle,
      modalMessage,
      isError,
    };
  },
});
</script>

<template>
  <template
    v-for="step in steps"
    :key="`${step.input.id}-${step.utensil.id}-${step.output.id}`"
  >
    <StepCarrousel :step="step" />
    <BaseDivider />
  </template>
  <InformationModal
    v-if="isInfoVisible"
    @update:isVisible="isInfoVisible = $event"
    :title="modalTitle"
    :message="modalMessage"
    :isError="isError"
  />
</template>

<style scoped></style>

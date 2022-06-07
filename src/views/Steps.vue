<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";

import InformationModal, { ModalType } from "@/components/InformationModal.vue";
import StepCarrousel from "@/components/StepCarrousel.vue";

import { DetailedStep } from "@/resources/constants-types";
import { getAllDetailedSteps } from "@/services/api/routes";

export default defineComponent({
  name: "Steps",
  components: { StepCarrousel, InformationModal },
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
    <StepCarrousel
      v-for="step in steps"
      :key="`${step.input.id}-${step.output.id}`"
      :step="step"
    />
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
</style>

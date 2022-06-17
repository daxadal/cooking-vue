<script lang="ts">
import { ref, onMounted, defineComponent, watch } from "vue";
import { RouteParams, useRoute } from "vue-router";

import ModalConfirmation from "@/components/ModalConfirmation.vue";
import ModalInformation, { ModalType } from "@/components/ModalInformation.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import CarrouselStep from "@/components/CarrouselStep.vue";

import { Colors, DetailedStep } from "@/resources/constants-types";

import { deleteStep, getDetailedStep } from "@/services/api/routes";
import router from "@/services/router";

type VoidOp = () => void;

export default defineComponent({
  components: {
    BaseButton,
    BaseDivider,
    CarrouselStep,
    ModalConfirmation,
    ModalInformation,
  },
  setup() {
    const route = useRoute();

    const isInfoVisible = ref(false);
    const modalType = ref<ModalType>();
    const modalMessage = ref();
    const onCloseInfoModal = ref<VoidOp>(() => null);

    const isConfirmVisible = ref(false);

    const step = ref<DetailedStep>();

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

    onMounted(() => loadStep(route.params));
    watch(() => route.params, loadStep);

    async function loadStep(params: RouteParams) {
      try {
        step.value = await getDetailedStep({
          input: Number(params.input),
          utensil: Number(params.utensil),
          output: Number(params.output),
        });
      } catch (error) {
        showErrorModal(error, () => router.push("/steps"));
      }
    }

    async function destroy() {
      try {
        await deleteStep({
          input: Number(route.params.input),
          utensil: Number(route.params.utensil),
          output: Number(route.params.output),
        });

        showSuccessModal("Step deleted", () => router.push("/steps"));
      } catch (error) {
        showErrorModal(error);
      }
    }

    return {
      Colors,
      ModalType,

      step,

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
    <h1>Steps</h1>
  </div>
  <div>
    <CarrouselStep :step="step || {}" />
  </div>
  <BaseDivider />
  <BaseButton
    tag="button"
    class="button-delete"
    :color="Colors.RED"
    @click="isConfirmVisible = true"
  >
    Delete
  </BaseButton>

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
    message="Are you sure you want to delete this step?"
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

.button-delete {
  margin: auto;
}
</style>

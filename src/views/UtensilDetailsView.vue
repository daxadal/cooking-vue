<script lang="ts">
import { ref, defineComponent, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

import { Colors, Utensil } from "@/resources/constants-types";

import {
  deleteUtensil,
  getUtensil,
  updateUtensil,
} from "@/services/api/routes";
import { getScreenType, ScreenType } from "@/services/screen-size";

import BaseButton from "@/components/BaseButton.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import ModalConfirmation from "@/components/ModalConfirmation.vue";
import ModalInformation, { ModalType } from "@/components/ModalInformation.vue";
import CardUtensil from "@/components/CardUtensil.vue";

import router from "@/services/router";

type VoidOp = () => void;

export default defineComponent({
  components: {
    CardUtensil,
    ModalConfirmation,
    ModalInformation,
    BaseButton,
    BaseInput,
    BaseDivider,
  },
  setup() {
    const route = useRoute();

    const utensilData = ref<Partial<Utensil>>({});

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

    onMounted(() => loadUtensil(route.params.id));
    watch(
      () => route.params,
      (params) => loadUtensil(params.id)
    );

    async function loadUtensil(id?: unknown) {
      try {
        utensilData.value = await getUtensil(Number(id));
      } catch (error) {
        showErrorModal(error, () => router.push("/utensils"));
      }
    }

    async function update() {
      try {
        const id = Number(route.params.id);
        const { name, waitTimeInMillis } = utensilData.value;
        if (!name || !waitTimeInMillis) {
          showErrorModal("Fill out all the fields");
          return;
        }
        if (Number(waitTimeInMillis) <= 0) {
          showErrorModal("Wait time must be greater than 0");
          return;
        }
        utensilData.value = await updateUtensil({ id, name, waitTimeInMillis });
        showSuccessModal("Utensil updated");
      } catch (error) {
        showErrorModal(error);
      }
    }

    async function destroy() {
      try {
        const id = Number(route.params.id);
        await deleteUtensil(id);

        showSuccessModal("Utensil deleted", () => router.push("/utensils"));
      } catch (error) {
        showErrorModal(error);
      }
    }

    return {
      ModalType,
      Colors,

      columnStyle,
      utensilData,

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
    <h1>Utensils</h1>
  </div>
  <div class="container" :style="columnStyle">
    <CardUtensil :utensil="utensilData" class="container__card" />
    <div class="container__right">
      <form class="container__right__form" @submit.prevent="update">
        <BaseInput
          id="id"
          :modelValue="String(utensilData.id)"
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
        <BaseButton tag="submit" value="Update" />
      </form>
      <BaseDivider class="container__right__divider" />
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
    message="Are you sure you want to delete this utensil?"
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

    &__divider {
      align-self: center;
    }
  }
}
</style>

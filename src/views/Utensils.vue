<script lang="ts">
import { ref, onMounted, defineComponent, computed } from "vue";

import InformationModal from "@/components/InformationModal.vue";
import UtensilCard from "@/components/UtensilCard.vue";

import { Utensil } from "@/resources/constants-types";
import { getAllUtensils } from "@/services/api/routes";
import { getScreenType, ScreenType } from "@/services/screen-size";
import BaseButton from "@/components/BaseButton.vue";

export default defineComponent({
  name: "Utensils",
  components: { UtensilCard, InformationModal, BaseButton },
  setup() {
    const utensils = ref<Utensil[]>([]);

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

    onMounted(async () => {
      try {
        utensils.value = await getAllUtensils();
      } catch (error) {
        showErrorModal(error);
      }
    });

    return {
      columnStyle,
      utensils,

      isInfoVisible,
      modalTitle,
      modalMessage,
      isError,
    };
  },
});
</script>

<template>
  <div class="title">
    <h1>Utensils</h1>
    <div class="title__buttons">
      <BaseButton tag="router-link" to="/utensils/new"> Create new </BaseButton>
    </div>
  </div>

  <div class="cards" :style="columnStyle">
    <UtensilCard
      v-for="utensil in utensils"
      :key="utensil.id"
      :utensil="utensil"
      class="cards__card"
    />
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

.cards {
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  row-gap: 1rem;

  &__card {
    flex: 1 0 0;
  }
}
</style>

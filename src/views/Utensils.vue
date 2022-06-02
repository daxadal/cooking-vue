<script lang="ts">
import { ref, onMounted, defineComponent, computed } from "vue";

import InformationModal from "@/components/InformationModal.vue";
import UtensilCard from "@/components/UtensilCard.vue";

import { Utensil } from "@/resources/constants-types";
import { getAllUtensils } from "@/services/api/routes";
import { getScreenType, ScreenType } from "@/services/screen-size";

export default defineComponent({
  name: "Utensils",
  components: { UtensilCard, InformationModal },
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

<style scoped>
.title {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cards {
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  row-gap: 1rem;
}

.cards__card {
  flex: 1 0 0;
}
</style>

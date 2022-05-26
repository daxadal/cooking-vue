<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";

import CountCard from "@/components/CountCard.vue";
import { ApiInfo } from "@/resources/constants-types";
import { getStatus } from "@/services/api/routes";
import { getScreenType, ScreenType } from "@/services/screen-size";

export default defineComponent({
  name: "Home",
  components: {
    CountCard,
  },
  setup() {
    const apiInfo = ref<ApiInfo>();

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

    const screenType = getScreenType();
    const columnStyle = computed(() =>
      screenType.value === ScreenType.DESKTOP ? "--columns: 4" : "--columns: 2"
    );

    onMounted(async () => {
      try {
        apiInfo.value = await getStatus();
      } catch (error) {
        showErrorModal(error);
      }
    });

    return {
      columnStyle,
      apiInfo,

      isInfoVisible,
      modalTitle,
      modalMessage,
      isError,
    };
  },
});
</script>

<template>
  <div class="cards" v-if="apiInfo">
    <CountCard
      class="cards__card"
      title="Ingredients"
      :count="apiInfo?.stats.ingredients"
    />
    <CountCard
      class="cards__card"
      title="Utensils"
      :count="apiInfo?.stats.utensils"
    />
    <CountCard
      class="cards__card"
      title="Steps"
      :count="apiInfo?.stats.steps"
    />
    <CountCard
      class="cards__card"
      title="Recipes"
      :count="apiInfo?.stats.recipes"
    />
  </div>
</template>

<style>
.cards {
  display: flex;
  flex-direction: row;
}

.cards__card {
  flex: 1 0 0;
}
</style>

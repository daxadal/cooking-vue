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
    <router-link class="cards__card" to="/ingredients">
      <CountCard title="Ingredients" :count="apiInfo?.stats.ingredients" />
    </router-link>
    <router-link class="cards__card" to="/utensils">
      <CountCard title="Utensils" :count="apiInfo?.stats.utensils" />
    </router-link>
    <router-link class="cards__card" to="/steps">
      <CountCard title="Steps" :count="apiInfo?.stats.steps" />
    </router-link>
    <router-link class="cards__card" to="/recipes">
      <CountCard title="Recipes" :count="apiInfo?.stats.recipes" />
    </router-link>
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

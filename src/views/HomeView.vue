<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";

import CountCard from "@/components/CountCard.vue";
import { ApiInfo } from "@/resources/constants-types";
import { getStatus } from "@/services/api/routes";
import { getScreenType, ScreenType } from "@/services/screen-size";

export default defineComponent({
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
  <div class="welcome">
    <h1>Welcome to Cooking Vue!</h1>
    <p class="welcome__explanation">
      This project is a user interface connected to the Cooking API. <br />
      This UI allows interaction with all operations from the API, presenting
      the data in a user-friendly way.
    </p>
  </div>
  <div class="status">
    <h2>API status:</h2>

    <p>{{ apiInfo ? "Connected" : "Not connected" }}</p>

    <img v-if="apiInfo" class="status__image" src="@/assets/success.png" />
    <img v-else class="status__image" src="@/assets/error.png" />
  </div>
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

<style lang="scss" scoped>
.welcome {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__explanation {
    padding: 16px;
    max-width: 720px;
  }
}
.cards {
  display: flex;
  flex-direction: row;

  &__card {
    flex: 1 0 0;
  }
}

.status {
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;
  gap: 16px;

  &__image {
    width: 24px;
    height: 24px;
    margin-top: -8px;
  }
}
</style>

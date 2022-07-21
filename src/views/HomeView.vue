<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

import CardCount from "@/components/CardCount.vue";
import { ApiInfo, Environment } from "@/resources/constants-types";
import { getStatus } from "@/services/api";
import { getScreenType, ScreenType } from "@/services/screen-size";

export default defineComponent({
  components: {
    CardCount,
    RouterLink,
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
      Environment,
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

    <p>
      {{ apiInfo ? `Connected to ${apiInfo.environment}` : "Not connected" }}
    </p>

    <img
      v-if="apiInfo && apiInfo.environment === Environment.LOCAL_MOCK"
      class="status__image"
      src="@/assets/warning.svg"
    />
    <img v-else-if="apiInfo" class="status__image" src="@/assets/success.png" />
    <img v-else class="status__image" src="@/assets/error.png" />
  </div>
  <p
    v-if="apiInfo && apiInfo.environment === Environment.LOCAL_MOCK"
    class="mock-explanation"
  >
    This environment is NOT connected to a server that provides the required
    data and functionality. <br />
    Instead, all API calls are mocked to return a fixed successful response that
    mimics the shape of an actual server response. <br />
    This allows the UI to be explored without having to put up a server. <br />
    Because of it, user actions WILL NOT PERSIST and data between pages MAY BE
    INCONSISTENT.
  </p>
  <div v-if="apiInfo" class="cards">
    <RouterLink class="cards__card" to="/ingredients">
      <CardCount title="Ingredients" :count="apiInfo?.stats.ingredients" />
    </RouterLink>
    <RouterLink class="cards__card" to="/utensils">
      <CardCount title="Utensils" :count="apiInfo?.stats.utensils" />
    </RouterLink>
    <RouterLink class="cards__card" to="/steps">
      <CardCount title="Steps" :count="apiInfo?.stats.steps" />
    </RouterLink>
    <RouterLink class="cards__card" to="/recipes">
      <CardCount title="Recipes" :count="apiInfo?.stats.recipes" />
    </RouterLink>
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

.mock-explanation {
  color: var(--red-text);
  font-style: italic;
}
</style>

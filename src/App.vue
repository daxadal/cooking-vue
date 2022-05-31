<template>
  <BaseToolbar class="toolbar" :height="toolbarHeight">
    <div class="toolbar__left">
      <IconThreeBars
        height="2rem"
        width="2rem"
        @click="isDrawerShowing = !isDrawerShowing"
      />
    </div>
    <BaseButton tag="router-link" to="/" text type="neutral">
      <h1 class="toolbar__center">Cooking Vue</h1>
    </BaseButton>
    <div class="toolbar__right">
      <PalletteSwitch @change="setTheme" />
    </div>
  </BaseToolbar>
  <BaseDrawer
    v-model:isShowing="isDrawerShowing"
    width="450px"
    :closeOnClickAway="true"
    :hasMask="true"
    :placement="Positions.L"
    :topOffset="toolbarHeight"
  >
    <BaseList>
      <BaseButton
        tag="router-link"
        to="/"
        text
        type="neutral"
        @click="isDrawerShowing = false"
      >
        Home
      </BaseButton>
      <BaseDivider />
      <BaseButton
        tag="router-link"
        to="/ingredients"
        text
        type="neutral"
        @click="isDrawerShowing = false"
      >
        Ingredients
      </BaseButton>
      <BaseButton
        tag="router-link"
        to="/utensils"
        text
        type="neutral"
        @click="isDrawerShowing = false"
      >
        Utensils
      </BaseButton>
      <BaseButton
        tag="router-link"
        to="/steps"
        text
        type="neutral"
        @click="isDrawerShowing = false"
      >
        Steps
      </BaseButton>
      <BaseButton
        tag="router-link"
        to="/recipes"
        text
        type="neutral"
        @click="isDrawerShowing = false"
      >
        Recipes
      </BaseButton>
    </BaseList>
  </BaseDrawer>
  <div class="content">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import BaseToolbar from "./components/BaseToolbar.vue";
import BaseDrawer, { Positions } from "./components/BaseDrawer.vue";
import BaseList from "./components/BaseList.vue";
import BaseButton from "./components/BaseButton.vue";
import PalletteSwitch, { Pallettes } from "./components/PalletteSwitch.vue";
import BaseDivider from "./components/BaseDivider.vue";
import IconThreeBars from "./icons/IconThreeBars.vue";

export default defineComponent({
  name: "App",
  components: {
    BaseToolbar,
    BaseDrawer,
    BaseList,
    BaseButton,
    PalletteSwitch,
    BaseDivider,
    IconThreeBars,
  },
  setup() {
    const isDrawerShowing = ref(false);
    const toolbarHeight = ref(80); // TODO get toolbar height dynamicly

    function setTheme(themeSelected: Pallettes) {
      const html = document.documentElement;

      html.classList.remove("light-theme", "dark-theme");

      if (themeSelected === "light") {
        html.classList.add("light-theme");
      } else if (themeSelected === "dark") {
        html.classList.add("dark-theme");
      }
    }

    return { isDrawerShowing, Positions, setTheme, toolbarHeight };
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

.toolbar {
  display: flex;
  flex-direction: row;
  width: 100%;

  &__left {
    flex: 1 1 0;
    justify-content: flex-start;

    display: flex;
    gap: 1rem;
    align-items: center;
  }

  &__center {
    flex: 1 1 0;
    align-self: center;
    margin: 0 auto;
  }

  &__right {
    flex: 1 1 0;
    justify-content: flex-end;

    display: flex;
    gap: 1rem;
    align-items: center;
  }
}

.content {
  margin-top: 8rem;
}
</style>

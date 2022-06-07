<script lang="ts">
import { defineComponent, ref } from "vue";

import BaseToolbar from "./components/BaseToolbar.vue";
import BaseDrawer, { Positions } from "./components/BaseDrawer.vue";
import BaseList from "./components/BaseList.vue";
import BaseButton from "./components/BaseButton.vue";
import PalletteSwitch, { Pallettes } from "./components/PalletteSwitch.vue";
import BaseDivider from "./components/BaseDivider.vue";
import IconThreeBars from "./icons/IconThreeBars.vue";
import { RouterView } from "vue-router";

export default defineComponent({
  components: {
    BaseToolbar,
    BaseDrawer,
    BaseList,
    BaseButton,
    PalletteSwitch,
    BaseDivider,
    IconThreeBars,
    RouterView,
  },
  setup() {
    const isDrawerShowing = ref(false);
    const toolbarHeight = 80;

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

<template>
  <BaseToolbar class="toolbar" :height="toolbarHeight">
    <div class="toolbar__left">
      <IconThreeBars @click="isDrawerShowing = !isDrawerShowing" />
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
        @click="isDrawerShowing = false"
      >
        Home
      </BaseButton>
      <BaseDivider />
      <BaseButton
        tag="router-link"
        to="/ingredients"
        text
        @click="isDrawerShowing = false"
      >
        Ingredients
      </BaseButton>
      <BaseButton
        tag="router-link"
        to="/utensils"
        text
        @click="isDrawerShowing = false"
      >
        Utensils
      </BaseButton>
      <BaseButton
        tag="router-link"
        to="/steps"
        text
        @click="isDrawerShowing = false"
      >
        Steps
      </BaseButton>
      <BaseButton
        tag="router-link"
        to="/recipes"
        text
        @click="isDrawerShowing = false"
      >
        Recipes
      </BaseButton>
    </BaseList>
  </BaseDrawer>
  <div class="content" :style="{ 'margin-top': toolbarHeight + 'px' }">
    <router-view />
  </div>
</template>

<style lang="scss">
@use "@/styles/themes.scss";

:root {
  @include themes.light-theme;

  &.dark-theme {
    @include themes.dark-theme;
  }

  @media (prefers-color-scheme: dark) {
    @include themes.dark-theme;

    &.light-theme {
      @include themes.light-theme;
    }
  }
}

// cSpell:words Avenir
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
</style>

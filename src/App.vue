<template>
  <BaseToolbar class="toolbar">
    <div class="toolbar__left" />
    <h1 class="toolbar__center">Cooking Vue</h1>
    <div class="toolbar__right">
      <PalleteSwitch />
      <BaseAvatar size="3rem" @click="isDrawerShowing = !isDrawerShowing" />
    </div>
  </BaseToolbar>
  <BaseDrawer
    v-model:isShowing="isDrawerShowing"
    width="450px"
    :closeOnClickAway="true"
    :hasMask="true"
    :placement="Positions.R"
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
      <BaseButton
        tag="router-link"
        to="/hello"
        text
        type="neutral"
        @click="isDrawerShowing = false"
      >
        HelloWorld
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
import BaseAvatar from "./components/BaseAvatar.vue";
import BaseDrawer, { Positions } from "./components/BaseDrawer.vue";
import BaseList from "./components/BaseList.vue";
import BaseButton from "./components/BaseButton.vue";
import PalleteSwitch from "./components/PalleteSwitch.vue";

export default defineComponent({
  name: "App",
  components: {
    BaseToolbar,
    BaseAvatar,
    BaseDrawer,
    BaseList,
    BaseButton,
    PalleteSwitch,
  },
  setup() {
    const isDrawerShowing = ref(false);
    const toolbarHeight = ref(81); // TODO get toolbar height dynamicly

    return { isDrawerShowing, Positions, toolbarHeight };
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
    justify-content: start;
  }

  &__center {
    flex: 1 1 0;
    align-self: center;
    margin: 0 auto;
  }

  &__right {
    flex: 1 1 0;
    justify-content: end;

    display: flex;
    gap: 1rem;
    align-items: center;
  }
}

.content {
  margin-top: 8rem;
}
</style>

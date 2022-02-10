<template>
  <BaseToolbar>
    <h1 class="toolbar__title">Cooking Vue</h1>
    <BaseAvatar size="3rem" @click="isDrawerShowing = !isDrawerShowing" />
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

export default defineComponent({
  name: "App",
  components: { BaseToolbar, BaseAvatar, BaseDrawer, BaseList, BaseButton },
  setup() {
    const isDrawerShowing = ref(false);
    const toolbarHeight = ref(81); // TODO get toolbar height dynamicly

    return { isDrawerShowing, Positions, toolbarHeight };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

.toolbar__title {
  align-self: center;
  margin: 0 auto;
}

.content {
  margin-top: 8rem;
}
</style>

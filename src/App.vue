<template>
  <BaseToolbar>
    <h1 class="title">Cooking Vue</h1>
    <BaseAvatar size="3rem" @click="isDrawerShowing = !isDrawerShowing" />
  </BaseToolbar>
  <BaseDrawer
    v-model:isShowing="isDrawerShowing"
    width="450px"
    :closeOnClickAway="true"
    :hasMask="true"
    :placement="Positions.R"
  >
    <BaseList>
      <router-link to="/">Home</router-link>
      <router-link to="/hello">HelloWorld</router-link>
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
export default defineComponent({
  name: "App",
  components: { BaseToolbar, BaseAvatar, BaseDrawer, BaseList },
  setup() {
    const isDrawerShowing = ref(false);

    return { isDrawerShowing, Positions };
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

.title {
  align-self: center;
  margin: 0 auto;
}

.content {
  margin-top: 8rem;
}
</style>

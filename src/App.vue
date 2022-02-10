<template>
  <BaseToolbar>
    <h1 class="title">Cooking Vue</h1>
    <BaseAvatar size="3rem"/>
  </BaseToolbar>
  <div class="content">
    <p>
      <router-link to="/">Home</router-link>
      |
      <router-link to="/hello">HelloWorld</router-link>
    </p>
    <router-view />
  </div>
</template>

<script lang="ts">
import BaseToolbar from "./components/BaseToolbar.vue";
import BaseAvatar from "./components/BaseAvatar.vue";
export default {
  name: "App",
  components: { BaseToolbar, BaseAvatar },
};
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

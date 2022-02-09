<template>
  <p>
    <router-link to="/">Home</router-link>
    |
    <router-link to="/hello">HelloWorld</router-link>
  </p>
  <router-view></router-view>
</template>

<script lang="ts">
export default {
  name: "App",
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
</style>
